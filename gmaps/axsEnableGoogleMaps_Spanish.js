//axsEnableGoogleMaps.js

var axsMaps = {};
var directionReader = {};
var indirectCase =0;
axsMaps.axsObj = new AxsJAX();//Must create an AxsJAX object in order to speak

/*axsMaps is  the main function in the program.  
In the case that it encounters maps.google.com, it will redirect to a simplified google maps page using the axsMaps,redirect() function defined below. 
In the case that it encounters http://maps.google.com/maps?f=d&output=html&hl=en, it will set the focus  (aka the cursor) to the "Start Address" Text Box
After the text has been entered, the user can push F12 if they want to read back the text they have entered, to insure that its correct
If the directions that they have entered are a direct match to locations in the google maps database, then call gmapsparser.js, which will read the directions sequentially
If the directions are close to locations in the google maps database, then they will be refered to a suggestions page, using suggestions.js
In the last case, when there is no match for the directions that they have inputed, the user will hear a message telling them that there is no match, and then they will be redirected to the main page.
*/
axsMaps.init = function() 
{
	document.addEventListener('keypress', axsJb_keyboardHandler, true);
	var currentURL = document.baseURI;
	var len = document.title.length;
	len = len * 200; 

	if (currentURL === 'http://maps.google.es/') 
	{
		indirectCase = 1;
		axsMaps.redirect();
	}
	else
	{
		if (currentURL === ('http://maps.google.com/maps?f=d&output=html&hl=es')) 
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

//readBack will repeat the entered start address and end address
axsMaps.readBack = function() {
var outputString = 'Dirección de origen es . ' + document.getElementById("d_d").value + ' . . . Dirección de destino es . ' + document.getElementById("d_daddr").value;//the periods are added to indicate a pause in the speech synthesis
axsMaps.axsObj.speakText(outputString);
}

//redirect will redirect the user to a page specified by whether they are walking or driving
axsMaps.redirect = function() 
{
	if(indirectCase==1)
		window.location = "http://maps.google.com/maps?f=d&output=html&hl=es";
	if(indirectCase==2)
		window.location = document.baseURI + "&dirmode=walking&dirflg=w";
	else
		window.location = "http://maps.google.com/maps?f=d&output=html&hl=es";
}

//getAddressFromUser will make the cursor point to "Start Address" text box
axsMaps.getAddressFromUser = function() {
	document.getElementById("d_d").focus();
}

//errorCase encounters the case that the user has entered bad input, and they will hear the error, and then be redirected to the main page
axsMaps.errorCase = function() {
	axsMaps.axsObj.speakTextViaNode("Google Maps could not find any directions");
	indirectCase = 1;
	setTimeout('axsMaps.redirect()',5000);
}

//axsJb_keyboardHandler just calls addressReaderKeyPress
function axsJb_keyboardHandler(evt)
{
	addressReaderKeypress(evt);

}

//addressReaderKeypress just listens for F12 and then calls the readback function in that case
function addressReaderKeypress(evt)
{
	if (evt.keyCode == 123) //f12
	{ 
		axsMaps.readBack();
	}
}

//main function call
axsMaps.init();
