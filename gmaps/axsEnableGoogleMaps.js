//Header comment...

var axsMaps = {};
var directionReader = {};

axsMaps.axsObj = new AxsJAX();

//Redirect to a sparser Google Maps
window.location = "http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr="

//Prompt user for address
axsMaps.axsObj.speakTextViaNode("Please enter start address motherfucker");

axsMaps.init = function() {

	//document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

directionReader.init = function() {

}

axsMaps.init();
