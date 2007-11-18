//Module to read the table of contents
var axsWiki={};

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=-1;
axsWiki.linksArray=null;
axsWiki.nameArray=null;
axsWiki.countArray=null;
axsWiki.toc=null;



function axsJb_keyboardHandler(evt){
	
	//alert(evt.keyCode);
	if(evt.keyCode == 38) //Up Arrow
	{	if(axsWiki.resultIndex > 0)
		{	axsWiki.resultIndex--;
		}
		else
		{	axsWiki.resultIndex=axsWiki.linksArray.length-1;
		}
	}
	else if(evt.keyCode == 40)
	{	if(axsWiki.resultIndex < axsWiki.linksArray.length)
		{	axsWiki.resultIndex++;
		}
		else
		{	axsWiki.resultIndex=0;
		}
	}
	
	
	
	alert(axsWiki.cntArray[axsWiki.resultIndex]+' '+axsWiki.nameArray[axsWiki.resultIndex]+' '+axsWiki.linksArray[axsWiki.resultIndex]);
	//axsWiki.axsObj.goTo(axsWiki.linksArray[axsWiki.resultIndex]);
}
	
		

axsWiki.init = function(){
var toc_count=0;
axsWiki.toc = document.getElementById('toc');
axsWiki.linksArray = new Array();
axsWiki.nameArray = new Array();
axsWiki.countArray = new Array();
var temp = axsWiki.toc.getElementsByTagName('a');
var i=1;
//for(var i=1;i<temp.length;i++)
{	axsWiki.linksArray[toc_count]=temp[i].getAttribute('href');
	alert(temp[i].getAttribute('href'));
	//alert(temp[i].nodeName);//-Working Fine
	var temp_span_elements = new Array();
	temp_span_elements = temp[i].getElementsByTagName('span');
	
	alert(temp_span_elements.length);
	alert(temp_span_elements[0].firstChild.nodeValue);
	alert(temp_span_elements[2].firstChild.nodeValue);
	/*axsWiki.countArray[toc_count]=temp_span_elements[1].nodeValue;
	axsWiki.nameArray[toc_count++]=temp[i].childNodes[3].childNodes[0].nodeValue;*/
}
document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsWiki.init();
