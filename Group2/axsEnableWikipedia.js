//AxsJAX script for Jawbreaker game at:
//http://www.minijuegosgratis.com/juegos/jawbreaker/jawbreaker.htm

var axsJb_axsJaxObj = new AxsJAX();

/*
 * Dictionary mapping  image names to color names
 */
function axsJb_keyboardHandler(evt){
  axsJb_axsJaxObj.speakThroughPixel("Hi Sarika");
/*var entiredoc = document.documentElement;
var docnodes=entiredoc.childNodes;
 axsJb_axsJaxObj.speakText("Number of elements "+docnodes);
for (i=0; i<docnodes.length; i++)
alert(docnodes[i].tagName);
*/
  var paras = document.getElementsByTagName("p");
  var n = paras.length;
  var i = 0;
  for (i = 0; i < n; i++) {
     var node = paras[i];
     alert(node.textContent);
     axsJb_axsJaxObj.speakText(node.textContent);
  }

}
document.addEventListener('keypress', axsJb_keyboardHandler, true);
