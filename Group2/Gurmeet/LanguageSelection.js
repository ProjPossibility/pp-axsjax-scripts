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
            axsLangWiki.readLanguage(axsLangWikicurrentPara);
         }
      }
};

axsLangWiki.readParagraphNumber = function(number) {
//    alert(axsLangWiki.Paras[number].textContent);
    
    axsLangWiki.axsObj.SpeakText(axsLangWiki.languages[number]);
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
      alert(axsLangWiki.languages[i]+"  "+axsLangWiki.addresses[i]);
  }
};

axsLangWiki.init();
