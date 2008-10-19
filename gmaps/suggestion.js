<script type="text/javascript">

var x =document.getElementsByTagName("table");
var y =x[x.length-2].getElementsByTagName("i");

document.addEventListener('keypress', did_u_mean_handler, true);
var counter = 0;
function did_u_mean_handler(evt)
{
	

	if (evt.charCode == 112 || evt.keyCode == 37) //p key
	{	if(counter > 0)
		{	counter--;
		}
		else
		{	counter = y.length;
		}
		read_suggestion(counter);
				
	}
	(evt.charCode == 110 || evt.keyCode == 39) 	//n key
	{
		if(counter < y.length )
		{	
			
			counter++;
		}
		else
		{
		
		counter = 0;
		}
		read_suggestion(counter);
	}
	if(evt.charCode == 89 || evt.charCode == 121) // y key
	{
		alert("You have chosen : "+y[counter].innerHTML);
		var z = x[x.length-2].getElementsByTagName("a");
		alert(z[0].attributes[0].value);
		//this.url = "

	}
}

function read_suggestion(count)
{
	// speak out y[count].innerHTML);
	alert(y[count].innerHTML);
}
</script>