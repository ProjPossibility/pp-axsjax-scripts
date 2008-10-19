
// ==UserScript==
// @name          GoogleMaps Accessibility Enhancements
// @namespace     
// @description   AsxJAX 
// @include       http://maps.google.com/*
// ==/UserScript==

function loadScript(){
  
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
