//AxsJAX script for Jawbreaker game at:
//http://www.minijuegosgratis.com/juegos/jawbreaker/jawbreaker.htm

var axsJb_axsJaxObj = new AxsJAX();

var feedResultsArray = null;
var RESULTS_LOADED_STRING = 'Results loaded.';
var NO_RESULTS_STRING = 'Your search did not match any feeds. ' +
    'Please make sure all words are spelled correctly, ' +
    'or try different keywords, or try more general keywords. ';

/*
 * Dictionary mapping  image names to color names
 */
function axsJb_keyboardHandler(event){
  axsJb_axsJaxObj.speakThroughPixel("Hello World");
  feedResultsArray = new Array();
  var inputArray = event.target.getElementsByTagName("p");
  alert("hiiiii");
  for (var i = 0, result; result = inputArray[i]; i++) {
	
   // if (result.className == 'row'){
      feedResultsArray.push(result);
  //  }
  }

    alert("hi"+feedResultsArray.length);
    if (feedResultsArray.length > 0){
     axsJb_axsJaxObj.speakText(RESULTS_LOADED_STRING);
    } else {
      axsJb_axsJaxObj.speakText(NO_RESULTS_STRING);
    }

}

document.addEventListener('keypress', axsJb_keyboardHandler, true);
