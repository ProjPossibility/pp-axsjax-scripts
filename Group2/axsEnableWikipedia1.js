//Module to read the table of contents
var axsWiki{}

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=0;
axsWiki.linksArray=null;
//var axsJb_axsJaxObj = new AxsJAX();


function axsJb_keyboardHandler(evt){
//  axsJb_axsJaxObj.speakNode('Hello World');
var toc = document.getElementById('toc');

	/*var td = document.getElementsByTagName('td');
	//alert(td.length);
	var tocContents = td[0].childNodes[3].childNodes;
	//Working-alert(tocContents[1].nodeName);
	for(var i =1;i<tocContents.length;i+=2)
	{	alert(tocContents[i].firstChild.childNodes[1].nodeName);
		alert(tocContents[i].firstChild.getAttribute('href')+'\t'+tocContents[i].firstChild.childNodes[3].childNodes[0].nodeValue);
	}*/
axsWiki.linksArray = new Array();	
axsWiki.linksArray = toc.getElementByTagName('li');
for(var i = 0;i<axsWiki.linksArray.length;i++)
{		
alert(i);
axsWiki.axsObj.goTo(axsWiki.linksArray[i])
}
	
		

}


document.addEventListener('keypress', axsJb_keyboardHandler, true);
