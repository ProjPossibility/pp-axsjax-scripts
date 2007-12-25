//AxsJAX script for Sudoku game at:
//http://view.websudoku.com/
// Author Gurmeet Singh, gurmeets@usc.edu
// Author Christopher Leung, christopher.leung@projectpossiblity.org

var axsSd = {};

axsSd.row = 0;
axsSd.col = 0;
axsSd.MAXROW = 8;
axsSd.MAXCOL = 8;
axsSd.axsJaxObj = null;
axsSd.solution = null;
axsSd.type = null;
axsSd.helpString =
    'The following shortcut keys are available. ' +
    '0, clear the contents of the current cell. ' +   
    '1 through 9, enter value into a blank cell. ' +
    'r, read the contents of the current row. ' +
    'c, read the contents of the current column. ' +
	'g, read the current 3 by 3 grid left to right, top to bottom. ' +
	't, read the current 3 by 3 grid top to bottom, left to right. ' +
    'space, check current status of the entire grid. ' +
    'e, start a new easy game. ' +
    'm, start a new medium game. ' +
    'h, start a new hard game. ' +
    'v, start a new evil (very hard) game. ';

axsSd.getCurrentPosition = function() {
  var value = axsSd.getCellValue(axsSd.row, axsSd.col);
  var message = "row "+axsSd.row + " column " + axsSd.col;
  message = message + " value "+ value;
  axsSd.axsJaxObj.speakThroughPixel(message);
};

axsSd.speakRow = function(){
  var speechString = "Row " +  axsSd.row + ": ";
  for (var col = 0; col < axsSd.MAXCOL; col++){
    speechString = speechString + axsSd.getCellValue(axsSd.row,col)+". ";
  }
  speechString = speechString + axsSd.getCellValue(axsSd.row,axsSd.MAXCOL);
  axsSd.axsJaxObj.speakThroughPixel(speechString);
};

axsSd.speakCol = function(){
  var speechString = "Col " +  axsSd.col + ": ";
  for (var row = 0; row < axsSd.MAXROW; row++){
    speechString = speechString + axsSd.getCellValue(row,axsSd.col)+". ";
  }
  speechString = speechString + axsSd.getCellValue(axsSd.MAXROW,axsSd.col);
  axsSd.axsJaxObj.speakThroughPixel(speechString);
};

axsSd.speakSubGrid = function(dir) {

	// Get the current 3x3 grid
	var gridh = Math.floor(axsSd.row / 3);
	var gridv = Math.floor(axsSd.col / 3);

	var startRow = gridh * 3;
	var startCol = gridv * 3;
	
	var speechString = "Current subgrid values";
	var row;
	var col;
	
	// Set the direction
	if(dir == "rowmajor") {
		dir = 1;
		speechString += " left to right";
	}
	
	// dir == "columnmajor"
	else {
		dir = 2;
		speechString += " top to bottom";
	}

	// For each row, column
	for(i = 0; i<3; i++) {
		for(j = 0; j < 3; j++) {
			
			if(dir == 1) {
				row = startRow + i;
				col = startCol + j;
			}
			
			// dir == 2
			else {
				row = startRow + j;
				col = startCol + i;
			}
			
			speechString = speechString + ", " + axsSd.getCellValue(row,col);
		}
	}
	
	speechString += ".";
	axsSd.axsJaxObj.speakThroughPixel(speechString);
}

axsSd.keyboardHandler = function(evt) {
  if (evt.charCode == 101){      //e
    document.location = "http://view.websudoku.com/?level=1";
    return;
  }
  if (evt.charCode == 109){       //m
    document.location = "http://view.websudoku.com/?level=2";
    return;
  }
  if (evt.charCode == 104){      //h
    document.location = "http://view.websudoku.com/?level=3";
    return;
  }
  if (evt.charCode == 118){       //v
    document.location = "http://view.websudoku.com/?level=4";
    return;
  }


  if (evt.keyCode == 38) { // Up arrow
    axsSd.row--;
    if (axsSd.row < 0){ axsSd.row = 0; }
    axsSd.getCurrentPosition();
  }
  if (evt.keyCode == 37) {  // Left arrow
    axsSd.col--;
    if (axsSd.col < 0){ axsSd.col = 0; }
    axsSd.getCurrentPosition();
  }
  if (evt.keyCode == 40) { // Down arrow
    axsSd.row++;
    if (axsSd.row > axsSd.MAXROW){  axsSd.row = axsSd.MAXROW; }
    axsSd.getCurrentPosition();
  }
  if (evt.keyCode == 39) { // Right arrow
    axsSd.col++;
    if (axsSd.col > axsSd.MAXCOL){ axsSd.col = axsSd.MAXCOL; }
    axsSd.getCurrentPosition();
  }
  if (evt.charCode == 99){ // c , read out the column
    axsSd.speakCol();
  }
  if (evt.charCode == 114){ // r, read out the row
    axsSd.speakRow();
  }
  if (evt.charCode == 103){ // g, read current 3x3 subgrid row major
  	axsSd.speakSubGrid("rowmajor");
  }
  if (evt.charCode == 116) { // t, read current 3x3 subgrid column major
	axsSd.speakSubGrid("columnmajor");
  }
  if (evt.charCode >= 49 && evt.charCode <= 57) { // from 1 to 9
	if (axsSd.getCellValue(axsSd.row, axsSd.col) == "blank") {
	    axsSd.putValue(evt.charCode, axsSd.row, axsSd.col);
	}
	axsSd.getCurrentPosition();
  }
  if (evt.charCode == 48) { // 0
  	axsSd.clearValue(axsSd.row, axsSd.col);
	axsSd.getCurrentPosition();
  }
  if (evt.charCode == 32) { // Space
	axsSd.howAmIDoing();
  }
  if(evt.charCode == 63) //? key
  {
	axsSd.axsJaxObj.speakThroughPixel(axsSd.helpString);
  }
};

axsSd.putValue = function(charCode, row, col) {
   var id = "f"+col+row;
   var input = document.getElementById(id);
   input.value = charCode - 48;
};

axsSd.getSolution = function() {
   var Sol = document.getElementsByName("cheat");
   axsSd.solution = Sol[0].value;
//   alert(axsSd.solution);
};

axsSd.getCellValue = function(row, col) {
   var id = "f"+col+row;
   var input = document.getElementById(id);
   var value = input.value;
   if (value == "") {
      value = "blank";
   }
   return value;
};

axsSd.clearValue = function(row, col) {
   var id = "f"+col+row;
   var input = document.getElementById(id);
   var initValue = input.getAttribute("InitialValue");
   if (initValue == "") {
   	input.value = "";
   }
};

axsSd.getSolutionCellValue = function(row, col) {
   if (row < 0 || row > axsSd.MAXROW) {
       alert("Row "+row+" Col "+col+" Invalid Row");
       return "Invalid Row";
   }
   if (col < 0 || col > axsSd.MAXCOL) {
       alert("Row "+row+" Col "+col+" Invalid Column");
       return "Invalid Column";
   }
   var index = row * (axsSd.MAXROW +1) + col;
   var value = axsSd.solution.substring(index, index+1);
   return value;
};

axsSd.howAmIDoing = function() {
   var errors = 0;
   var done = 0;
   var message = "";
   for (var i = 0; i <= axsSd.MAXROW; i++) {
	for (var j = 0; j <= axsSd.MAXCOL; j++) {
	   var value = axsSd.getCellValue(i, j);
	   if (value != "blank") {
		if (value != axsSd.getSolutionCellValue(i, j)) {
 		   message = message + "Error in Row "+i+" Column "+j+". ";
		   errors++;
		} else {
		   done++;
		}
	   }
	}
   }
   if (errors > 0) {
	axsSd.axsJaxObj.speakThroughPixel(errors+" errors. "+message);
   } else {
	if (done == 81) {
	   axsSd.axsJaxObj.speakThroughPixel("Great, You are done. Congratulations. ");
      } else {
         axsSd.axsJaxObj.speakThroughPixel((81 - done)+" more to go. ");
	}
   }
};

axsSd.clickHowAmIDoing = function() {
   var nodes = document.getElementsByTagName("INPUT");
   for(var i = 0; i < nodes.length; i++) {
     if (nodes[i].value == " How am I doing? ") {
        axsSd.axsJaxObj.clickElem(nodes[i]);
        break;
     }
   }
};

axsSd.setInitialValueAttributes = function() {
   for (var row = 0; row <= axsSd.MAXROW; row++) {
	for (var col = 0; col <= axsSd.MAXCOL; col++) {
	   var id = "f"+col+row;
 	   var input = document.getElementById(id);
	   var value = input.value;
	   input.setAttribute("InitialValue", value);
      }
   }
};

axsSd.init = function() {
   axsSd.axsJaxObj = new AxsJAX(true);
   axsSd.getSolution();
   axsSd.setInitialValueAttributes();
   axsSd.row = 0;
   axsSd.col = 0;
   axsSd.getCurrentPosition();
   document.addEventListener('keypress', axsSd.keyboardHandler, true);
};

axsSd.init();