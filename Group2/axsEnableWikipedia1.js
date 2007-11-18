
var axsWiki={};

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=0;
axsWiki.nodeArray=null;
axsWiki.toc=null;
axsWiki.currentLink;



function axsJb_keyboardHandler(evt){
	
	//alert(evt.keyCode);
	if(evt.keyCode == 38) //Up Arrow
	{	if(axsWiki.resultIndex > 1)
		{	axsWiki.resultIndex--;
		}
		else
		{	axsWiki.resultIndex=axsWiki.nodeArray.length-1;
		}
		if(axsWiki.nodeArray[axsWiki.resultIndex].firstChild.nodeValue!='hide');
		{	alert(axsWiki.nodeArray[axsWiki.resultsIndex].getElementsByTagName('a').nodeName);
			var currentResult = axsWiki.nodeArray[axsWiki.resultsIndex];
			axsWiki.currentLink = currentResult.href;
			axsWiki.axsObj.goTo(currentResult);
			//axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex]);
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
		if(axsWiki.nodeArray[axsWiki.resultIndex].firstChild.nodeValue!='hide');
		{
			var currentResult = axsWiki.nodeArray[axsWiki.resultsIndex];
			alert(currentResult);
			axsWiki.currentLink = currentResult.href;
			axsWiki.axsObj.goTo(currentResult);
			//axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex]);
		}
	}
	else if(evt.keyCode==13)
	{	document.location = axsWiki.currentLink;
	}
	
		
}
	
		

axsWiki.init = function(){
var toc_count=0;
axsWiki.toc = document.getElementById('toc');
axsWiki.nodeArray = new Array();
axsWiki.nodeArray = axsWiki.toc.getElementsByTagName('a');

document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsWiki.init();
