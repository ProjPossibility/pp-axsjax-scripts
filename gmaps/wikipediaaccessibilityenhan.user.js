
// ==UserScript==
// @name          Wikipedia Accessibility Enhancements
// @namespace     
// @description   Uses WAI-ARIA to enhance accessibility for Wikipedia
// @include       http://www.wikipedia.org/*
// @include		  http://en.wikipedia.org/*
// @include       http://maps.google.com/*
// ==/UserScript==

function loadScript(){
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
