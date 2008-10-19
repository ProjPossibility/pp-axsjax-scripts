READING_ADDRESS = 1;
var axsgmap={};
var addressReader = {};
axsgmap.axsObj = null;
axsgmap.axsObj = new AxsJAX(true);

axsgmap.currentState = 0;
axsgmap.oldState = 0;
axsgmap.helpString =    'The following shortcut keys are available. ' +     'G, Return to Contents. ' +       'N, go to the next element. ' +    'P, go to the previous element. ' +    'R, to get the number of citations and links in the paragraph. '+    'T, to traverse the citations in the paragraph. '+    'Enter, open the current item or citation. ' +    'Slash, jump to search blank. ' +    'Escape, leave search blank. ' ;




addressReader.step = 0;
addressReader.currentLocation = 0;
addressReader.currentDist =0.0;



var directionsTableNode = document.getElementById("ddr_steps_0");
var directionsSteps = directionsTableNode.getElementsByTagName("tr");
addressReader.maxSteps = directionsSteps.length;

//var str="speak dude";
//	alert(str);
//	axsgmap.axsObj.speakTextViaNode(str);

// Key press event handler when the paragraphs are being read



function axsJb_keyboardHandler(evt)
{
	addressReaderKeypress(evt);

}

function addressReaderKeypress(evt)
{
	if (evt.charCode == 110 || evt.charCode == 39 || evt.charCode == 38) 
	{ 
		if (addressReader.step < addressReader.maxSteps) 
		{
			addressReader.step++;
			addressReader.readCurrentStep(addressReader.step-1);
		} 
		else if (addressReader.step >= addressReader.maxParas - 1) 
		{
			addressReader.step = 1;
			addressReader.readCurrentStep(addressReader.step-1);
		}
	}

	if (evt.charCode == 112 || evt.charCode == 37 || evt.charCode == 40) 
	{ 
		if (addressReader.step > 1) 
		{
			addressReader.step--;
			addressReader.readCurrentStep(addressReader.step);
		} 
		else if (addressReader.step == addressReader.maxParas) 
		{
			addressReader.step = 1;
			addressReader.readCurrentStep(addressReader.step);
		}
	}
}

addressReader.init = function() 
{
	addressReader.currentDist =0.0;
	addressReader.currentLocation = 0;
	var all= document.getElementById("ddr_steps_0");
	addressReader.maxSteps = all.getElementsByTagName("tr").length;
}


addressReader.readCurrentStep = function(i) 
{


	stepElement = directionsSteps[i].getElementsByTagName("td");
	stepNum = stepElement[0].firstChild.nodeValue;
	stepText = "Step "+ stepNum + "    ";
	stepDesc = stepElement[1];
	for(j=0;j<stepDesc.childNodes.length;j++)//code to append only text node data to stepText
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
	axsgmap.axsObj.speakTextViaNode(stepText);
	if(i==addressReader.maxParas-1)
		axsgmap.axsObj.speakTextViaNode("You have reached destination");
};


axsgmap.init = function()
{
	document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsgmap.init();
addressReader.init();
