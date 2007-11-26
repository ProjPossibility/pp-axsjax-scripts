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


function axsJb_getCurrentBallImgNode(row,col){
  var rowString = row.toString();
  var colString = col.toString();
  if (rowString.length < 2){
    rowString = '0' + rowString;
  }
  if (colString.length < 2){
    colString = '0' + colString;
  }
  var targetId = 'r'+ rowString + 'c' + colString;
  return document.getElementById(targetId);
}

axsSd.speakRow = function(){
  var speechString = "Row " +  axsSd.row + ": ";
  for (var col = 1; col < axsSd.MAXCOL; col++){
    speechString = speechString + axsSd.getCellValue(axsSd.row,col);
  }
  speechString = speechString + axsSd.getCellValue(axsSd.row,axsSd.MAXCOL);
  alert("Row "+axsSd.row+" "+speechString);
  axsSd.axsJaxObj.speakThroughPixel(speechString);
};

axsSd.speakCol = function(){
  var speechString = "Col " +  axsSd.col + ": ";
  for (var row = 1; row < axsSd.MAXROW; row++){
    speechString = speechString + axsSd.getCellValue(row,axsSd.col);
  }
  speechString = speechString + axsSd.getCellValue(axsSd.MAXROW,axsSd.col);
  alert("Col "+axsSd.col+" "+speechString);
  axsSd.axsJaxObj.speakThroughPixel(speechString);
};

axsSd.keyboardHandler = function(evt) {
  if (evt.charCode == 97){      //a
    axsSd.col = 0;
    axsSd.getCurrentPostion();
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
    if (axsSd.row < 1){ axsSd.row = 1; }
    axsSd.getCurrentPosition();
  }
  if (evt.keyCode == 37 ||
      evt.charCode == 104){ // Left arrow  or h
    axsSd.col--;
    if (axsSd.col < 1){ axsSd.col = 1; }
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
  if (evt.charCode == 32){ // Space
    axsJb_axsJaxObj.clickElem(axsJb_getCurrentBallImgNode(axsJb_row,axsJb_col));
    axsJb_sayStats();
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
};

axsSd.getSolution = function() {
   var Sol = document.getElementsByName("cheat");
   axsSd.solution = Sol[0].value;
   alert(axsSd.solution);
};

axsSd.getCellValue = function(row, col) {
   var id = "f"+col+row;
   var input = document.getElementById(id);
   if (input == null) {
	alert("No input element found");
   }
   var value = input.getAttribute("READONLY VALUE");
   if (value == null) {
      value = "blank";
   }
   alert(input.getAttribute("ID"));
   return value;
};

axsSd.getSolutionCellValue = function(row, col) {
   if (row < 1 || row > axsSd.MAXROW) {
       alert("Row "+row+" Col "+col+" Invalid Row");
       return "Invalid Row";
   }
   if (col < 1 || col > axsSd.MAXCOL) {
       alert("Row "+row+" Col "+col+" Invalid Column");
       return "Invalid Column";
   }
   var index = ( row - 1) * axsSd.MAXROW + col;
   var value = axsSd.solution.substring(index-1, index);
   return value;
};

axsSd.init = function() {
   axsSd.axsJaxObj = new AxsJAX(true);
   axsSd.getSolution();
   document.addEventListener('keypress', axsSd.keyboardHandler, true);
};

axsSd.init();