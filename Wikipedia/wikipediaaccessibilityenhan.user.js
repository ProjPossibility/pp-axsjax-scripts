
// ==UserScript==
// @name          Wikipedia Accessibility Enhancements
// @namespace     http://www.google.com/accessible/
// @description   Uses WAI-ARIA to enhance accessibility for Wikipedia
// @include       http://www.wikipedia.org/*, http://en.wikipedia.org/*
// ==/UserScript==

function loadScript(){
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/Wikipedia/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();