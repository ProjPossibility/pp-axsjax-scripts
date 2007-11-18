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
  axsJb_axsJaxObj.speakNode("Hello World");
}


document.addEventListener('keypress', axsJb_keyboardHandler, true);
