//AxsJAX script for Wikipedia game at:
//http://en.wikipedia.org/*

axsWiki = {};

axsWiki.maxParas = 0;
axsWiki.Paras = null;
axsWiki.currentPara = 0;
axsWiki.currentState = 0;
axsWiki.READING_PARAGRAPHS = 1;
axsWiki.READING_TOC = 2;
axsWiki.axsObj = new AxsJAX(true);

/*
 * 
 */
axsWiki.keyboardHandler = function(evt) {
  if (axsWiki.currentState == axsWiki.READING_PARAGRAPHS) {
	if (evt.charCode == 110) {  // n
         if (axsWiki.currentPara < axsWiki.maxParas - 1) {
            axsWiki.currentPara++;
            readParagraphNumber(axsWiki.currentPara);
         } else if (axsWiki.currentPara == axsWiki.maxParas - 1) {
            axsWiki.currentPara = 0;
            axsWiki.readParagraphNumber(axsWiki.currentPara);
         }
      }
      if (evt.charCode == 112) {  // p
         if (axsWiki.currentPara > 0) {
            axsWiki.currentPara--;
            axsWiki.readParagraph(axsWiki.currentPara);
         } else if (axsWiki.currentPara == 0) {
            axsWiki.currentPara = axsWiki.maxParas - 1;
            axsWiki.readParagraphNumber(axsWikicurrentPara);
         }
      }
  }
};

axsWiki.readParagraphClass = function(class) {
   
};

axsWiki.readParagraphNumber = function(number) {
//    alert(Paras[number].textContent);
    axsJaxObj.goTo(Paras[number]);
//    axsJaxObj.speakText(Paras[number].textContent);
};

axsWiki.init = function() {
  axsWiki.Paras = document.getElementsByTagName("p");
  axsWiki.maxParas = axsWiki.Paras.length;
  axsWiki.currentPara = -1;
  axsWiki.currentState = axsWiki.READING_PARAGRAPHS;
  document.addEventListener('keypress', axsWiki.keyboardHandler, true);
};

axsWiki.init();
