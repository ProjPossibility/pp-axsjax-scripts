//Module to read the table of contents
var axsWiki={};

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=0;
axsWiki.nodeArray=null;
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
	alert(axsWiki.nodeArray[0].firstChild.nodeValue);
	axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex]);
		
}
	
		

axsWiki.init = function(){
var toc_count=0;
axsWiki.toc = document.getElementById('toc');
axsWiki.nodeArray = new Array();
axsWiki.nodeArray = axsWiki.toc.getElementsByTagName('a');

document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsWiki.init();
