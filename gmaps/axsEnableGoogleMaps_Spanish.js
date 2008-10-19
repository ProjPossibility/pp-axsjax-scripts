var axsMaps = {};
var directionReader = {};
var indirectCase =0;
axsMaps.axsObj = new AxsJAX();

var lang = 'es'
var lang_ext = 'es'

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
		if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=' + lang)) 
		{
			setTimeout("axsMaps.getAddressFromUser()",4000);
		}
		else if(currentURL.indexOf('&dirmode=walking') == -1 && currentURL.indexOf('&dirmode=driving') == -1 && currentURL.indexOf('&dirmode=transit'))
		{
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
		else {
		var fonts = document.getElementsByTagName("font");
			if (fonts[0].innerHTML == "Did you mean:&nbsp;") {
				baseURL = 'http://ss12.info/svn/axsjax/';
				var theScript = document.createElement('script')
				theScript.type = 'text/javascript';
				var currentURL = document.baseURI;
				theScript.src = baseURL + 'gmaps/suggestion.js';
				document.getElementsByTagName('head')[0].appendChild(theScript);
			}
			else{
				setTimeout('axsMaps.errorCase()',len);
			}
		}
	}
}

axsMaps.readBack = function() {
var outputString = "Start Address is . " + document.getElementById("d_d").value + " . . . End Address is . " + document.getElementById("d_daddr").value;//the periods are added to indicate a pause in the speech synthesis
axsMaps.axsObj.speakText(outputString);
}


axsMaps.redirect = function() 
{
	if(indirectCase==1)
		window.location = "http://maps.google.com/maps?f=d&output=html&hl=" + lang;
	if(indirectCase==2)
		window.location = document.baseURI + "&dirmode=walking&dirflg=w";
	else
		window.location = "http://maps.google.com/maps?f=d&output=html&hl=" + lang;
}

axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
}

axsMaps.errorCase = function() {
	axsMaps.axsObj.speakText("Google Maps could not find any directions");
	indirectCase = 1;
	setTimeout('axsMaps.redirect()',5000);
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