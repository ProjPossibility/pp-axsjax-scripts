//AxsJAX script for Jawbreaker game at:
//http://www.minijuegosgratis.com/juegos/jawbreaker/jawbreaker.htm

var axsJb_row = 0;
var axsJb_col = 0;
var axsJb_MAXROW = 11;
var axsJb_MAXCOL = 10;
var axsJb_axsJaxObj = new AxsJAX();

/*
 * Dictionary mapping  image names to color names
 */
function axsJb_keyboardHandler(evt){
  var paras = document.getElementByTagName("p");
  var n = paras.length;
  var i = 0;
  for (i = 0; i < n; i++) {
     var node = paras[i];
     axsJb_axsJaxObj.speakNode(node);
  }
}


document.addEventListener('keypress', axsJb_keyboardHandler, true);
