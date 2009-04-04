 /*
 ************************************************
 AxsJAX Script for Multi-IM Client "http://www.meebo.com 
 ************************************************
 */       

// Copyright 2008 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Function Speaklogin(currentElement) Speak the name of the current login box intellignetly
 * Input: The current list item element passed from the CNR rule
 * Output: None
 *
 *  THIS IS THE LATEST VERSION
 */
function speakLogin(currentElement)
{
	currentElement.elem.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].focus(); 	//Set focus on the selected login box
	axsMeebo.axsJAXObj.speakTextViaNode(String(currentElement.elem.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("label")[0].getAttribute("for")).split('id').join('') + ' , login'); 	//Speak the login box name intelligently
}


/*
 * Function box(myel) Wrapper function for creating elem element of particular node
 * Input: Current Node
 * Output: Node containing Element
*/
 function box(myel)
 {
	 var el = { elem : myel }
	 return el;
 }


/* Make text readable by inserting breaks between words.*/
String.prototype.forVoice = function()
{
	return this.split(' ').join(' , ').split("'").join("");
}

/* Trim String */
String.prototype.Trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); };

/*
 * Function Custom_Speak(currentElement,id) Speak the name of the short cut key activated intelligently
 * Input: The current list item element passed from the CNR rule
 * Output: None 
*/
function Custom_Speak(currentElement,id)
{
	var textToSpeak='';
	//alert(e.elem);
	switch(id)
	{
		case 1:
			textToSpeak="Add Buddy Clicked Please provide your buddy's name, your user logon name, and the group where you would like to add your buddy.";
			break;
		case 2:
			textToSpeak="Do you want to delete this contact ?";
			break;
		case 3:
			textToSpeak="Please select the logon account from which you'd like to IM your buddy.";
			break;
		case 4:
			textToSpeak="Please enter the name of a chat room you want to start or join.";
			break;
		case 5:
			textToSpeak="Please select a network service, username, and password for your new connection.";
			break;
		case 6:
			textToSpeak="Signing out from account.";
			break;
		case 7:
			textToSpeak="Sign Up For a new Account . ";
			break;
	}
	 axsMeebo.axsJAXObj.speakText(textToSpeak);
	 axsMeebo.axsJAXObj.clickElem(currentElement.elem,false);
}
/**
 * @fileoverview AxsJAX to enhance accessibility
 * of Skel. 
 *
 *
 */
// create namespace
var axsMeebo = {};

/**
 * These are strings to be spoken to the user
 * @type string
 */
axsMeebo.HELP = 'The following shortcut keys are available. ';

/**
 * The AxsJAX object that will do the tickling and speaking.
 * @type AxsJAX?
 */
axsMeebo.axsJAXObj = null;
/**
 * The AxsNav object that will handle navigation.
 * @type AxsNav?
 */
axsMeebo.axsNavObj = null;

/**
 * The AxsSound object that will play earcons
 * @type AxsSound?
 */
axsMeebo.axsSoundObj = null;

/**
 * The PowerKey object that will provide a quick search
 * @type PowerKey?
 */
axsMeebo.pkObj = null;

/**
 * The AxsLens object that will magnify content.
 * @type AxsLens?
 */
axsMeebo.axsLensObj = null;

/**
 * The magnification factor for the AxsLens object.
 * @type number
 */
axsMeebo.magSize = 1.5;

/**
 * Initializes the AxsJAX script
 */
axsMeebo.init = function()
{
  axsMeebo.axsJAXObj = new AxsJAX(true);
  axsMeebo.axsNavObj = new AxsNav(axsMeebo.axsJAXObj);

  /*
  * Add event listeners
  */
  document.addEventListener('DOMNodeInserted', axsMeebo.nodeInsertedHandler, true);
  document.addEventListener('DOMAttrModified', axsMeebo.attrModifiedHandler, true);
  document.addEventListener('keypress', axsMeebo.keyHandler, true);
  document.addEventListener('keydown', axsMeebo.keyHandler, true);
	document.addEventListener('focus', axsMeebo.focusHandler, true);
	document.addEventListener('blur', axsMeebo.blurHandler, true);
	document.addEventListener('mouseover', axsMeebo.buddyListHover, true);


  /*
  * CNR Rules 
  */
  var cnrString = '<cnr>' +
                  '<list title="AIM" hotkey="a">' +
                  '<item action="CALL:speakLogin">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='aimlogi" +
                  "nbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='aimid']" +
                  '</item>' +
  				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
                  '</list>' +
                  '<list title="Yahoo" hotkey="y">' +
                  '<item action="CALL:speakLogin">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='yahoolo" +
                  "ginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='yahooi" +
                  "d']" +
                  '</item>' +
  				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
				  '</list>' +
                  '<list title="GTalk" hotkey="g">' +
                  '<item action="CALL:speakLogin">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='gtalklo" +
                  "ginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='gtalki" +
                  "d']" +
                  '</item>' +
   				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
				  '</list>' +
                  '<list title="MSN" hotkey="m">' +
                  '<item action="CALL:speakLogin">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='msnlogi" +
                  "nbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='msnid']" +
                  '</item>' +
    				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
				  '</list>' +
                  '<list title="Meebo" hotkey="o">' +
                  '<item action="CALL:speakLogin">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[3]/div[@id='meebologin']/div[@id='me" +
                  "ebologinbox']/div[@id='meebologincontent']/div[@id='meebol" +
                  "ogincontentwrapper']/div[2]/table/tbody/tr[1]/td[2]/input" +
                  '</item>' +
  				  '<target title="You will be Signed In" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[3]/div[@id=\'meebologin\']/div[@id=\'meebologinbox\']/div[@id=\'meebologincontent\']/div[@id=\'meebologincontentwrapper\']/div[2]/div[@id=\'meebosubmit\']/table/tbody/tr/td[3]/div[@id=\'meebosignon\']/div[4]' +
			      '</target> ' +
            '</list>' +
		              '<list title="MySpace" hotkey="s">' +
                  '<item action="CALL:speakLogin">' +
                  "/html/body[@id='body']/form[@id='frontpagecontainer']/div" +
                  "[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxe" +
                  "scontent']/div[@id='loginboxescontainer']/div[@id='myspace" +
                  "loginbox']/div/div/table/tbody/tr[1]/td[2]/input[@id='myspaceid']" +
                  '</item>' +
    				  '<target title="" hotkey="ENTER">'+
				  ' /html/body[@id=\'body\']/form[@id=\'frontpagecontainer\']/div[@id=\'frontpage\']/div[@id=\'loginboxes\']/div[@id=\'loginboxescontent\']/div[@id=\'imsignon\']' +
			      '</target> ' +
				  '</list>'+
                  '</cnr>';
/* Loading CNR into Javascript*/
  axsMeebo.axsNavObj.navInit(cnrString, null);
 
  /* Setting Magnification Objects */
  axsMeebo.axsLensObj = new AxsLens(axsMeebo.axsJAXObj);
  axsMeebo.axsNavObj.setLens(axsMeebo.axsLensObj);
  axsMeebo.axsLensObj.setMagnification(axsMeebo.magSize);

  /* Setting Sound Objects */
  axsMeebo.axsSoundObj = new AxsSound(true);
  axsMeebo.axsNavObj.setSound(axsMeebo.axsSoundObj);

  axsMeebo.pkObj = new PowerKey('available actions', axsMeebo.axsJAXObj);
  axsMeebo.axsNavObj.setPowerKey(axsMeebo.pkObj, '.');
};

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
axsMeebo.nodeInsertedHandler = function(evt){
	var target = evt.target;


	// Remove default aria-live attributes.
	var xpath = '//*[@aria-live]';
	var liveRegions = axsMeebo.axsJAXObj.evalXPath(xpath,document.body);
	for (var i=0, lr; lr = liveRegions[i]; i++){ lr.removeAttribute('aria-live'); }

	//Delete the next line when you are done with your script.
	alert('axsMeebo loaded and initialized!');
};

/**
 * Handler for click events. 
 * @param {Object} evt A click event.
 */
axsMeebo.clickHandler = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();

	// Try to call out buddy name if clicked upon in the list.
	if( sTarget == 'span')
	{
		axsMeebo.callOutBuddyName(evt.target);
	}
};


/*
	@buddyListHover - Speak out the name of the person on whose name the event happened
	@params (evt) event
*/
axsMeebo.buddyListHover = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();
	// Try to call out buddy name if possible
		if( sTarget == 'div' )
			axsMeebo.callOutBuddyName(evt.target.childNodes[1]);
};


/**
 * Calls out buddy name if evt matches page
 * @param {Object} evt a DOM element
 */
axsMeebo.callOutBuddyName = function(target)
{
	try
	{ 
		if( target.parentNode.parentNode.parentNode.parentNode )
		{
			if( target.parentNode.parentNode.parentNode.parentNode.getAttribute("id") != "offlinebgroup-meebo-offline-group" )
			{
				//alert( target.parentNode.parentNode.parentNode.innerHTML );
				//alert( target.firstChild.nodeValue );
				axsMeebo.axsJAXObj.speakText(target.firstChild.nodeValue);
			}
		}
	} catch(e) { }
}

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
axsMeebo.nodeInsertedHandler = function(evt)
{
  var target = evt.target;
  /*
  * If the target node is something that should
  * be spoken, speak it here.
  */

};

/**
 * Handler for DOMAttrModified events. 
 * @param {Object} evt A DOMAttrModified event.
 */
axsMeebo.attrModifiedHandler = function(evt){
  var attrib = evt.attrName;
  var newVal = evt.newValue;
  var oldVal = evt.prevValue;
  var target = evt.target;
	var sTarget = String(evt.target.tagName).toLowerCase();

	 /*
	 * Speak out the error message upon login
	 */
  if( evt.target.getAttribute("id") == "loginerrormessage" )
	{
			if( target.innerHTML.length > 0 )
			{
				axsMeebo.axsJAXObj.speakText(target.innerHTML);
			}
		}
};
/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsMeebo.keyHandler = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();

	//If Ctrl is held, it must be for some AT. 
  //if (evt.ctrlKey) return true;
	
	if(evt.shiftKey && ( evt.keyCode==65 || evt.keyCode==97))
	{// Shortcut Key Shift + A for Add Buddy
	  if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		//Evaluate Xpath corresponding to Add Buddy Event.
		var node=axsMeebo.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[1]",document.getElementsByTagName('body')[0]);
		Custom_Speak(box(node[0]),1);
	}

	//Shortcut Key Shift + I for IM Anyone	
	if(evt.shiftKey && (evt.keyCode==73 || evt.keyCode==105))
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
    //Evaluate Xpath corresponding to Remove Buddy Event.
	  var node=axsMeebo.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[3]",document.getElementsByTagName('body')[0]);			
	  Custom_Speak(box(node[0]),3);
	}

	// Shift + S  plays the current text entered by the user
	if (evt.shiftKey && evt.keyCode == 83) 
	{
		// key shouldn't come in the textarea 
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		if( sTarget == "textarea" && evt.target.className == 'uiImMessage' )
		{
			if( evt.target.parentNode.parentNode.parentNode.parentNode )
			{
				var s = String(evt.target.value);
				if( s.length > 0 )
				{
					// this window is an IM Window. get the person's name and speak it out.
					var user = String(evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute("caption"));
					axsMeebo.axsJAXObj.speakText('For ' + user.forVoice() + ', you wrote , ' + s);
				} 
				else 
				{
					axsMeebo.axsJAXObj.speakText('No text entered.');
				}
			}
		}
		return false;
	}

	//Shortcut Key Shift + C for Start Group Chat or Chat
	if(evt.shiftKey && (evt.keyCode==67 || evt.keyCode==99))
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		var node=axsMeebo.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[4]",document.getElementsByTagName('body')[0]);
		Custom_Speak(box(node[0]),4);
	}


	// Shortcut Key Shift + R for Remove Buddy
	if(evt.shiftKey && (evt.keyCode==82 || evt.keyCode==114))
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		var node=axsMeebo.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[@id='bltoolbar']/div[2]",document.getElementsByTagName('body')[0]);

		Custom_Speak(box(node[0]),2);
	}

	
	// Shortcut Key Shift+ M for Sign On 
	if(evt.shiftKey && (evt.keyCode==77 || evt.keyCode==109))
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		var node=axsMeebo.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[4]/div[@id='signonbtn']/div[2]",document.getElementsByTagName('body')[0]);
		Custom_Speak(box(node[0]),5);
	}

	
	//Shortcut Key Shift +N for Sign Out 
	if(evt.shiftKey && (evt.keyCode==78 || evt.keyCode==110))
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		var node=axsMeebo.axsJAXObj.evalXPath("//div[@id='buddylistwin']/div[@id='content']/div[4]/div[@id='signoffmenu']",document.getElementsByTagName('body')[0]);
		Custom_Speak(box(node[0]),6);
	}
	
	
	// Shortcut Key Shift + Z for Sign Up Now 
	if(evt.shiftKey && (evt.keyCode==90 || evt.keyCode==122))
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		var node=axsMeebo.axsJAXObj.evalXPath("//form[@id='frontpagecontainer']/div[@id='frontpage']/div[3]/div[@id='meebologin']/div[@id='meebologinbox']/div[@id='meebosignupcontent']/div[@id='signupnow']",document.getElementsByTagName('body')[0]);
		Custom_Speak(box(node[0]),7);
	}
	
	
	//The shortcut key Shift and F helps user to search friends
	if(evt.shiftKey && (evt.keyCode == 70 || evt.keyCode == 102) )
	{
		if( evt.preventDefault() )
		{
			evt.preventDefault();
		}
    axsMeebo.axsJAXObj.speakText('Please Enter the Friend ID you want to search');
		document.getElementById('bltoolbar').getElementsByTagName('input')[0].focus();
	}

	// Key: Shift + L : Online List
	if( evt.shiftKey && (evt.keyCode == 76 || evt.keyCode == 108))
	{
		var s = '<div style="color: transparent;">';
		var i;
		var xpath = '//div[@id=\'buddylistwin\']/div[@id=\'content\']/div[@id=\'buddies\']/div/div[not(@id=\'offlinebgroup-meebo-offline-group\')]/div[2]/div[@id]/div/span[2]';
		var liveRegions = axsMeebo.axsJAXObj.evalXPath(xpath,document.body);
		for ( i=0, lr; lr = liveRegions[i]; i++)
		{
			if (i != 0)
			{
				s += " , and , "  + lr.innerHTML.split('>').join('').split('<').join('');
			}
		}
		s+= '</div>'
		axsMeebo.axsJAXObj.speakText('You have' + i + ' friends Online. Your Online Friends are' + s.forVoice());
	}

	// Key: Shift + O : Offline List
	if( evt.shiftKey && (evt.keyCode == 79 || evt.keyCode == 111))
	{
		var s = '';
		var xpath = '//div[@id=\'buddylistwin\']/div[@id=\'content\']/div[@id=\'buddies\']/div/div[@id=\'offlinebgroup-meebo-offline-group\']/div[2]/div[@id]/div/span[2]';
		var liveRegions = axsMeebo.axsJAXObj.evalXPath(xpath,document.body);
		for ( var i=0, lr; lr = liveRegions[i]; i++)
		{
			if (i != 0)
			{
				s += " , and , "  + lr.innerHTML.split('>').join('').split('<').join('');
			}
		}
		axsMeebo.axsJAXObj.speakText('You have ' + i +' friends Offline. Your Offline Friends are ' + s.forVoice());
	}
	
	// Key: Shift + U : Status Message
	if( evt.shiftKey && (evt.keyCode == 85 || evt.keyCode == 117))
	{
		var s = '';
		var xpath = '//div[@id=\'buddylistwin\']/div[@id=\'content\']/div[@id=\'statusmenu\']/div[2]/div[@id]/span';
		var liveRegions = axsMeebo.axsJAXObj.evalXPath(xpath,document.body);
		for ( var i=0, lr; lr = liveRegions[i]; i++)
		{
			s += lr.innerHTML.split('>').join('').split('<').join('');
			axsMeebo.axsJAXObj.speakText('Your status is' + s.forVoice());
		}
	}



	// ----------------------------------------------------------------------
	// Shift + P  Plays out the current conversation.
	if (evt.shiftKey && evt.keyCode == 80) 
	{
		// key shouldn't come in the textarea 
		if( evt.preventDefault() )
		{
			evt.preventDefault(); 
		}
		if( sTarget == "textarea" && evt.target.className == 'uiImMessage' )
		{
			if( evt.target.parentNode.parentNode.parentNode.parentNode )
			{
				// Meebo's conversation history div has different code for each reply. The foll. code
				// refers to that div and then tries to brute force extract content from each
				// individual reply.
				try
				{
					var msgWin = evt.target.parentNode.parentNode.parentNode.parentNode;
					var msgName = msgWin.getAttribute("caption");

					var msgChatLog = msgWin.childNodes[0].childNodes[4];
					var msgs = axsMeebo.axsJAXObj.evalXPath("//div[@class='uiImHistory']//span/text()",msgWin);

					var myID = String(msgWin.getAttribute("id"));
					myID = myID.substr( myID.indexOf(':')+1, myID.length);
					if( myID.indexOf('-') > -1 ) { myID = myID.substr( 0, myID.indexOf('-') ); }
				
					var convo_text = [];
					var u, m, t;
					for( var i=0; i < msgs.length; i+=2 )
					{
						// u = user, m = message, t = timestamp
						u = '';
						m = '';
						t = '';

						u = String(msgs[i].nodeValue);
						m = String(msgs[i+1].nodeValue);
						t = u.substr(1, 5).Trim();

						u = u.substr( 8, u.length );
						// if message was sent by myself, replace my id with 'You';
						if( u.toLowerCase() == myID ) u = 'You';
						convo_text.push( 'at ' + t + ', ' + u + ' said, ' + m );
					}
				}
				catch(e){}
				if( convo_text.length == 0 )
					axsMeebo.axsJAXObj.speakText('No messages have been exchanged as yet.');
				else
					axsMeebo.axsJAXObj.speakText(convo_text.join(', '));
			}
		}
		return false;
	}

	// Try to call out buddy name if clicked upon in the list.
	if( evt.keyCode == 38 || evt.keyCode == 40 )
	{
		if( sTarget == 'span')
		{
			axsMeebo.callOutBuddyName(evt.target);
		}
	}





	// ESC
  if (evt.keyCode == 27)
	{
		// Degrade if not element was selected
		try{axsMeebo.axsJAXObj.lastFocusedNode.blur();}
		catch (e){}
    return false;
	}
	
  if (axsMeebo.axsJAXObj.inputFocused) return true;

  var command = axsMeebo.keyCodeMap[evt.keyCode] || axsMeebo.charCodeMap[evt.charCode];
  if (command) return command();

  return true;
};

/**
 * Map from key codes to functions
 */
axsMeebo.keyCodeMap = {
  // Map additional keyboard behavior that involves key codes here
};

/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
axsMeebo.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function() {
         axsMeebo.magSize -= 0.10;
         axsMeebo.axsLensObj.setMagnification(axsMeebo.magSize);
         return false;
       },
  // = (equal symbol)
  61 : function() {
         axsMeebo.magSize += 0.10;
         axsMeebo.axsLensObj.setMagnification(axsMeebo.magSize);
         return false;
       },

	// Code to get String for (?) - Help
  63 : function() {
				// Speak out the list of all the hotkeys available to the user
				var helpStr = axsMeebo.HELP;
				helpStr += "Escape plus A , for aim  . ";
				helpStr += "Escape plus Y , for yahoo  . ";
				helpStr += "Escape plus G , for gtalk  . ";
				helpStr += "Escape plus M , for msn  . ";
				helpStr += "Escape plus O , for meebo  . ";
				helpStr += "Escape plus S , for myspace  . ";
				helpStr += "I , for Entering in Invisible  Mode . ";
				helpStr += "R , for Entering in Remember Me  Mode . ";
				helpStr += "Enter , for signing in for IM/Meebo . ";
				helpStr += "Shift plus A , for Add Buddy  .";
				helpStr += "Shift plus I , for IM someone  .";
				helpStr += "Shift plus R , for Remove Buddy  .";
				helpStr += "Shift plus C , for Start Group Chat  .";
				helpStr += "Shift plus M , for Sign on  .";
				helpStr += "Shift plus N , for Sign off  .";
				helpStr += "Shift plus L , for List of Buddies online  .";
				helpStr += "Shift plus O , for List of Buddies offline  .";
				helpStr += "Shift plus S , for Proofread the conversation  .";
				helpStr += "Shift plus P , for Say the entire conversation  .";
				helpStr += "Shift plus F , for Find a Buddy  .";
				helpStr += "Shift plus U , for Say your current status  .";
				helpStr += "Shift plus Z , for Sign up for a new Meebo account  .";
					axsMeebo.axsJAXObj.speakTextViaNode(helpStr);		// speak out the help string
					return false;
		},


	// Handler for Escape + I to check invisible or uncheck the invisible checkbox
	105: function() {
			var str = "sign on as invisible";
			var checkboxXpath  = "//div[@id='frontpage']/div[@id='loginboxes']/div[@id='loginboxescontent']/table[@id='autoinvisible']/tbody/tr/td[2]/input[@id='invisiblecheck']"; // getting the xpath of the required checkbox
		
			var chkbox = axsMeebo.axsJAXObj.evalXPath(checkboxXpath, document.getElementsByTagName("body")[0] )[0]; // catching the checkbox using the xpath
			 
			if (chkbox.checked==true){	
						chkbox.checked = false;		// uncheck the checkbox
						str += "not checked";		// prepare string
			}
      else if (chkbox.checked==false){	
						chkbox.checked = true;		// check the checkbox
						str += " checked"			// prepare string
			}
							
			axsMeebo.axsJAXObj.speakTextViaNode(str);		// speak the action which has been accomplished
			return false;
	},
		
	// Handler for Escape + R to check or uncheck remember me 
	114: function() {
			var str = "remember meebo information";
			var checkboxXpath  = "//div[@id='frontpage']/div[@class='right-side' and position()=3]/div[@id='meebologin']/div[@id='meebologinbox']/div[@id='meebologincontent']/div[@id='meebologincontentwrapper']/div[@class='meebologinform' and position()=2]/div[@class='meebobuttons' and @id='meebosubmit']/table/tbody/tr/td[2]/input[@id='remembermecheck']";	// getting the xpath of the required checkbox
					
			var chkbox = axsMeebo.axsJAXObj.evalXPath(checkboxXpath, document.getElementsByTagName("body")[0] )[0];
						 
			if (chkbox.checked==true){
				chkbox.checked = false;			// uncheck the checkbox
				str += "not checked";					// prepare string
			}
			else if (chkbox.checked==false) {		
				chkbox.checked = true;			// uncheck the checkbox
				str += " checked"				// prepare string
			}

		axsMeebo.axsJAXObj.speakTextViaNode(str);		// speak the action which has been accomplished
		return false;
	}
};

/**
 * When an input blank has focus, the keystrokes should go into the blank
 * and should not trigger hot key commands.
 * @param {Object} evt A Focus event
 */
axsMeebo.focusHandler = function(evt)
{
	var sTarget = String(evt.target.tagName).toLowerCase();
  axsMeebo.lastFocusedNode = evt.target;
  if ((evt.target.tagName == 'INPUT') ||
      (evt.target.tagName == 'TEXTAREA')){
    axsMeebo.inputFocused = true;
  }


	// Call out user's name when an im-window is focussed.
	if( evt.target.tagName == "TEXTAREA" ) 
	{
		if( evt.target.className == 'uiImMessage' )
		{
			// this window is an IM Window. get the person's name and speak it out.
			var user = String(evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute("caption"));
			//alert(user);
			axsMeebo.axsJAXObj.speakText('Talking to ' + user.forVoice());
		}
	}
};

/**
 * When no input blanks have focus, the keystrokes should trigger hot key
 * commands.
 * @param {Object} evt A Blur event
 */
axsMeebo.blurHandler = function (evt){
  axsMeebo.lastFocusedNode = null;
  if ((evt.target.tagName == 'INPUT') ||
      (evt.target.tagName == 'TEXTAREA')){
    axsMeebo.inputFocused = false;
  }
};

axsMeebo.init();