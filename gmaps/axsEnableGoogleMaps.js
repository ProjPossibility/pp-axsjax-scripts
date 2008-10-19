var axsMaps = {};
var directionReader = {};

axsMaps.axsObj = new AxsJAX();

axsMaps.init = function() 
{
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
			setTimeout("axsMaps.readBack()",20000);
		}
		else if (!(document.getElementById("panel_dir") == null)) 
		{
			baseURL = 'http://ss12.info/svn/axsjax/';
			var theScript = document.createElement('script')
			theScript.type = 'text/javascript';
			var currentURL = document.baseURI;
			theScript.src = baseURL + 'gmaps/gmapsparser.js';
			document.getElementsByTagName('head')[0].appendChild(theScript);
		}
	}
}

axsMaps.readBack = function() {
var outputString = "Start Address        " + 
	  document.getElementById("d_d").value + 
	  "                    End Address        "	   +
	  document.getElementById("d_daddr").value;
axsMaps.axsObj.speakText(outputString);
}


axsMaps.redirect = function() 
	{
		window.location = "http://maps.google.com/maps?f=d&output=html&hl=en";
	}

axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
}

axsMaps.errorCase = function() {
	alert("Error Case");
}

axsMaps.init();
