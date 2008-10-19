
// ==UserScript==
// @name          GoogleMaps Accessibility Enhancements
// @namespace     
// @description   AsxJAX 
// @include       http://maps.google.com/*
// ==/UserScript==

function loadScript(){
  
<<<<<<< .mine
  //This will redirect from maps.google.com to the following URL
   window.location="http://www.google.com";
   //document.d_daddr.onfocus();
 //break;
>>>>>>> .r449
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/gmaps/Prince/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
