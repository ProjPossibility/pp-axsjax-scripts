
// ==UserScript==
// @name          GoogleMaps Accessibility Enhancements
// @namespace     
// @description   AsxJAX 
// @include       http://maps.google.com/
// ==/UserScript==

function loadScript(){
  //window.location = "http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr="
  document.write('<meta http-equiv="REFRESH" content="2;url=http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=">');
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
