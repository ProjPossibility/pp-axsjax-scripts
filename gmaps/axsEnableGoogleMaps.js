var axsMaps = {};
var directionReader = {};

axsMaps.axsObj = new AxsJAX();

axsMaps.init = function() 
{
	document.addEventListener('keypress', axsJb_keyboardHandler, true);//to readback
	var currentURL = document.baseURI;
	var len = document.title.length;
	len = len * 200; 

	if (currentURL === 'http://maps.google.com/') 
	{
		axsMaps.redirect();
	}
	else
	{
		if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=en')) 
		{
			setTimeout("axsMaps.getAddressFromUser()",4000);
			//setTimeout("axsMaps.readBack()",20000);
		}
		else if (!(document.getElementById("panel_dir") == null)) 
		{
			baseURL = 'http://ss12.info/svn/axsjax/';
			var theScript = document.createElement('script')
			theScript.type = 'text/javascript';
			var currentURL = document.baseURI;
			alert("Script uploaded");
			theScript.src = baseURL + 'gmaps/gmapsparser.js';
			document.getElementsByTagName('head')[0].appendChild(theScript);
		}
	}
}

axsMaps.readBack = function() {
var outputString = "Start Address is " + document.getElementById("d_d").value; 
axsMaps.axsObj.speakText(outputString);
Thread.sleep(1000);//wait for a second before continuing to read the end address
outputString = "End Address is " + document.getElementById("d_daddr").value;
axsMaps.axsObj.speakText(outputString);
}


axsMaps.redirect = function() {
	window.location = "http://maps.google.com/maps?f=d&output=html&hl=en";
	
	}

axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
}

axsMaps.errorCase = function() {
	alert("Error Case");
}

function axsJb_keyboardHandler(evt)
{
	addressReaderKeypress(evt);

}

function addressReaderKeypress(evt)
{
	if (evt.charCode == 92) // the '\' character
	{ 
		var focused = document.commandDispatcher.focusedElement;//to eliminate the '\' character from the end  of the text field
		var tempString = focused.value;
		focused.value = tempString.substring(0,tempString.length - 1));
		axsMaps.readBack();		
	}
}

axsMaps.init();
