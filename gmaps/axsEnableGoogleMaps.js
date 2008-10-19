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
  if (currentURL === 'http://maps.google.com/') {
	//alert("maps.google.com");
     axsMaps.redirect();
	 //
	 //Thread.sleep(10000);
  }
 //axsMaps.axsObj.speakTextViaNode("Please enter start address");
<<<<<<< .mine
=======
 
>>>>>>> .r636
  if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=')) {
	setTimeout("axsMaps.getAddressFromUser()",4000);
	//alert("get Address ran successfully");
  }
<<<<<<< .mine

  if (!(document.getElementById("panel_dir") == null)) {
=======
  
 /* else {
	if (!(document.getElementById("panel_dir") == null)) {
>>>>>>> .r636
		//alert("We have directions");        	
		//TODO - Read directions
	}
<<<<<<< .mine
  

  /*if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=')) {
	
	//alert("get Address ran successfully");
=======
	else {
		//alert("We do not have directions");
	}
>>>>>>> .r636
  }*/

 
	
	//document.addEventListener('keypress', keyboardEvent, false);

}



axsMaps.redirect = function() {
	window.location = "http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=";
	
	}

axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
	//axsMaps.axsObj.speakText("hello");
}

//axsMaps.init();
