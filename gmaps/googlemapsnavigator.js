
// ==UserScript==
// @name          Wikipedia Accessibility Enhancements
// @namespace     
// @description   Uses WAI-ARIA to enhance accessibility for Wikipedia
// @include       http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=*
// ==/UserScript==

function loadScript(){
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/gmapsparser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
