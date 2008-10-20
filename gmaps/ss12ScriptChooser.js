// Copyright 2008 
// 
// Licensed under GPL


/**
 * @fileoverview The Greasemonkey script Gmap.user.js will load
 * this script which will pick the appropriate scripts to load
 * for the maps.google.com web page.
 * There is a separate script for processing the main maps.google.com page for doing the 
 * language selection and another script for processing the english version of the
 * wikipedia page
 * @author kbafna@usc.edu (Kalpesh Bafna)
 */


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

  if (currentURL.indexOf('http://maps.google.com/') === 0) {
     theScript.src = baseURL + 'gmaps/axsEnableGoogleMaps.js';
  }
  
  if (currentURL.indexOf('http://maps.google.es/') === 0) {
	theScript.src = baseURL + 'gmaps/axsEnableGoogleMaps_Spanish.js';
  }

  document.getElementsByTagName('head')[0].appendChild(theLib);
  document.getElementsByTagName('head')[0].appendChild(theScript);

}

pickScript();

