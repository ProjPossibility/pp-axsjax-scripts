// Copyright 2007 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview The Google Script Loader Greasemonkey script will load
 * this script which will pick the appropriate scripts to load
 * for the Google app that the user is currently using.
 * @author clchen@google.com (Charles L. Chen)
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
 
    var baseURL = 'http://ss12.info/svn/axsjax/Group2/axsEnableWikipedia2.js';
	  var theScript = document.createElement('script');
    theScript.type = 'text/javascript';
    theScript.src = baseURL;
 
    document.getElementsByTagName('head')[0].appendChild(theLib);
    document.getElementsByTagName('head')[0].appendChild(theScript);
 
}

pickScript();
