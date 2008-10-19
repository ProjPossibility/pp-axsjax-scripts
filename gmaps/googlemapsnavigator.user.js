
// ==UserScript==
// @name          Google maps Accessibility Enhancements
// @namespace     
// @description   Uses WAI-ARIA to enhance accessibility for Wikipedia
// @include       http://maps.google.com/maps?f=d&output=html&hl=en*
// ==/UserScript==

function loadScript(){
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/EnableGoogleMaps.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
