
/****************************************************************************************
Java Script that will allow user to read suggestions and possibly select one of them 
****************************************************************************************/

axsSuggestion = new AxsJAX();  // initialize AxsJAX object for speaking out text 

/*	Extract the data from Google Map Web Page	*/
var tableData =document.getElementsByTagName("table");
var dataContain =tableData[tableData.length-2].getElementsByTagName("i");

/*	Action Listner to browse through suggestions	*/

document.addEventListener('keypress', did_u_mean_handler, true);
var counter = 0;
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
		axsSuggestion.speakText("You have chosen : "+dataContain[counter].innerHTML);
		var hlink = tableData[tableData.length-2].getElementsByTagName("a");
		var redirect = "http://maps.google.com"+hlink[counter].attributes[0].value;
		alert(redirect);
		window.location = redirect;
	}
}

/* Function to Read out the suggestion */

function read_suggestion(count)
{
	axsSuggestion.speakText("Did you mean . "+dataContain[count].innerHTML);
	if(count == dataContain.length-1)
	{
		axsSuggestion.speakText("That was the last suggestion");
	}
}

//Read first suggestion after delay
var len = document.title.length;
len = len * 200; 
setTimeout("read_suggestion(0)",len);
