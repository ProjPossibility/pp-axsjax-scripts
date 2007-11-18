//AxsJAX script for Wikipedia game at:
//http://en.wikipedia.org/juegos/jawbreaker/jawbreaker.htm

var maxParas = 0;
var Paras = null;
var currentPara = 0;
var currentState = 0;
var READING_PARAGRAPHS = 1;
var READING_TOC = 2;
var axsJb_axsJaxObj = new AxsJAX();

/*
 * 
 */
function axsJb_keyboardHandler(evt){
  if (currentState == READING_PARAGRAPHS) {
	if (evt.charCode == 110) {  // n
         if (currentPara < maxParas - 1) {
            currentPara++;
            readParagraph(currentPara);
         } else if (currentPara == maxParas - 1) {
            currentPara = 0;
            readParagraph(currentPara);
         }
      }
      if (evt.charCode == 112) {  // p
         if (currentPara > 0) {
            currentPara--;
            readParagraph(currentPara);
         } else if (currentPara == 0) {
            currentPara = maxParas - 1;
            readParagraph(currentPara);
         }
      }
  }
}

function readParagraph(number) {
    alert(Paras[number].textContent);
    axsJb_axsJaxObj.speakText(Paras[number].textContent);
}

function init() {
  Paras = document.getElementsByTagName("p");
  maxParas = Paras.length;
  currentPara = -1;
  currentState = READING_PARAGRAPHS;
}

init();
document.addEventListener('keypress', axsJb_keyboardHandler, true);
