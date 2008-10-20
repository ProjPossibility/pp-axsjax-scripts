//Java script for speaking directions at http://maps.google.com
//Author kbafna@usc.edu(Kalpesh Bafna)
//Author tambve@usc.edu(Vinay Tambve)
//Author rsankhla@usc.edu(Ronak Sankhla)

// The following keys are available
// 'h' to listen to key shortcuts available(help)
// 'n' or left arrow to go to next direction
// 'p' or right arrow to go to previous direction
// 'y' to select the current suggestion
// 'F12' to listen out the start and end destinations

var axsgmap={};
var addressReader = {};
var AutoStepText = "";
axsgmap.axsObj = null;
axsgmap.axsObj = new AxsJAX(true);

axsgmap.helpString =  'The following shortcut keys are available. '+ 
'Press N to go to the next direction or suggestion,, ' +
'Press P to go to the previous direction or suggestion,, ' +
'Press F12 to listen out the start and end destinations,,' +
'Press A to auto listen all the direction,,' +
'Press H to listen the help again ';
var directionsTableNode;
var directionsSteps;



// Key press event handler to navigate through directions
function axsJb_keyboardHandler(evt)
{
	if (evt.charCode == 110 || evt.keyCode == 39)                               // 'n' or right arrow for next step
	{ 
		if (addressReader.step < addressReader.maxSteps) 
		{
			addressReader.step++;
			addressReader.readCurrentStep(addressReader.step-1,0);

		} 
		else if (addressReader.step > addressReader.maxSteps - 1) 
		{
			addressReader.step = 1;
			addressReader.readCurrentStep(addressReader.step-1,0);
		}
	}

	else if (evt.charCode == 112 || evt.keyCode == 37)                         // 'p' or left arrow for previous step
	{ 
		if (addressReader.step > 0) 
		{
			addressReader.step--;
			addressReader.readCurrentStep(addressReader.step,0);
		} 
		else if (addressReader.step == addressReader.maxSteps) 
		{
			addressReader.step = 1;
			addressReader.readCurrentStep(addressReader.step,0);
		}
	}
	else if (evt.charCode == 65 || evt.charCode == 97)                       // 'a' for automode
	{
		AutoStepText = "Auto mode activated. ";
		if(addressReader.step == 0)
			addressReader.step = 1;
		for(addressReader.step;addressReader.step<=addressReader.maxSteps;addressReader.step++)
		{
			addressReader.readCurrentStep(addressReader.step-1,1);
			AutoStepText += ". . ";
		}
		axsgmap.axsObj.speakTextViaNode(AutoStepText);
	}
	else if (evt.charCode == 72 || evt.keyCode == 104)					// 'h' for help
		axsgmap.axsObj.speakTextViaNode(axsgmap.helpString);
}



//initialization function
addressReader.init = function()  
{
	directionsTableNode = document.getElementById("ddr_steps_0");
	directionsSteps = directionsTableNode.getElementsByTagName("tr");
	addressReader.maxSteps = directionsSteps.length;
	addressReader.step = 0;
}


//Reads a step at a time
//param @i         : current step index.
//param @automode  : flag for auto mode.

addressReader.readCurrentStep = function(i,automode) 
{
	stepElement = directionsSteps[i].getElementsByTagName("td");
	stepNum = stepElement[0].firstChild.nodeValue;
	stepText = " Step "+ stepNum + "    ";                                              // preparing text to speak
	stepDesc = stepElement[1];
	for(j=0;j<stepDesc.childNodes.length;j++)                                           // to append text node data only
	{
		if(stepDesc.childNodes[j].nodeType != 3)
		{
			for(k=0;k<stepDesc.childNodes[j].childNodes.length;k++)
			{
				if(stepDesc.childNodes[j].childNodes[k].nodeType != 3)
				{
					stepText += stepDesc.childNodes[j].childNodes[k].innerHTML;
				}
				else
				{
					stepText += stepDesc.childNodes[j].childNodes[k].nodeValue;
				}
			}
		}
		else
		{
			stepText += stepDesc.childNodes[j].nodeValue;
		}
	}

	stepText = stepText.replace(/ N /g, " North ");
	stepText = stepText.replace(/ S /g, " South ");
	stepText = stepText.replace(/ E /g, " East ");
	stepText = stepText.replace(/ W /g, " West ");
	stepDistance = stepElement[3].firstChild.firstChild.nodeValue;
		stepText += ". The distance for the step is " + stepDistance;
	if(addressReader.step == addressReader.maxSteps)
		stepText += ". You have reached your destination.";
	if(automode==0)
		axsgmap.axsObj.speakTextViaNode(stepText);
	else
		AutoStepText += stepText;
};


//initialization function for axsJAX object
axsgmap.init = function()
{
	document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsgmap.init();
addressReader.init();
