//AxsJAX script for Jawbreaker game at:
//http://www.minijuegosgratis.com/juegos/jawbreaker/jawbreaker.htm

var axsJb_row = 0;
var axsJb_col = 0;
var axsJb_MAXROW = 11;
var axsJb_MAXCOL = 10;
var axsJb_axsJaxObj = new AxsJAX();


function axsJb_getCurrentPosition(){
  var ballImg = axsJb_getCurrentBallImgNode(axsJb_row,axsJb_col);
  var color = axsJb_getColorOfBallImg(ballImg);
  var message = color + axsJb_row + ', ' + axsJb_col + '.';
  ballImg.alt = message;
  axsJb_axsJaxObj.speakNode(ballImg);
}
/*
 * Dictionary mapping  image names to color names
 */
var AxsJBImg2ColorMap = {
  's_green.gif' : 'Selected Green. ',
  's_blue.gif' : 'Selected Blue. ',
  's_purple.gif' : 'Selected Purple. ',
  's_red.gif' : 'Selected  Red. ',
  's_yellow.gif' : 'Selected Yellow. ',
  'p_green.gif' : 'Green, ',
  'p_blue.gif' : 'Blue, ',
  'p_purple.gif' : 'Purple, ',
  'p_red.gif' : 'Red, ',
  'p_yellow.gif' : 'Yellow, ',
  'p_white.gif' : 'Blank, '
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

function axsJb_speakRow(){
  var speechString = "Row " +  axsJb_row + ": ";
  for (var col = 0; col < axsJb_MAXCOL; col++){
    speechString = speechString + axsJb_getColorOfBallImg(axsJb_getCurrentBallImgNode(axsJb_row,col));
  }
  speechString = speechString + axsJb_getColorOfBallImg(axsJb_getCurrentBallImgNode(axsJb_row,axsJb_MAXCOL));
  axsJb_axsJaxObj.speakThroughPixel(speechString);
}

function axsJb_speakCol(){
  var speechString = "Col " +  axsJb_col + ": ";
  for (var row = 0; row < axsJb_MAXROW; row++){
    speechString = speechString + axsJb_getColorOfBallImg(axsJb_getCurrentBallImgNode(row,axsJb_col));
  }
  speechString = speechString + axsJb_getColorOfBallImg(axsJb_getCurrentBallImgNode(axsJb_MAXROW,axsJb_col));
  axsJb_axsJaxObj.speakThroughPixel(speechString);
}


function axsJb_keyboardHandler(evt){
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
}


document.addEventListener('keypress', axsJb_keyboardHandler, true);
