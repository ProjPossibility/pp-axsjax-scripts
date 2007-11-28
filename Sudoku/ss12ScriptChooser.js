
/**
 * @author gurmeets@usc.edu (Gurmeet Singh)
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
 
    var baseURL = 'http://ss12.info/svn/axsjax/Sudoku/axsEnableSudoku.js';
	  var theScript = document.createElement('script');
    theScript.type = 'text/javascript';
    theScript.src = baseURL;
 
    document.getElementsByTagName('head')[0].appendChild(theLib);
    document.getElementsByTagName('head')[0].appendChild(theScript);
 
}

pickScript();
