//AxsJAX script for Sudoku game at:
//http://view.websudoku.com/

var axsSd = {};

axsSd.row = 1;
axsSd.col = 1;
axsSd.MAXROW = 9;
axsSd.MAXCOL = 9;
axsSd.axsJaxObj = null;
axsSd.solution = null;
axsSd.type = null;


axsSd.getCurrentPosition function() {
  var value = axsSd.getCurrentCellValue(axsSd.row, axsSd.col);
  var message = axsSd.row + ', ' + axsSd.col + '.'+ 'value '+value;
  axsSd.axsJaxObj.speakText(message);
};

function axsJb_getColorOfBallImg(ballImg){
  var color = '';
  var url = ballImg.src.toString();
  var slashPos = url.lastIndexOf('/');
  url = url.substring(slashPos+1);
  color = AxsJBImg2ColorMap[url];
  return color;
}



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

function axsJb_sayStats(){
  var blockCount = document.getElementById('blockcount').textContent;
  var blockScore = document.getElementById('blockscore').textContent;
  var totalScore = document.getElementById('userscore').textContent;
  axsJb_axsJaxObj.speakThroughPixel('Block count: ' + blockCount + '. Block score: ' + blockScore + '. Total score: ' + totalScore + '.');
}

axsSd.speakRow function(){
  var speechString = "Row " +  axsSd.row + ": ";
  for (var col = 1; col < axsSd.MAXCOL; col++){
    speechString = speechString + axsSd.getCurrentCellValue(axsJb_row,col));
  }
  speechString = speechString + axsSd.getCurrentCellValue(axsJb_row,axsJb_MAXCOL));
  axsSd.axsJaxObj.speakThroughPixel(speechString);
};

axsSd.speakCol function(){
  var speechString = "Col " +  axsSd.col + ": ";
  for (var row = 1; row < axsSd.MAXROW; row++){
    speechString = speechString + axsSd.getCurrentCellValue(row,axsSd.col));
  }
  speechString = speechString + axsSd.getCurrentCellValue(axsSd.MAXROW,axsSd.col));
  axsSd.axsJaxObj.speakThroughPixel(speechString);
};

axsSd.keyboardHandler function(evt) {
   axsSd.getSolution();
};

axsSd.keyboardHandler2 function(evt) {
  if (evt.charCode == 97){      //a
    axsJb_col = 0;
    axsJb_getCurrentPosition();
  }
  if (evt.charCode == 101){       //e
    axsJb_col = axsJb_MAXCOL;
    axsJb_getCurrentPosition();
  }
  if (evt.charCode == 116){      //t
    axsJb_row = 0;
    axsJb_getCurrentPosition();
  }
  if (evt.charCode == 98){       //b
    axsJb_row = axsJb_MAXROW;
    axsJb_getCurrentPosition();
  }


  if (evt.keyCode == 38 ||
      evt.charCode == 107){ // Up arrow or k
    axsJb_row--;
    if (axsJb_row < 0){ axsJb_row = 0; }
    axsJb_getCurrentPosition();
  }
  if (evt.keyCode == 37 ||
      evt.charCode == 104){ // Left arrow  or h
    axsJb_col--;
    if (axsJb_col < 0){ axsJb_col = 0; }
    axsJb_getCurrentPosition();
  }
  if (evt.keyCode == 40 ||
      evt.charCode == 106){ // Down arrow or j 
    axsJb_row++;
    if (axsJb_row > axsJb_MAXROW){  axsJb_row = axsJb_MAXROW; }
    axsJb_getCurrentPosition();
  }
  if (evt.keyCode == 39 ||
      evt.charCode == 108){ // Right arrow or l
    axsJb_col++;
    if (axsJb_col > axsJb_MAXCOL){ axsJb_col = axsJb_MAXCOL; }
    axsJb_getCurrentPosition();
  }
  if (evt.charCode == 32){ // Space
    axsJb_axsJaxObj.clickElem(axsJb_getCurrentBallImgNode(axsJb_row,axsJb_col));
    axsJb_sayStats();
  }
  if (evt.charCode == 115){ // s
    axsJb_sayStats();
  }
  if (evt.charCode == 99){ // c
    axsJb_speakCol();
  }
  if (evt.charCode == 114){ // r
    axsJb_speakRow();
  }
  if (evt.charCode == 110){ // n
    axsJb_row = 0;
    axsJb_col = 0;
    axsJb_axsJaxObj.clickElem(document.getElementById('menu-start'));
    axsJb_getCurrentPosition();
  }  
};

axsSd.getSolution function() {
   var Sol = document.getElementsbyTagName("cheat");
   axsSd.axsJaxObj.speakNode(Sol[0]);
};

axsSd.init = function() {
   axsSd.axsJaxObj = new AxsJAX(true);
   document.addEventListener('keypress', axsSd.keyboardHandler, true);
};

axsSd.init();