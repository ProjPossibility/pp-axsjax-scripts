//AxsJAX script for Wikipedia game at:
//http://en.wikipedia.org/*

axsLangWiki = {};

axsLangWiki.languages = null;
axsLangWiki.addresses = null;
axsLangWiki.currentPara = 0;
axsLangWiki.maxParas = 0;

/*
 * 
 */
axsLangWiki.keyboardHandler = function(evt) {
      alert(evt.charCode+"  "+axsLangWiki.currentPara);
  	if (evt.charCode == 110) {  // n
         if (axsLangWiki.currentPara < axsLangWiki.maxParas - 1) {
            axsLangWiki.currentPara++;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         } else if (axsLangWiki.currentPara == axsLangWiki.maxParas - 1) {
            axsLangWiki.currentPara = 0;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         }
      }
      if (evt.charCode == 112) {  // p
         if (axsLangWiki.currentPara > 0) {
            axsLangWiki.currentPara--;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         } else if (axsLangWiki.currentPara == 0) {
            axsLangWiki.currentPara = axsLangWiki.maxParas - 1;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         }
      } 
};

axsLangWiki.readParagraphNumber = function(number) {
//    alert(axsLangWiki.Paras[number].textContent);
    alert(axsLangWiki.languages[number].textContent);
    axsLangWiki.axsObj.SpeakText(axsLangWiki.languages[number].textContent);
//    axsObj.speakText(axsLangWiki.Paras[number].textContent);
};

axsLangWiki.init = function() {
  axsLangWiki.languages = new Array();
  axsLangWiki.addresses = new Array();
  var nodes = document.getElementsByTagName('strong');
  for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i].getElementsByTagName('a');
      axsLangWiki.languages.push(node);
      var ref = node[0].href;
      axsLangWiki.addresses.push(ref);
  }
};

axsLangWiki.init();
