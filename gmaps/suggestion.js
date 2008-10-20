/****************************************************************************************
Java Script that will allow user to read suggestions and possibly select one of them 

Functions

did_mean_handler()	:	handles the keys pressed
read_suggestion()	:	Reads out the current suggestion
speakText()			:	Reads out any variable/String

Variables

axsSuggestion		:	AxsJAX object
tableData			:	Stores the table of suggestion's returned by Google map
dataContain			:	Stores individual suggestion 
counter				:	Iterates through suggestions

Author				:	Ronak Sankhla(rsankhla@usc.edu)
						Josh Silverman(joshuams@usc.edu)
****************************************************************************************/


axsSuggestion = new AxsJAX();  // initialize AxsJAX object for speaking out text 

/*	Extract the data from Google Map Web Page	*/
var tableData =document.getElementsByTagName("table");
var dataContain =tableData[tableData.length-2].getElementsByTagName("i");
var len = document.title.length;
	len = len * 200; 
	//Thread.sleep(len);
	setTimeout('axsSuggestion.speakTextViaNode("Address did not match. Try suggestions")',len);


/*	Action Listner to browse through suggestions	*/

document.addEventListener('keypress', did_u_mean_handler, true);
var counter = -1;
function did_u_mean_handler(evt)
{
	if (evt.charCode == 112 || evt.keyCode == 37) // p key (previous suggestion)
	{	
		if(counter > 0)
		{
			counter--;
		}
		else
		{	
			counter = dataContain.length;
		}
		read_suggestion(counter);
	}
	
	if(evt.charCode == 110 || evt.keyCode == 39) 	// n key (next suggestion)
	{
		if(counter < dataContain.length -1 )
		{	
			counter++;
		}
		else
		{
			counter = 0;
		}
		read_suggestion(counter);
	}
	if(evt.charCode == 89 || evt.charCode == 121) // y key (confirm suggestion)
	{
		axsSuggestion.speakTextViaNode("You have chosen : "+dataContain[counter].innerHTML);
		var hlink = tableData[tableData.length-2].getElementsByTagName("a");
		window.location = "http://maps.google.com"+hlink[counter].attributes[0].value;
	}
}

/* Function to Read out the suggestion */

function read_suggestion(count)
{
	axsSuggestion.speakTextViaNode("Did you mean . "+ dataContain[count].innerHTML);
}

/*	Read first suggestion after delay	*/
var len = document.title.length;
len = len * 200; 
setTimeout("read_suggestion(0)",len);