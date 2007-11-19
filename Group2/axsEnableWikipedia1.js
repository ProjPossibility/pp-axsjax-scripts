
var axsWiki={};
var paragraphReader = {};


READING_PARAGRAPHS = 1;
READING_TOC = 2;

axsWiki.axsObj=new AxsJAX();
axsWiki.resultIndex=0;
axsWiki.nodeArray=null;
axsWiki.toc=null;
axsWiki.currentLink;
axsWiki.currentState = READING_TOC;


paragraphReader.maxParas = 0;
paragraphReader.Paras = null;
paragraphReader.currentPara = 0;


function paragraphReader_keypress(evt)
{

	if (evt.charCode == 110) 
	{  // n
         if (paragraphReader.currentPara < paragraphReader.maxParas - 1) {
            paragraphReader.currentPara++;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         } else if (paragraphReader.currentPara == paragraphReader.maxParas - 1) {
            paragraphReader.currentPara = 0;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         }
        }
      else if (evt.charCode == 112) {  // p
         if (paragraphReader.currentPara > 0) {
            paragraphReader.currentPara--;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         } else if (paragraphReader.currentPara == 0) {
            paragraphReader.currentPara = paragraphReader.maxParas - 1;
            paragraphReader.readParagraphNumber(paragraphReadercurrentPara);
         }
      }
	
	else if(evt.keyCode==103) //g key
	{
	axsWiki.resultIndex++;
	document.location=axsWiki.nodeArray[axsWiki.resultIndex].href;
	axsWiki.axsObj.goTo(axsWiki.nodeArray[axsWiki.resultIndex])
	axsWiki.currentState=READING_TOC;
	}
}

function toc_keypress(evt)
{	alert(evt.keyCode);
	if(evt.keyCode == 38) //p key
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
	else if(evt.keyCode == 40)	//n key
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
	
	if(axsWiki.currentState == READING_TOC)
	{
		toc_keypress(evt);
	}
	else
		paragraphReader_keypress(evt);
	
		
		
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
	if (section == true) {
	  axsWiki.axsObj.speakText("Section "+sectionName);
	} 
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
	axsWiki.nodeArray = axsWiki.toc.getElementsByTagName('a');

	document.addEventListener('keypress', axsJb_keyboardHandler, true);
}

axsWiki.init();
paragraphReader.init();
