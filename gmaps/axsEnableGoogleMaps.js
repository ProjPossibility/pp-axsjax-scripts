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
  else
  {
 //axsMaps.axsObj.speakTextViaNode("Please enter start address");
	if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en')) {
		setTimeout("axsMaps.getAddressFromUser()",4000);
		setTimeout("axsMaps.readBack()",20000);
		
	//alert("get Address ran successfully");
	}
	else if (!(document.getElementById("panel_dir") == null)) {
		//alert("We have directions");        	
		setTimeout('axsMaps.axsObj.speakText("We have directions")',10000);
		//TODO - Read directions
	}
	/*var paragraphs = document.getElementsByTagName('p');
	for(i = 0; i<paragraphs.length;i++)
	{
		if(paragraphs[i].value == ("Suggestions: "))
		{
			axsMaps.errorCase();
		}
	}
	*/
	else
	{
	var tables = document.getElementsByTagName('table');
	if (tables.length >= 2) 
	{
		axsMaps.suggestionCase(tables[2]);
		alert("suggestion");
	}
	else
	{
		var len = document.title.length;
		len = len * 200; 
		setTimeout('axsMaps.axsObj.speakText("We Do not have directions")',len);
	}
	}
  }

  /*if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en&saddr=&daddr=')) {
	
	//alert("get Address ran successfully");
  }*/
	
	document.addEventListener('keypress', axsMaps, true);

}

axsMaps.readBack = function() {
var outputString = "Start Address        " + 
	  document.getElementById("d_d").value + 
	  "                    End Address        "	   +
	  document.getElementById("d_daddr").value;
axsMaps.axsObj.speakText(outputString);
}


axsMaps.redirect = function() {
	window.location = "http://maps.google.com/maps?f=d&output=html&hl=en";
	
	}

axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
	//axsMaps.axsObj.speakText("hello");
}

/*axsMaps.errorCase = function() {

}
*/
axsMaps.suggestionCase = function(table) {
	axsMaps.axsObj.speakText("Did you mean      ");
	var locations = table.getElementsByTagName('i');
	for (a = 0; a < locations.length; a++) {
		axsMaps.axsObj.speakText(locations[a].value);
	}
}

axsMaps.init();
