var axsMaps = {};
var directionReader = {};
var indirectCase =0;
axsMaps.axsObj = new AxsJAX();

lang_ext = "es";
lang_code = "es";

axsMaps.init = function() 
{
	document.addEventListener('keypress', axsJb_keyboardHandler, true);
	var currentURL = document.baseURI;
	var len = document.title.length;
	len = len * 200; 

	if (currentURL === 'http://maps.google.' + lang_ext + '/') 
	{
		indirectCase = 1;
		axsMaps.redirect();
	}
	else
	{
		if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=' + lang_code)) 
		{
			setTimeout("axsMaps.getAddressFromUser()",4000);
			//setTimeout("axsMaps.readBack()",20000);
		}
		else if(currentURL.indexOf('&dirmode=walking') == -1)
		{
			alert("In case");
			indirectCase = 2;
			axsMaps.redirect();
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
var outputString = "Start Address is." + document.getElementById("d_d").value + ". . . End Address is ." + document.getElementById("d_daddr").value;;
axsMaps.axsObj.speakText(outputString);
}


axsMaps.redirect = function() 
{
	alert(indirectCase);
	if(indirectCase==1)
		window.location = "http://maps.google.com/maps?f=d&output=html&hl=" + lang_code;
	if(indirectCase==2)
		window.location = document.baseURI + "&dirmode=walking&dirflg=w";
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
	if (evt.keyCode == 123) //f12
	{ 
		axsMaps.readBack();
	}
}

axsMaps.init();
