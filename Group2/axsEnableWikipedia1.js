//Module to read the table of contents
var axsWiki={};

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=0;
axsWiki.linksArray=null;
axsWiki.linksNameArray=null;
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
	
	
	
	//alert(axsWiki.linksNameArray[axsWiki.resultIndex]);
	axsWiki.axsObj.goTo(axsWiki.linksArray[axsWiki.resultIndex]);
}
	
		



axsWiki.toc = document.getElementById('toc');
axsWiki.linksArray = new Array();	
axsWiki.linksArray = axsWiki.toc.getElementsByTagName('li');
axsWiki.linksNameArray = new Array();
var temp = new Array()
temp = axsWiki.toc.getElementsByTagName('a');
for(var i=0;i<temp.length;i++) axsWiki.linksNameArray[i]= temp[i].getAttribute('href');
document.addEventListener('keypress', axsJb_keyboardHandler, true);
