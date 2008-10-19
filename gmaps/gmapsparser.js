var axsMaps = {};
var directionReader = {};

axsMaps.axsObj = NULL;
axsMaps.axsObj = new AxsJAX();
alert("Hi");
axsMaps.axsObj.speakTextViaNode("Please enter start address");

axsMaps.init = function() {
	 alert("get Address ran successfully");
}

axsMaps.redirect = function() {
	window.location = "http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=";
	
	}

directionReader.init = function() {

}

axsMaps.init();
