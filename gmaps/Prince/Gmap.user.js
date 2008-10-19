
// ==UserScript==
// @name          GoogleMaps Accessibility Enhancements
// @namespace     
// @description   AsxJAX 
// @include       http://maps.google.com/
// ==/UserScript==

function loadScript(){


//var table = document.getElementByTagName("TABLE");

window.location="http://maps.google.com/maps?f=d&output=html&hl=en";
alert("this is what the table is");
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/Prince/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
