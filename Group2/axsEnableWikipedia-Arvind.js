//Module to read the table of contents
var axsJb_axsJaxObj = new AxsJAX();


function axsJb_keyboardHandler(evt){
//  axsJb_axsJaxObj.speakNode('Hello World');
var toc = document.getElementById('toc');
if(toc==NULL) alert("No TOC");
else{
	var td = document.getElementsByTagName('td');
	var tocContents = td[1].childNodes[3].childNodes;
	for(var i =1;i<tocContents.length;i+=2)
		alert(tocContents[i].firstChild.getAttribute('href')+'\t'+tocContents[i].firstChild.childNodes[3].childNodes[0].nodeValue);
		}
	
		

}


document.addEventListener('keypress', axsJb_keyboardHandler, true);
