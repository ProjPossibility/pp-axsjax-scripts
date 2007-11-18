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
      if (evt.charCode == 49) {  // 1
         axsWiki.readParagraphClass("Classification");
      }
      if (evt.charCode == 50) {
         axsWiki.readParagraphClass("Morphology");
      }
	if (evt.charCode == 110) {  // n
         if (axsWiki.currentPara < axsWiki.maxParas - 1) {
            axsWiki.currentPara++;
            axsWiki.readParagraphNumber(axsWiki.currentPara);
         } else if (axsWiki.currentPara == axsWiki.maxParas - 1) {
            axsWiki.currentPara = 0;
            axsWiki.readParagraphNumber(axsWiki.currentPara);
         }
      }
      if (evt.charCode == 112) {  // p
         if (axsWiki.currentPara > 0) {
            axsWiki.currentPara--;
            axsWiki.readParagraphNumber(axsWiki.currentPara);
         } else if (axsWiki.currentPara == 0) {
            axsWiki.currentPara = axsWiki.maxParas - 1;
            axsWiki.readParagraphNumber(axsWikicurrentPara);
         }
      }
  }
};

axsWiki.readParagraphClass = function(class) {
   var start = false;
   for (var i = 0; i < axsWiki.maxParas; i++) {
      var node = axsWiki.Paras[i].getElementsByTagName('a');
      for (var j = 0; j < node.length; j++) {
         var id = node[j].getAttribute('id');
         if (id == class) {
             axsWiki.readParagraphNumber(i+1)
         }
      }
   }
};

axsWiki.readParagraphNumber = function(number) {
//    alert(axsWiki.Paras[number].textContent);
    axsWiki.axsObj.goTo(axsWiki.Paras[number]);
//    axsObj.speakText(axsWiki.Paras[number].textContent);
};

axsWiki.init = function() {
  axsWiki.Paras = document.getElementsByTagName("p");
  axsWiki.maxParas = axsWiki.Paras.length;
  axsWiki.currentPara = -1;
  axsWiki.currentState = axsWiki.READING_PARAGRAPHS;
  document.addEventListener('keypress', axsWiki.keyboardHandler, true);
};

axsWiki.init();
