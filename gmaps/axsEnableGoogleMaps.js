//Header comment...

//Redirect to a sparser Google Maps
//window.location = "http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr="

//Prompt user for address
var axsMaps = {};
var directionReader = {};

axsMaps.axsObj = new AxsJAX();
//Thread.sleep(4000);
//axsMaps.axsObj.speakTextViaNode("Please enter start address");

axsMaps.init = function() {
    var currentURL = document.baseURI;
  if (currentURL === 'http://www.facebook.com/') {
	//alert("maps.google.com");
     axsMaps.redirect();
	 //
	 //Thread.sleep(10000);
  }
 //axsMaps.axsObj.speakTextViaNode("Please enter start address");
 
  if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=')) {
	document.getElementById("d_d").focus();
	//alert("get Address ran successfully");
  }
 // Thread.sleep(10000);
  axsMaps.axsObj.speakText("hello ");

  //else if () {
   //  theScript.src = baseURL + 'gmaps/axsEnableGoogleMaps.js';
  //}

	
}

axsMaps.redirect = function() {
	window.location = "http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=";
	
	}

directionReader.init = function() {

}

axsMaps.init();
