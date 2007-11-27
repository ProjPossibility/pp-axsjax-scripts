//AxsJAX script for Sudoku game at:
//http://view.websudoku.com/
// Author Gurmeet Singh, gurmeets@usc.edu

var axsSd = {};

axsSd.row = 0;
axsSd.col = 0;
axsSd.MAXROW = 8;
axsSd.MAXCOL = 8;
axsSd.axsJaxObj = null;
axsSd.solution = null;
axsSd.type = null;


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

axsSd.keyboardHandler = function(evt) {
  if (evt.charCode == 97){      //a
    axsSd.col = 0;
    axsSd.getCurrentPosition();
  }
  if (evt.charCode == 101){       //e
    axsSd.col = axsSd.MAXCOL;
    axsSd.getCurrentPosition();
  }
  if (evt.charCode == 116){      //t
    axsSd.row = 0;
    axsSd.getCurrentPosition();
  }
  if (evt.charCode == 98){       //b
    axsSd.row = axsSd.MAXROW;
    axsSd.getCurrentPosition();
  }


  if (evt.keyCode == 38 ||
      evt.charCode == 107){ // Up arrow or k
    axsSd.row--;
    if (axsSd.row < 0){ axsSd.row = 0; }
    axsSd.getCurrentPosition();
  }
  if (evt.keyCode == 37 ||
      evt.charCode == 104){ // Left arrow  or h
    axsSd.col--;
    if (axsSd.col < 0){ axsSd.col = 0; }
    axsSd.getCurrentPosition();
  }
  if (evt.keyCode == 40 ||
      evt.charCode == 106){ // Down arrow or j 
    axsSd.row++;
    if (axsSd.row > axsSd.MAXROW){  axsSd.row = axsSd.MAXROW; }
    axsSd.getCurrentPosition();
  }
  if (evt.keyCode == 39 ||
      evt.charCode == 108){ // Right arrow or l
    axsSd.col++;
    if (axsSd.col > axsSd.MAXCOL){ axsSd.col = axsSd.MAXCOL; }
    axsSd.getCurrentPosition();
  }
  if (evt.charCode == 99){ // c
    axsSd.speakCol();
  }
  if (evt.charCode == 114){ // r
    axsSd.speakRow();
  }
  if (evt.charCode == 110){ // n
    axsSd.row = 0;
    axsSd.col = 0;
    axsSd.getCurrentPosition();
  }
  if (evt.charCode >= 49 && evt.charCode <= 57) {
	if (axsSd.getCellValue(axsSd.row, axsSd.col) == "blank") {
	    axsSd.putValue(evt.charCode, axsSd.row, axsSd.col);
	}
	axsSd.getCurrentPosition();
  }
  if (evt.charCode == 48) {
  	axsSd.clearValue(axsSd.row, axsSd.col);
	axsSd.getCurrentPosition();
  }
  if (evt.charCode == 32) { // Space
	axsSd.howAmIDoing();
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
   alert(axsSd.solution);
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
   input.value = "";
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
 message = message + "Row "+i+" Col "+j+" value "+value+" sol "+axsSd.getSolutionCellValue(i,j)+"\n ";
		   axsSd.axsJaxObj.speakThroughPixel("Error in Row "+i+" Column "+j+". ");
		   errors++;
		} else {
		   done++;
		}
	   }
	}
   }
   if (errors > 0) {
	axsSd.axsJaxObj.speakThroughPixel(errors+" errors. ");
 	alert(message);
   } else {
	if (done == 81) {
	   axsSd.axsJaxObj.speakThroughPixel("Great, You are done. Congratulations. ");
      } else {
	   axsSd.axsJaxObj.speakThroughPixel("No Errors till now. ");
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

axsSd.init = function() {
   axsSd.axsJaxObj = new AxsJAX(true);
   axsSd.getSolution();
   document.addEventListener('keypress', axsSd.keyboardHandler, true);
};

axsSd.init();