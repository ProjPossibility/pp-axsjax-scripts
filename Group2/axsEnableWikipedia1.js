//Module to read the table of contents
var axsWiki={};

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=-1;
axsWiki.nodeArray=null;
axsWiki.linksArray=null;
axsWiki.nameArray=null;
axsWiki.countArray=null;
axsWiki.toc=null;



function axsJb_keyboardHandler(evt){
	
	//alert(evt.keyCode);
	if(evt.keyCode == 38) //Up Arrow
	{	if(axsWiki.resultIndex > 1)
		{	axsWiki.resultIndex--;
		}
		else
		{	axsWiki.resultIndex=axsWiki.nodeArray.length-1;
		}
	}
	else if(evt.keyCode == 40)
	{
		if(axsWiki.resultIndex < axsWiki.nodeArray.length)
		{	axsWiki.resultIndex++;
		}
		else
		{	axsWiki.resultIndex=1;
		}
	}
	axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex]);
	//alert(axsWiki.countArray[axsWiki.resultIndex]+' '+axsWiki.nameArray[axsWiki.resultIndex]);
	//alert(toSpeak);
	
}
	
		

axsWiki.init = function(){
var toc_count=0;
axsWiki.toc = document.getElementById('toc');
axsWiki.linksArray = new Array();
axsWiki.nameArray = new Array();
axsWiki.countArray = new Array();
//var temp = axsWiki.toc.getElementsByTagName('a');
axsWiki.nodeArray = new Array();
axsWiki.nodeArray = axsWiki.toc.getElementsByTagName('a');
/*for(var i=0;i<temp.length;i++)
{	axsWiki.linksArray[toc_count]=temp[i].getAttribute('href');
	var temp_span_elements = new Array();
	temp_span_elements = temp[i].getElementsByTagName('span');
	axsWiki.countArray[toc_count]=temp_span_elements[0].firstChild.nodeValue;
	axsWiki.nameArray[toc_count++]=temp_span_elements[1].firstChild.nodeValue;
	
	
}*/
document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsWiki.init();
