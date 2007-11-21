//Java script for language selection at http://www.wikipedia.org
//Author gurmeets@usc.edu   (Gurmeet Singh)

// When the page is loaded the user is asked to user the
// ? mark key to get into audio language selection
// ? can also be used to escape the language selection and put focus on search text box
// During language selection mode, pressing the enter key would 
// take the user to the page for that language
// 'n' and 'p' can be used to scroll through the languages on the page

axsLangWiki = {};

// This is a finite state machine
// Inputmode refers to the case where the focus is on the search box
// HelpMode is the case where the focus is on the Audio language selection phase
INPUTMODE = 0;
HELPMODE = 1;

// Key characters
QUESTIONMARK_KEY = 63;
ENTER_KEY = 13;
N_KEY = 110;
P_KEY = 112;

axsLangWiki.languages = null;
axsLangWiki.addresses = null;
axsLangWiki.currentPara = -1;
axsLangWiki.maxParas = 0;
axsLangWiki.currentState = INPUTMODE;

/*
 * 
 */
axsLangWiki.keyboardHandler = function(evt) {

//      alert(axsLangWiki.currentState+"  "+evt.charCode)
// If the user is shifting from the input mode to the help mode
// read out the first language
      if (axsLangWiki.currentState == INPUTMODE) {
	   if (evt.charCode == QUESTIONMARK_KEY) {
         	axsLangWiki.currentState = HELPMODE;
	   }
         return;
      }

// If the user is shifting from the help mode to the input mode
// redirect focus to the search input box
      if (axsLangWiki.currentState == HELPMODE && evt.charCode == QUESTIONMARK_KEY) {
         axsLangWiki.currentState = INPUTMODE;
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
  document.addEventListener('keypress', axsLangWiki.keyboardHandler, true);
};

axsLangWiki.init();
