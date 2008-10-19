//Header comment...

//Redirect to a sparser Google Maps
//window.location = "http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr="

//Prompt user for address
var axsMaps = {};

axsMaps.axsObj = new AxsJAX();
//Thread.sleep(4000);
//axsMaps.axsObj.speakTextViaNode("Please enter start address");

axsMaps.init = function() {
	var len = document.title.length;
	len = len * 200;
    var currentURL = document.baseURI;
  if (currentURL === 'http://maps.google.com/') {
	//alert("maps.google.com");
     axsMaps.redirect();
	 //
	 //Thread.sleep(10000);
  }
  else
  {
 //axsMaps.axsObj.speakTextViaNode("Please enter start address");
	if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en')) {
		setTimeout("axsMaps.getAddressFromUser()",4000);
		//setTimeout("axsMaps.readBack()",20000);
		
	//alert("get Address ran successfully");
	}
	else if(!(document.getElementById("panel_dir") == null)) {
		//alert("We have directions");  
		Thread.sleep(len);
		baseURL = 'http://ss12.info/svn/axsjax/';
		var theScript = document.createElement('script')
		theScript.type = 'text/javascript';
		var currentURL = document.baseURI;  
		theScript.src = baseURL + 'gmaps/gmapsparser.js';
		document.getElementsByTagName('head')[0].appendChild(theScript);

		//TODO - Read directions
	}
	else
	{
	
	}

	
	
  }

  /*if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=')) {
	
	//alert("get Address ran successfully");
  }*/
	
	//document.addEventListener('keypress', axsMaps, true);

}

/*axsMaps.readBack = function() {
var outputString = "Start Address        " + 
	  document.getElementById("d_d").value + 
	  "                    End Address        "	   +
	  document.getElementById("d_daddr").value;
axsMaps.axsObj.speakText(outputString);
}
*/

axsMaps.redirect = function() {
	window.location = "http://maps.google.com/maps?f=d&output=html&hl=en";
	
	}

axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
	//axsMaps.axsObj.speakText("hello");
}






axsMaps.init();
