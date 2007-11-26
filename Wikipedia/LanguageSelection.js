//Java script for language selection at http://www.wikipedia.org
//Author gurmeets@usc.edu   (Gurmeet Singh)

// The following keys are available
// '?' to listen to key shortcuts available
// '/' to go to audio language selection
// '/' to exit the audio language selection and put focus back on search box
// 'n' to go to next language while in audio selection
// 'p' to go to previous language while in audio selection
// 'enter' to select a particular language while in audio language selection

axsLangWiki = {};

// This is a finite state machine
// Inputmode refers to the case where the focus is on the search box
// HelpMode is the case where the focus is on the Audio language selection phase
INPUTMODE = 0;
HELPMODE = 1;

// Key characters
SLASH_KEY = 47;
QUESTIONMARK_KEY = 63;
ENTER_KEY = 13;
N_KEY = 110;
P_KEY = 112;
G_KEY = 103;

axsLangWiki.languages = null;
axsLangWiki.addresses = null;
axsLangWiki.currentPara = -1;
axsLangWiki.maxParas = 0;
axsLangWiki.currentState = 0;
axsLangWiki.helpString = 
'The following shortcut keys are available ' +
'Use / to go to audio language selection ' +
'Use / to come back to search box '+
'Use n to go to next language '+
'Use p to come back to previous language '+
'Use enter to select a language. ';

/*
 * 
 */
axsLangWiki.keyboardHandler = function(evt) {

//      alert(axsLangWiki.currentState+"  "+evt.charCode);
      if (evt.charCode == QUESTIONMARK_KEY) {
         axsLangWiki.axsObj.speakThroughPixel(axsLangWiki.helpString);
	   return;
      }

// If the user is shifting from the input mode to the help mode
// read out the first language
      if (axsLangWiki.currentState == INPUTMODE) {
	   if (evt.charCode == SLASH_KEY) {
         	axsLangWiki.currentState = HELPMODE;
            var message = "Use n and p for language selection";
            axsLangWiki.axsObj.speakThroughPixel(message);
         }
         return;
      }

// If the user is shifting from the help mode to the input mode
// redirect focus to the search input box
      if (axsLangWiki.currentState == HELPMODE && evt.charCode == SLASH_KEY) {
         axsLangWiki.currentState = INPUTMODE;
	   document.getElementById('searchInput').value = "";
	   document.getElementById("searchInput").focus();
         return;
      }

  	if (evt.charCode == N_KEY) {  // n
         if (axsLangWiki.currentPara < axsLangWiki.maxParas - 1) {
            axsLangWiki.currentPara++;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         } else if (axsLangWiki.currentPara == axsLangWiki.maxParas - 1) {
            axsLangWiki.currentPara = 0;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         }
      }
      if (evt.charCode == P_KEY) {  // p
         if (axsLangWiki.currentPara > 0) {
            axsLangWiki.currentPara--;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         } else if (axsLangWiki.currentPara == 0) {
            axsLangWiki.currentPara = axsLangWiki.maxParas - 1;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         } else {
            axsLangWiki.currentPara = 0;
            axsLangWiki.readLanguage(axsLangWiki.currentPara);
         }
      } 
      if (evt.keyCode == ENTER_KEY) {   // Enter
         document.location = axsLangWiki.addresses[axsLangWiki.currentPara];
      }
};

axsLangWiki.readLanguage = function(number) {
    axsLangWiki.axsObj.speakNode(axsLangWiki.languages[number]);
};

axsLangWiki.init = function() {
  axsLangWiki.languages = new Array();
  axsLangWiki.addresses = new Array();
  var nodes = document.getElementsByTagName('strong');
  axsLangWiki.maxParas = nodes.length;
  for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i].getElementsByTagName('a');
      axsLangWiki.languages.push(node[0]);
      var ref = node[0].href;
      axsLangWiki.addresses.push(ref);
  }
  axsLangWiki.axsObj = new AxsJAX(true);
  axsLangWiki.currentState = INPUTMODE;
  document.getElementById('searchInput').value = "";
  document.addEventListener('keypress', axsLangWiki.keyboardHandler, true);
};

axsLangWiki.init();
