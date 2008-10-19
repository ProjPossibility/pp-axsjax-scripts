var axsMaps = {};
var directionReader = {};

axsMaps.axsObj = new AxsJAX();
int indirectCase=0;

axsMaps.init = function() 
{
	var currentURL = document.baseURI;
	var len = document.title.length;
	len = len * 200; 

	if (currentURL === 'http://maps.google.com/') 
	{
		indirectCase = 1;
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
			int indirectCase = 2;
			if(!currentURL.indexOf('&dirmode=walking&dirflg=w') === 0)
				axsMaps.redirect();

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
	alert(indirectCase);
	if(indirectCase==1)
		window.location = "http://maps.google.com/maps?f=d&output=html&hl=en";
	if(indirectCase==2)
		window.location = document.baseURI + "&dirmode=walking&dirflg=w";
}

axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
}

axsMaps.errorCase = function() {
	alert("Error Case");
}

axsMaps.init();
