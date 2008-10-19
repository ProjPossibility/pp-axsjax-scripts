
/****************************************************************************************
Java Script that will allow user to read suggestions and possibly select one of them 
****************************************************************************************/

axsSuggestion = new AxsJAX();  // initialize AxsJAX object for speaking out text 

/*	Extract the data from Google Map Web Page	*/
var x =document.getElementsByTagName("table");
var y =x[x.length-2].getElementsByTagName("i");

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
			counter = y.length;
		}
		read_suggestion(counter);
	}
	
	if(evt.charCode == 110 || evt.keyCode == 39) 	// n key (next suggestion)
	{
		if(counter < y.length -1 )
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
		axsSuggestion.speakText("You have chosen : "+y[counter].innerHTML);
		var z = x[x.length-2].getElementsByTagName("a");
		var redirect = "http://maps.google.com"+z[0].attributes[0].value;
		window.location = redirect;
	}
}

/* Function to Read out the suggestion */

function read_suggestion(count)
{
	axsSuggestion.speakText("did you mean "+y[count].innerHTML);
	if(count == y.length-1)
	{
		axsSuggestion.speakText("That was the last suggestion");
	}
}

read_suggestion(0); //Automatically read the first one