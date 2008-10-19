
// ==UserScript==
// @name          GoogleMaps Accessibility Enhancements
// @namespace     
// @description   AsxJAX 
// @include       http://maps.google.com/
// ==/UserScript==

function loadScript(){
<<<<<<< .mine
window.location="http://www.youtube.com";
>>>>>>> .r631
  
	
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/Prince/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
