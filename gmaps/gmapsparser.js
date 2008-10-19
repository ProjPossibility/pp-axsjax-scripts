
READING_ADDRESS = 1;
var axsgmap={};
var addressReader = {};
axsgmap.currentState = 0;
axsgmap.oldState = 0;
axsgmap.helpString =
    'The following shortcut keys are available. ' +
    'G, Return to Contents. ' +   
    'N, go to the next element. ' +
    'P, go to the previous element. ' +
    'R, to get the number of citations and links in the paragraph. '+
    'T, to traverse the citations in the paragraph. '+
    'Enter, open the current item or citation. ' +
    'Slash, jump to search blank. ' +
    'Escape, leave search blank. ' ;
axsgmap.axsObj=new AxsJAX();


addressReader.maxSteps = 0;
addressReader.step = null;
addressReader.currentLocation = 0;
addressReader.currentDist =0.0;


// Key press event handler when the paragraphs are being read



function axsJb_keyboardHandler(evt){

alert("sadfads");
axsgmap.axsObj.speakThroughPixel("google");
	
	/*if(evt.charCode == 47) // for the / key
	{
	document.getElementById('searchInput').focus();
      document.getElementById('searchInput').value = "";
	axsgmap.oldState = axsgmap.currentState;
	axsgmap.currentState = SEARCH;
	}
	if(evt.keyCode == 27) // escape key
	{
	document.getElementById('searchInput').blur();
	document.getElementById('searchInput').value="";
	axsgmap.currentState = axsgmap.oldState;
	}
	if(evt.charCode == 63) //? key
	{
	axsgmap.axsObj.speakThroughPixel(axsgmap.helpString);
	}
	if(axsgmap.currentState == READING_TOC)
	{
		toc_keypress(evt);
	}
	else */
	if(axsgmap.currentState==0)
      {
		addressReader_keypress(evt);
      }
}





function addressReader_keypress(evt)
{
	if (evt.charCode == 110) 
	{ // n
		//addressReader.currentDist = -1;
		if (addressReader.step < addressReader.maxStep - 1) 
		{
			addressReader.step++;
			addressReader.readCurrentStep(addressReader.step);
		} 
		else if (addressReader.currentPara == addressReader.maxParas - 1) 
		{
			addressReader.step = 0;
			addressReader.readCurrentStep(addressReader.step);
		}
	}

     
}

	addressReader.init = function() {

	addressReader.currentDist =0.0;
	addressReader.maxSteps = 3;
	addressReader.currentLocation = 0;
	
	};
addressReader.readCurrentStep = function(number) 
{

	var currentDirection= document.getElementById("step_0_"+number);
	var currentDirectionRecord=y.getElementsByTagName("td");
	//alert(x[3].innerHTML);
	axsgmap.axsObj.speakText("Direction"+(number+1)+currentDirectionRecord[1].innerHTML+"for"+currentDirectionRecord[3].innerHTML);
};


axsgmap.init = function()
{
	document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsgmap.init();
addressReader.init();
