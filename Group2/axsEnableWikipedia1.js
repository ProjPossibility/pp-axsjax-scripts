
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
      if (evt.charCode == 112) {  // p
         if (paragraphReader.currentPara > 0) {
            paragraphReader.currentPara--;
            paragraphReader.readParagraphNumber(paragraphReader.currentPara);
         } else if (paragraphReader.currentPara == 0) {
            paragraphReader.currentPara = paragraphReader.maxParas - 1;
            paragraphReader.readParagraphNumber(paragraphReadercurrentPara);
         }
      }
	else if(evt.keyCode==13)	//Enter Key
	{	
		document.location = axsWiki.currentLink;
		axsWiki.currentState = READING_TOC;		
	}
}

function toc_keypress(evt)
{
	if(evt.keyCode == 38) //Up Arrow
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
	else if(evt.keyCode == 40)	//Down Arrow
	{
		if(axsWiki.resultIndex < axsWiki.nodeArray.length-1)
		{	axsWiki.resultIndex++;
		}
		else
		{	axsWiki.resultIndex=1;
		}
		if(axsWiki.resultIndex!=0)
		{	if (axsWiki.resultIndex == axsWiki.nodeArray.length)
					alert(axsWiki.resultIndex);
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
		alert(axsWiki.currentLink);
		paragraphReader.readParagraphClass(axsWiki.currentLink);		
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
	 alert('looking for ' + id);
         if (id == class) {
             paragraphReader.readParagraphNumber(i+1)
         }
      }
   }
};

paragraphReader.readParagraphNumber = function(number) 
{
    axsWiki.axsObj.goTo(paragraphReader.Paras[number]);
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
