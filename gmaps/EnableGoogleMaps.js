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
  
  baseURL = 'http://ss12.info/svn/axsjax/gmaps/';
  var theScript = document.createElement('script')
  theScript.type = 'text/javascript';
  var currentURL = document.baseURI;
  if (currentURL.indexOf('http://maps.google.com/maps?f=d&output=html') === 0) {
     theScript.src = baseURL + 'gmapsparser.js';
  }
 
  document.getElementsByTagName('head')[0].appendChild(theLib);
  document.getElementsByTagName('head')[0].appendChild(theScript);
 


}

pickScript();
