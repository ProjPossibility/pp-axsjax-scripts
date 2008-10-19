//Java script for accessibility at http://en.wikipedia.org
//Author gurmeets@usc.edu (Gurmeet Singh)
//Author arvindve@usc.edu (Arvind Venkataraman)
//Author kbhatt@usc.edu (Kushal Bhatt)

// The following keys are available
// '?' to listen to key shortcuts available
// '/' to direct focus on the search box. Anything the user enters after this is considered search text
// 'esc' to leave the search box
// 'g' to go to the table of contents (TOC)
// 'n' to go to next item while reading the TOC or the paragraphs
// 'p' to go to the previous item while reading the TOC or the paragraphs
// 'enter' to start reading the paragraphs in a particular section of the document (only effective while reading the TOC)

var axsWiki={};
var paragraphReader = {};


READING_PARAGRAPHS = 1;
READING_TOC = 2;
SEARCH=3;
READING_LINKS = 4;

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=0;
axsWiki.nodeArray=null;
axsWiki.toc=null;
axsWiki.currentLink;
axsWiki.currentState = READING_PARAGRAPHS;
axsWiki.oldState = READING_PARAGRAPHS;
axsWiki.helpString =
    'The following shortcut keys are available. ' +
    'G, Return to Contents. ' +   
    'N, go to the next element. ' +
    'P, go to the previous element. ' +
    'R, to get the number of citations and links in the paragraph. '+
    'T, to traverse the citations in the paragraph. '+
    'Enter, open the current item or citation. ' +
    'Slash, jump to search blank. ' +
    'Escape, leave search blank. ' ;
   

paragraphReader.maxParas = 0;
paragraphReader.Paras = null;
paragraphReader.currentPara = 0;
paragraphReader.currentLink = -1;


// Key press event handler when the paragraphs are being read

function paragraphReader_keypress(evt)
{

	if (evt.charCode == 110) { // n
	   paragraphReader.currentLink = -1;
         if (paragraphReader.currentPara < paragraphReader.maxParas - 1) {
            paragraphReader.currentPara++;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         } else if (paragraphReader.currentPara == paragraphReader.maxParas - 1) {
            paragraphReader.currentPara = 0;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         }

      } else if (evt.charCode == 112) {  // p
	   paragraphReader.currentLink = -1;
         if (paragraphReader.currentPara > 0) {
            paragraphReader.currentPara--;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         } else if (paragraphReader.currentPara == 0) {
            paragraphReader.currentPara = paragraphReader.maxParas - 1;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         }

      } else if (evt.charCode == 114) { //r
	   paragraphReader.countLinksAndCitations();

	} else if (evt.charCode == 116) { // t
	   paragraphReader.traverseLinks();

	} else if(evt.charCode==103) { //g key
	   paragraphReader.currentLink = -1;
         if(document.getElementById('toc')) {
		axsWiki.resultIndex++;
	     	axsWiki.currentLink = axsWiki.nodeArray[axsWiki.resultIndex].href;
	     	axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex])
	     	axsWiki.currentState=READING_TOC;
	   }
	} else if(evt.keyCode==13) {	//Enter Key
	   if (paragraphReader.currentLink != -1) {
		paragraphReader.goToCurrentLink();   
 	   }		
	}

}

// Keypress event handler when the Table of Contents is being read 

function toc_keypress(evt)
{	//alert(evt.keyCode);
	if(evt.charCode == 112) //p key
	{	if(axsWiki.resultIndex > 1)
		{	axsWiki.resultIndex--;
		}
		else
		{	axsWiki.resultIndex=axsWiki.nodeArray.length-1;
		}
		if(axsWiki.resultIndex!=0)
		{	
			var currentResult = axsWiki.nodeArray[axsWiki.resultIndex];
			axsWiki.currentLink = currentResult.href;
			axsWiki.axsObj.goTo(currentResult);
			//axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex]);
		}
	}
	else if(evt.charCode ==110)	//n key
	{
		if(axsWiki.resultIndex < axsWiki.nodeArray.length-1)
		{	axsWiki.resultIndex++;
		}
		else
		{	axsWiki.resultIndex=1;
		}
		if(axsWiki.resultIndex!=0)
		{	
			var currentResult = axsWiki.nodeArray[axsWiki.resultIndex];
			axsWiki.currentLink = currentResult.href;
			axsWiki.axsObj.goTo(currentResult);
			//axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex]);
		}
	}
	else if(evt.keyCode==13)	//Enter Key
	{	
		document.location = axsWiki.currentLink;
		axsWiki.currentState = READING_PARAGRAPHS;
		//alert(axsWiki.currentLink);
		var str=axsWiki.currentLink.substr(axsWiki.currentLink.indexOf("#",0)+1,axsWiki.currentLink.length);
		
		paragraphReader.readParagraphClass(str);		
	}
	

}

function axsJb_keyboardHandler(evt){
	
	if(evt.charCode == 47) // for the / key
	{
	document.getElementById('searchInput').focus();
      document.getElementById('searchInput').value = "";
	axsWiki.oldState = axsWiki.currentState;
	axsWiki.currentState = SEARCH;
	}
	if(evt.keyCode == 27) // escape key
	{
	document.getElementById('searchInput').blur();
	document.getElementById('searchInput').value="";
	axsWiki.currentState = axsWiki.oldState;
	}
	if(evt.charCode == 63) //? key
	{
	axsWiki.axsObj.speakThroughPixel(axsWiki.helpString);
	}
	if(axsWiki.currentState == READING_TOC)
	{
		toc_keypress(evt);
	}
	else  if(axsWiki.currentState==READING_PARAGRAPHS)
      {
		paragraphReader_keypress(evt);
      }
}



paragraphReader.readParagraphClass = function(class) {
   var start = false;
   for (var i = 0; i < paragraphReader.maxParas; i++) {
      var node = paragraphReader.Paras[i].getElementsByTagName('a');
      for (var j = 0; j < node.length; j++) {
         var id = node[j].getAttribute('id');
	 //alert('looking for ' + id);
         if (id == class) {
		     paragraphReader.currentPara = i+1;
             paragraphReader.readParagraphNumber(i+1)
         }
      }
   }
};

paragraphReader.readParagraphNumber = function(number) 
{
    var section = false;
    var sectionName = null;
	var node = paragraphReader.Paras[number].getElementsByTagName('a');
	for (var i = 0; i < node.length; i++) {
	  var id = node[i].getAttribute('id');
	  if (id != null) {
	    section = true;
		sectionName = id;
		break;
	  }
	}
      
	// If this is a section heading rather than a paragraph
	if (section == true) {
        while (sectionName.indexOf("_") != -1) {
            sectionName = sectionName.replace("_"," ");
        }
	  axsWiki.axsObj.speakText("Section "+sectionName);
	} else {
      // Otherwise if it is a paragraph read as it is
        axsWiki.axsObj.goTo(paragraphReader.Paras[number]);
      }
};

paragraphReader.countLinksAndCitations = function() {
  var node = paragraphReader.Paras[paragraphReader.currentPara].getElementsByTagName('a');
  var links = 0;
  var citations = 0;
  for (var i = 0; i < node.length; i++) {
  	var title = node[i].getAttribute("title");
      if (title != "") {
	   links++;
      } else {
	   citations++;
	}
  }
  str = "There are "+links+" links and "+citations+" citations in this paragraph. ";
  axsWiki.axsObj.speakThroughPixel(str);
};

paragraphReader.traverseLinks = function() {
  var node = paragraphReader.Paras[paragraphReader.currentPara].getElementsByTagName('a');
  var links = 0;
  var titleArray = new Array();
  for (var i = 0; i < node.length; i++) {
  	var title = node[i].getAttribute("title");
      if (title != "") {
	   links++;
	   titleArray.push(title);
	}
  }
  if (links == 0) {
	axsWiki.axsObj.speakThroughPixel("There are no links in this paragraph. ");
	return;
  }
  paragraphReader.currentLink++;
  if (paragraphReader.currentLink >= links ) {
	paragraphReader.currentLink = 0;
  }
  message = "Link "+paragraphReader.currentLink+" "+titleArray[paragraphReader.currentLink]+". ";
  axsWiki.axsObj.speakThroughPixel(message);
};

paragraphReader.goToCurrentLink = function() {
  var node = paragraphReader.Paras[paragraphReader.currentPara].getElementsByTagName('a');
  var links = 0;
  for (var i = 0; i < node.length; i++) {
  	var title = node[i].getAttribute("title");
      if (title != "") {
	   if (links == paragraphReader.currentLink) {
//            alert(node[i].href);
		document.location = node[i].href;
            return;
	   } else {
	   	links++;
	   }
	}
  }
};

paragraphReader.readLinks = function() {
  var node = paragraphReader.Paras[paragraphReader.currentPara].getElementsByTagName('a')
};

paragraphReader.init = function() {
  paragraphReader.Paras = document.getElementsByTagName("p");
  paragraphReader.maxParas = paragraphReader.Paras.length;
  paragraphReader.currentPara = -1;
  paragraphReader.currentState = paragraphReader.READING_PARAGRAPHS;
};


axsWiki.init = function(){
	var toc_count=0;
	axsWiki.toc = document.getElementById('toc');
	axsWiki.nodeArray = new Array();
	if(axsWiki.toc)
	{
		axsWiki.nodeArray = axsWiki.toc.getElementsByTagName('a');
	}
	document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsWiki.init();
paragraphReader.init();
