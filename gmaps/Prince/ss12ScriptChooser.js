


  alert("HELOOOOOOOOOOO");
//This will redirect from maps.google.com to the following URL
//window.location="http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=";



// Copyright 2007 
// 
// Licensed under GPL


/**
 * @fileoverview The Greasemonkey script wikipediaaccessibilityenhan.user.js will load
 * this script which will pick the appropriate scripts to load
 * for the Wikipedia web page.
 * There is a separate script for processing the main wikipedia page for doing the 
 * language selection and another script for processing the english version of the
 * wikipedia page
 * @author gurmeets@usc.edu (Gurmeet Singh)
 */

/*

function pickScript(){
  var baseURL = 'http://google-axsjax.googlecode.com/svn/trunk/';
  var theLib = document.createElement('script');
  theLib.type = 'text/javascript';
  theLib.src = baseURL + 'common/AxsJAX.js';
  //Do not insert anything if the scripts are already inserted.
  var scriptArray = document.getElementsByTagName('script');
  for (var i=0; i<scriptArray.length; i++){
    if(scriptArray[i].src == theLib.src){
      return;
    }
  }
  
  baseURL = 'http://ss12.info/svn/axsjax/';
  var theScript = document.createElement('script')
  theScript.type = 'text/javascript';
  var currentURL = document.baseURI;
  if (currentURL.indexOf('http://www.wikipedia.org/') === 0) {
     theScript.src = baseURL + 'Wikipedia/LanguageSelection.js';
  }
 
  if (currentURL.indexOf('http://en.wikipedia.org/') === 0) {
     theScript.src = baseURL + 'Wikipedia/axsEnableWikipedia.js';
  }

  if (currentURL.indexOf('http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=') === 0) {
     the Script.src = baseURL + 'gmaps/axsEnableGoogleMaps.js';
  }

  document.getElementsByTagName('head')[0].appendChild(theLib);
  document.getElementsByTagName('head')[0].appendChild(theScript);
 


}

pickScript();