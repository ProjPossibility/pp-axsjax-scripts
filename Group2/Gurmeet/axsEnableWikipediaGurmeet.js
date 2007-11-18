//AxsJAX script for Wikipedia game at:
//http://en.wikipedia.org/juegos/jawbreaker/jawbreaker.htm

maxParas = 0;
Paras = null;
currentPara = 0;
currentState = 0;
READING_PARAGRAPHS = 1;
READING_TOC = 2;
axsJaxObj = new AxsJAX(true);

/*
 * 
 */
function keyboardHandler(evt) {
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
    axsJaxObj.goTo(Paras[number]);
//    axsJaxObj.speakText(Paras[number].textContent);
}

function init() {
  Paras = document.getElementsByTagName("p");
  maxParas = Paras.length;
  currentPara = -1;
  currentState = READING_PARAGRAPH;
}

init();
document.addEventListener('keypress', keyboardHandler, true);
