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
 * Facebook Accessibility Project
 * SS12 - 2009 - UCLA
 * Project Possibility
 * Prototype v1
 * 
 * Developers:
 * Brian D'Souza
 * Rajiv Makhijani
 * Nima Rahnemoon
 * Carson Tang 
 * Alvin Huynh
 * Tim Hsieh
 * Raymond Lim
 */
 
 // INCLUDE jQuery

var jqueryLib = document.createElement('script');
jqueryLib.type = 'text/javascript';
jqueryLib.src = 'http://www.rajivmakhijani.net/projects/accessfb/jquery-1.3.1.min.js';

document.getElementsByTagName('head')[0].appendChild(jqueryLib);


// Check if jQuery's loaded
    function GM_wait() {
        if(typeof window.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { letsJQuery(); }
    }
    GM_wait();



// create namespace
var axsFB = {};

/**
 * These are strings to be spoken to the user
 * @type string
 */
axsFB.HELP = 'The following shortcut keys are available. ';



/**
 * The AxsJAX object that will do the tickling and speaking.
 * @type AxsJAX?
 */
axsFB.axsJAXObj = null;
/**
 * The AxsNav object that will handle navigation.
 * @type AxsNav?
 */
axsFB.axsNavObj = null;

/**
 * The AxsSound object that will play earcons
 * @type AxsSound?
 */
axsFB.axsSoundObj = null;

/**
 * The PowerKey object that will provide a quick search
 * @type PowerKey?
 */
axsFB.pkObj = null;

/**
 * The AxsLens object that will magnify content.
 * @type AxsLens?
 */
axsFB.axsLensObj = null;

/**
 * The magnification factor for the AxsLens object.
 * @type number
 */
axsFB.magSize = 1.5;

/**
 * Initializes the AxsJAX script
 */
axsFB.init = function(){
  axsFB.axsJAXObj = new AxsJAX(true);
  axsFB.axsNavObj = new AxsNav(axsFB.axsJAXObj);
  axsFB.axsJAXObj.speakTextViaNode(" . ");
  //Add event listeners
  document.addEventListener('DOMNodeInserted',
                            axsFB.nodeInsertedHandler,
                            true);
  document.addEventListener('DOMAttrModified',
                            axsFB.attrModifiedHandler,
                            true);
  document.addEventListener('keypress', axsFB.keyHandler, true);

  //var cnrString = 'PUT THE CNR XML HERE';

  //axsFB.axsNavObj.navInit(cnrString, null);

  axsFB.axsLensObj = new AxsLens(axsFB.axsJAXObj);
  axsFB.axsNavObj.setLens(axsFB.axsLensObj);
  axsFB.axsLensObj.setMagnification(axsFB.magSize);

  axsFB.axsSoundObj = new AxsSound(true);
  axsFB.axsNavObj.setSound(axsFB.axsSoundObj);

  axsFB.pkObj = new PowerKey('available actions', axsFB.axsJAXObj);
  axsFB.axsNavObj.setPowerKey(axsFB.pkObj, '.');

  //Delete the next line when you are done with your script.
  //alert('axsFB loaded and initialized! v2');
};

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
axsFB.nodeInsertedHandler = function(evt){
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
};

/**
 * Handler for DOMAttrModified events. 
 * @param {Object} evt A DOMAttrModified event.
 */
axsFB.attrModifiedHandler = function(evt){
  var attrib = evt.attrName;
  var newVal = evt.newValue;
  var oldVal = evt.prevValue;
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
};


    


axsFB.pageTitleContains = function(str) {
  return document.title.match(str) != null;
};

axsFB.pageURLContains = function(str) {
  return window.location.toString().match(str) != null;
}

axsFB.getUnreadMessageCount = function() {
  return jQuery('#fb_menu_inbox_unread_count').text();
}


axsFB.Home = {};

axsFB.Home.sayHelp = function(say) {
  var helpStr = "Homepage Commands . ";
      helpStr += "control alt and n to listen to notices. . . ";
      helpStr += "control alt and u to update your status. . . "
  if (say != false)
    axsFB.axsJAXObj.speakTextViaNode(helpStr);
  return helpStr;
};


axsFB.Home.getRequestCountsStr = function() {
  return jQuery('ul.requests_list').text();
}

axsFB.Home.sayFeed = function() {
  var speechStr = jQuery('#newsfeed_wrapper').text();
  //speechStr += " You have: " + axsFB.Home.getRequestCountsStr();
  alert(speechStr);
  axsFB.axsJAXObj.speakTextViaNode(speechStr);
}

axsFB.Home.sayNotices = function() {
  var speechStr = "";
  unreadCount = axsFB.getUnreadMessageCount();
  unreadCount = parseInt(unreadCount);
  if (unreadCount == 0) {
    speechStr += "You have no unread messages. ";
  } else {
    speechStr += "You have " + unreadCount + " unread messages. ";
  }
  
  speechStr += " You have: " + axsFB.Home.getRequestCountsStr();
  
  axsFB.axsJAXObj.speakTextViaNode(speechStr);
}

axsFB.Home.goToStatusBox = function() {
  jQuery('#status_placeholder_input_home').focus();
  var speechStr = "Please enter your status and press enter. . ";
      speechStr += jQuery('.status_composer_inner .status_name.status_field :first').text() + " is ";
  axsFB.axsJAXObj.speakTextViaNode(speechStr);  
  //jQuery('.show_placeholder').focus();
  //jQuery('input.status_input').select();
}

axsFB.Home.keyHandler = function(evt) {
  // ctrl+alt
  if (evt.ctrlKey && evt.altKey) {
    switch(evt.charCode)
    {
      // + n, N reads Notices
      case 110:
      case 78:
        axsFB.Home.sayNotices();
        return false;
      break;
      // + u, U goes to Status field
      case 117:
      case 85:
        axsFB.Home.goToStatusBox();
      break;
    }
  }
  return true;
}

axsFB.Home.pageOnLoad = function() {
  axsFB.axsJAXObj.speakTextViaNode("Facebook Home Page . . . Press control and alt and question mark for commands.");
}

axsFB.Registration = {};
axsFB.Registration.currentlyFocused = null;
axsFB.Registration.onFormEvent = function(evt) {  
  ident = evt.currentTarget.id;
  axsFB.Registration.currentlyFocused = evt.currentTarget;
  var say = '';
  switch (ident) {
    case 'name':
      say = "Enter full name:";
    break;
    case 'lifestage':
      var options = jQuery('option', evt.currentTarget);
      jQuery.each(options, function(i, val) {
        say += "Press " + (i + 1) + " if you are " + val.text + ". ";
      })
    break;
    case 'college_network_select':
      say = "Enter college name";
    break;
    case 'hs_network_select':
      say = "Enter high school name";
    break;
    case 'status':
      var options = jQuery('option', evt.currentTarget);
      jQuery.each(options, function(i, val) {
        say += "Press " + (i + 1) + " if you are a " + val.text + ". ";
      })
    break;
    case 'college_year':
      say = "Enter college graduation year";
    break;
    case 'high_school_year':
      say = "Enter high school graduation year";
    break;
    case 'sex':
      say = "Enter sex, male or female";
    break;
    case 'birthday_month':
      say = "Enter birthday month";
    break;
    case 'birthday_day':
      say = "Enter birthday day";
    break;
    case 'birthday_year':
      say = "Enter birthday year";
    break;
    case 'reg_email__':
      say = "Enter email address";
    break;
    case 'reg_passwd__':
      say = "Choose a password";
    break;
    case 'captcha_response':
      say = "Listen carefully and enter numbers you hear. Press control space to start or if you want to re-start at any point.";
    break;
    case 'terms':
      say = "Press space to accept terms and register.";
    break;
    default:
      say = ident;
  }
  axsFB.axsJAXObj.speakTextViaNode(say);
}

axsFB.Registration.tostart = false;

axsFB.Registration.pageOnLoad = function() {
  
  jQuery('#r_form :input').bind('focus', function(e) {
    axsFB.Registration.onFormEvent(e);
  });
  
  error = jQuery('.register_errors h2');
  if (error.length != 0) {
    axsFB.axsJAXObj.speakTextViaNode("There was an error registering: " + error.text() + " . . . Please press space to move to the form.");
    axsFB.Registration.tostart = true;
  } else {
    head = jQuery("h2:contains('Confirm Your Email Address')");
    if (head.length != 0) {
      axsFB.axsJAXObj.speakTextViaNode("Please check your email and click the confirmation link.");
    } else {
      axsFB.axsJAXObj.speakTextViaNode("Facebook Sign up and Registration  . . . Please press space to move to the form.");
      axsFB.Registration.tostart = true;
    }
  }

}

axsFB.Registration.keyHandler = function(evt) {
  var sel = axsFB.Registration.currentlyFocused;
  if (sel != null && (sel.id == 'lifestage' | sel.id == 'status')) {
    
    var code = evt.charCode - 49;
    if (sel.options.length >= code)
    {
      sel.selectedIndex = code;
      jQuery(sel).change();
      return false;
    }
  
  //Ctrl + space to start captcha audio
  } else if (sel != null && sel.id == 'captcha_response' && evt.ctrlKey && evt.charCode == 32) {
    Recaptcha.switch_type('audio');
    return false;
  //Key 32 is space (to accept terms and conditions and submit)
  } else if (sel != null && sel.id == 'terms' && evt.charCode == 32) {
    jQuery(sel).click();
    jQuery(sel).change();
    jQuery('#r_form').submit();
    return false;
  //Key 32 space to start registration
  } else if (axsFB.Registration.tostart && evt.charCode == 32) {
    axsFB.Registration.tostart = false;
    jQuery('#name').select();
    jQuery('#name').focus();

    return false;
  }
  
  return true;
}

axsFB.Login = {};

axsFB.Login.pageOnLoad = function() {
  axsFB.axsJAXObj.speakTextViaNode("Welcome to Facebook! Press L to login or R to register.");
  axsFB.Login.tostart = true;
  jQuery('#email').bind('focus', function(e) {
    axsFB.Login.onFormEvent(e);
  });
  jQuery('#pass').bind('focus', function(e) {
    axsFB.Login.onFormEvent(e);
  });
}

axsFB.Login.keyHandler = function(evt) {
  // For L or l to Login
  if (axsFB.Login.tostart && (evt.charCode == 108 || evt.charCode == 76)) {
    axsFB.Login.tostart = false;
    jQuery('#email').select();
    jQuery('#email').focus();
  }
  // For R or r to Register
  else if (axsFB.Login.tostart && (evt.charCode == 114 || evt.charCode == 82)) {
    axsFB.Login.tostart = false;
    window.location = '/r.php';
  }
}

axsFB.Login.onFormEvent = function(evt) {  
  ident = evt.currentTarget.id;
  axsFB.Login.currentlyFocused = evt.currentTarget;
  var say = '';
  switch (ident) {
    case 'email':
      say = "Enter your email address.";
    break;
    case 'pass':
      say = "Enter your password and press enter to login.";
    break;
    default:
      say = ident;
  }
  axsFB.axsJAXObj.speakTextViaNode(say);
}

axsFB.Profile = {};
axsFB.Profile.currentSubPage = null;

axsFB.Profile.pageOnLoad = function() {
  axsFB.Profile.detectSubPage();
  
  if (axsFB.Profile.currentSubPage != null && axsFB.Profile.currentSubPage.pageOnLoad != null) {
    axsFB.Profile.currentSubPage.pageOnLoad();
  }
};

axsFB.Profile.pageURLSearch = function(search) {
  var url = window.location.toString();
  var index = url.indexOf('#');
  if (index != -1) {
    url = url.substr(index);
  }
  if (url.match(search) != null) {
    return true;
  } else {
    return false;
  }
};

axsFB.Profile.detectSubPage = function() {
  if (axsFB.Profile.pageURLSearch("v=info")) {
    axsFB.Profile.currentSubPage = axsFB.Profile.Info;
  } else if (axsFB.Profile.pageURLSearch("v=feed")) {
    axsFB.Profile.currentSubPage = axsFB.Profile.Wall;
  } else {
    axsFB.Profile.currentSubPage = null;
  }
};

axsFB.Profile.goToWall = function() {
  link = jQuery("#profile_tabs li[view='feed']").children('a').click();
};

axsFB.Profile.goToInfo = function() {
  link = jQuery("#profile_tabs li[view='info']").children('a').click();
};

axsFB.Profile.keyHandler = function(evt) {
  // ctrl+alt
  if (evt.ctrlKey && evt.altKey) {
    switch(evt.charCode)
    {
      // + w, W goes to Wall
      case 119:
      case 87:
        if (axsFB.Profile.currentSubPage == axsFB.Profile.Wall) {
          axsFB.Profile.Wall.readWall();
        } else {
          axsFB.Profile.goToWall();
        }
        return false;
      break;
      
      // + e, E goes to Info
      case 101:
      case 69:
        if (axsFB.Profile.currentSubPage == axsFB.Profile.Info) {
          axsFB.Profile.Info.readInfo();
        } else {
          axsFB.Profile.goToInfo();
        }
        return false;
      break;
    }
  }
      
  return true;
};

axsFB.Profile.sayHelp = function(say) {
  var helpStr = "Profile Commands . ";
      helpStr += "control alt and w to go to User's Wall. . . ";
      helpStr += "control alt and e to go to and hear User's Information. . . "
  if (say != false)
    axsFB.axsJAXObj.speakTextViaNode(helpStr);
  return helpStr;
};

axsFB.Profile.getFullName = function() {
  return jQuery('#profile_name').text();
};

axsFB.Profile.getStatus = function() {
  return jQuery('#status_text').text();
};

axsFB.Profile.Info = {};

axsFB.Profile.Info.sayBasicInfo = function(talk) {
  var speechStr = 'Basic Information: . . ';

  jQuery.each(jQuery('#info_section_info_basic dt'), function(i, val) {
    speechStr += jQuery(val).text() + ': ' + jQuery(val).next('dd').text() + ' . ';
  });
  if (talk == true)
    axsFB.axsJAXObj.speakTextViaNode(speechStr);
  return speechStr;
};

axsFB.Profile.Info.sayContactInfo = function(talk) {
  var speechStr = 'Contact Information: . . ';

  jQuery.each(jQuery('#info_section_info_contact dt'), function(i, val) {
    var label = jQuery(val).text();
    if (label != 'Email:')
      speechStr += label + ': ' + jQuery(val).next('dd').text() + ' . ';
  });
  if (talk == true)
    axsFB.axsJAXObj.speakTextViaNode(speechStr);
  return speechStr;
};

axsFB.Profile.Info.readInfo = function() {
  speechStr = axsFB.Profile.getFullName() + " " + axsFB.Profile.getStatus() + " . . ";
  speechStr += axsFB.Profile.Info.sayBasicInfo();
  speechStr += " . . " + axsFB.Profile.Info.sayContactInfo();
  axsFB.axsJAXObj.speakTextViaNode(speechStr);
};

axsFB.Profile.Info.pageOnLoad = function() {
  axsFB.Profile.Info.readInfo();
};

axsFB.Profile.Wall = {}

axsFB.Profile.Wall.pageOnLoad = function() {
  axsFB.Profile.Wall.readWall();
};

axsFB.Profile.Wall.readWall = function() {
  
};

/////////////// SEARCH //////////////////////

axsFB.Search = {};

axsFB.Search.pageOnLoad = function() {


  var cnrString = '<cnr next="RIGHT" prev="LEFT" comment="Mix and match the e' +
                  'xamples below to suit the page that you are working on.">' +
                  '' +
                  '  <list title="Current title" next="j" prev="k" fwd="DOWN' +
                  ' n" back="UP p" hotkey="h">  ' +
                  '   <item action="CALL:axsFB.Search.readResult">' +
                  '		/html[@id="facebook"]/body/div[@id="nonfooter"]/div[@id' +
                  '="page_height"]/div[@id="content"]/div/div[1]/div/div[@id=' +
                  '"search_results"]/div/div[*]' +
                  '	</item>' +
                  '	' +
                  '	 <target title="Next page" trigger="listTail">' +
                  '      /html[@id="facebook"]/body/div[@id="nonfooter"]/div' +
                  '[@id="page_height"]/div[@id="content"]/div[1]/div[1]/div/d' +
                  'iv[5]/div[2]/ul/li[last()]/a' +
                  '    </target>' +
                  '' +
                  '	<target title="Previous page" trigger="listHead">' +
                  '      /html[@id="facebook"]/body/div[@id="nonfooter"]/div' +
                  '[@id="page_height"]/div[@id="content"]/div[1]/div[1]/div/d' +
                  'iv[5]/div[2]/ul/li[1]/a' +
                  '    </target>' +
                  '	' +
                  '	</list>	' +
                  '	' +
                  '' +
                  '</cnr>	';
				  
  axsFB.axsNavObj.navInit(cnrString, null);
  axsFB.Search.introMsg();
}

axsFB.Search.selectedResult = null;

// This is said after the page is loaded
axsFB.Search.introMsg = function() {
  var query = jQuery('.bar.summary_bar.clearfix em').text();
	var msg = "Here are a list of search results for " + query + " . . ";
	axsFB.axsJAXObj.speakText(msg);
};

// read the name of the person
axsFB.Search.readResult = function(currentElement) {
  axsFB.Search.selectedResult = currentElement.elem;
	//var title = axsFB.axsJAXObj.evalXPath('./div[2]/dl/dd[1]/*',currentElement.elem)[0];
	var name = jQuery('.result_name', currentElement.elem).text();
	axsFB.axsJAXObj.speakText(name);
	//axsFB.axsJAXObj.speakText(title.innerHTML);
	axsFB.axsLensObj.view(currentElement.elem);
	currentElement.elem.scrollIntoView(true);
};

// read the name of the person
axsFB.Search.viewProfile = function(currentElement) {
  if (axsFB.Search.selectedResult != null) {
    axsFB.axsLensObj.view(null);
      //var title = axsFB.axsJAXObj.evalXPath('./div[2]/dl/dd[1]/*',currentElement.elem)[0];
  	var namearea = jQuery('.result_name', axsFB.Search.selectedResult);
  	var name = jQuery(namearea).text();
  	var link = jQuery('a', namearea);
  	if (link.length == 0) {
  	  axsFB.axsJAXObj.speakText(name + " has a Private Profile. You must first add this person as a friend. Press 'A' to add this user as friend.");
  	} else {
  	  //link.click(); //// TO FIX
  	  window.location = link.attr('href');
  	}
  	return false;
  }
  else
  {
    return true;
  }
};

axsFB.Search.addFriend = function(currentElement) {
  if (axsFB.Search.selectedResult != null) {
    axsFB.axsLensObj.view(null);
      //var title = axsFB.axsJAXObj.evalXPath('./div[2]/dl/dd[1]/*',currentElement.elem)[0];
    var link = jQuery("a:contains('Add as Friend')", axsFB.Search.selectedResult);
  	if (link.length == 0) {
  	  axsFB.axsJAXObj.speakText(name + " can not be added.");
  	} else {
  	  link.click();
  	  //window.location = link.attr('href');
  	}
  	return false;
  }
  else
  {
    return true;
  }
}

/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsFB.Search.keyHandler = function(evt){
  if (evt.ctrlKey) return true;
  
  if (evt.keyCode == 13) {
    return axsFB.Search.viewProfile();
  }

  // A for add Friend
  if (evt.charCode == 97 || evt.charCode == 65) {
    return axsFB.Search.addFriend();
  }
  
  
  if (evt.keyCode == 27){ // ESC
    axsFB.axsJAXObj.lastFocusedNode.blur();
    return false;
  }

  if (axsFB.axsJAXObj.inputFocused) return true;

  var command = axsFB.Search.charCodeMap[evt.charCode];

  if (command) return command();

  return true;
};


axsFB.Search.sayHelp = function(say) {
  var helpTxt = 'The following shortcut keys are available. Press n to go down and p to go up.';
  if (say != false)
  {
    axsFB.axsJAXObj.speakText(helpTxt);
  }
  return helpTxt;
}

/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
axsFB.Search.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function() {
         axsFB.magSize -= 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
         return false;
       },
  // = (equal symbol)
  61 : function() {
         axsFB.magSize += 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
         return false;
       }
};



/////////////// END SEARCH ////////////////


/////////////// INBOX ////////////////////


axsFB.Inbox = {};

axsFB.Inbox.pageOnLoad = function() {
  var cnrString = '<cnr next="RIGHT" prev="LEFT">' +
                  '  <list title="Read all Messages" fwd="DOWN" back="UP" ho' +
                  'tkey="a">' +
                  '    <item action="CALL:axsFB.Inbox.speakMailSenderInfo">' +
                  '      /html[@id="facebook"]/body/div[@id="nonfooter"]/div' +
                  '[@id="page_height"]/div[@id="content"]/div[1]/div[1]/div/t' +
                  'able[@id="megaboxx"]/tbody/tr[@id]' +
                  '    </item>' +
                  '	<target title="Switch to the tab associated with this li' +
                  'st" trigger="listEntry">' +
                  '      /html[@id="facebook"]/body/div[@id="nonfooter"]/div' +
                  '[@id="page_height"]/div[@id="content"]/div[1]/div[1]/div/t' +
                  'able[@id="megaboxx"]/tbody/tr[1]' +
                  '    </target>	' +
                  '    <target title="Next page" trigger="listTail">' +
                  '      /html[@id="facebook"]/body/div[@id="nonfooter"]/div' +
                  '[@id="page_height"]/div[@id="content"]/div[1]/div[1]/div/d' +
                  'iv[last()]/div/ul/li[last()]/a' +
                  '    </target>	' +
                  '    <target title="Previous page" trigger="listHead">' +
                  '     /html[@id="facebook"]/body/div[@id="nonfooter"]/div[' +
                  '@id="page_height"]/div[@id="content"]/div[1]/div[1]/div/di' +
                  'v[4]/div/ul/li[1]/a' +
                  '    </target>' +
                  '	<target title="Read message" hotkey="ENTER">' +
                  '      ./td[5]/div/a' +
                  '    </target>	' +
                  ' </list>' +
                  '  <list title="Read UnRead Messages" next="DOWN" prev="UP' +
                  '" hotkey="u">' +
                  '    <item action="CALL:axsFB.Inbox.speakMailSenderInfo">' +
                  '      /html[@id="facebook"]/body/div[@id="nonfooter"]/div' +
                  '[@id="page_height"]/div[@id="content"]/div/div[1]/div/tabl' +
                  'e[@id="megaboxx"]/tbody/tr[@id][@class="new_message"]' +
                  '    </item>' +
                  '	<target title="Read message" hotkey="ENTER">' +
                  '      ./td[5]/div/a' +
                  '    </target>' +
                  '  </list>' +
                  '  <list title="Read conversation" hotkey="r">' +
                  '  <item action="CALL:axsFB.Inbox.speakFullEmail">' +
                  '	/html[@id="facebook"]/body/div[@id="nonfooter"]/div[@id=' +
                  '"page_height"]/div[@id="content"]/div[1]/div[1]/div/div[@i' +
                  'd="messages"]' +
                  '  </item>' +
                  '  </list>' +
                  '  <list title="Read last message conversation" hotkey="l"' +
                  '>' +
                  '  <item action="CALL:axsFB.Inbox.speaklastMessage">' +
                  '	/html[@id="facebook"]/body/div[@id="nonfooter"]/div[@id=' +
                  '"page_height"]/div[@id="content"]/div[1]/div[1]/div/div[@i' +
                  'd="messages"]' +
                  '  </item>' +
                  '  </list>' +
                  '  <target title="Compose Mail" hotkey="c" action="CALL:axsFB.Inbox.Co' +
                  'mpose">' +
                  '  /html[@id="facebook"]/body/div[@id="nonfooter"]/div[@id' +
                  '="page_height"]/div[@id="content"]/div[1]/div[1]/div/div[1' +
                  ']/center/div[2]/ul[@id="toggle_tabs_unused"]/li/a[@id="inb' +
                  'ox_compose_tab"]' +
                  '  </target>' +
                  '  <target title="Reply to email" hotkey="y" action="CALL:' +
                  'axsFB.Inbox.ReplyToEmail">' +
                  '  /html[@id="facebook"]/body/div[@id="nonfooter"]/div[@id' +
                  '="page_height"]/div[@id="content"]/div[1]/div[1]/div/div[@' +
                  'id="messages"]' +
                  '  </target>' +
                  ' </cnr>';

  axsFB.axsNavObj.navInit(cnrString, null);
};



axsFB.Inbox.keyHandler = function(evt){
  //If Ctrl is held, it must be for some AT. 
  if (evt.ctrlKey) return true;
  
 /* if (evt.keyCode == 27){ // ESC
    axsFB.axsJAXObj.lastFocusedNode.blur();
    return false;
  }
*/
  if (axsFB.axsJAXObj.inputFocused) return true;
  
  var command = axsFB.Inbox.charCodeMap[evt.charCode];

  if (command)  return  command();
  return true;  
};


axsFB.Inbox.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function () {
         axsFB.magSize -= 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
	     return false;
       },
  // = (equal symbol) 	   
  61 : function () {
         axsFB.magSize += 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
	     return false;
       }
};

axsFB.Inbox.sayHelp = function(say){
	var helpStr = "Inbox commands. . ";
	helpStr += "To view all messages, press escape and a. ";
	helpStr += "To view all unread messages, press escape and u. ";
	helpStr += "To toggle down and up messages, use the up and down arrow keys. ";
	helpStr += "To view the entire message when a message is selected, press enter. ";
	helpStr += "Press escape and c to compose a message. ";
	helpStr += "Once a message is loaded, press escape and r to read a conversation. "
	helpStr += "To toggle straight to the last message pres escape and l. ";
	helpStr += "To reply to a message, once viewing a message, press escape and r. ";
	
	if(say != false)
		axsFB.axsJaxObj.speakTextViaNode(helpStr);
	return helpStr;
};

/**
 * Function CALL:speakMailSenderInfo(currentElement) Speak the mail information intelligently 
 * Input: The current list item element passed from the CNR rule
 * Output: None
 *
 *  THIS IS THE LATEST VERSION
 */
axsFB.Inbox.speakMailSenderInfo = function (currentElement)
{
	//Declare a couple of parameters to be read..
  var resultRow = currentElement.elem;
	
	var nameOfSender = axsFB.axsJAXObj.evalXPath('./td[4]/span[1]/a',currentElement.elem)[0];
	
	var timeOfMessage = axsFB.axsJAXObj.evalXPath('./td[4]/span[2]',currentElement.elem)[0];
	
	var Subject = axsFB.axsJAXObj.evalXPath('./td[5]/div/a',currentElement.elem)[0];
	
	var finalMessage = 'Message from' + ' . '  + nameOfSender.innerHTML+ ' . '+'was received at '+' . ' +  timeOfMessage.innerHTML+' . Subject is '+' . '+Subject.innerHTML;
	axsFB.axsLensObj.view(resultRow);
  resultRow.scrollIntoView(true);
	axsFB.axsJAXObj.speakText(finalMessage); 	//Speak the login box name intelligently
}

/**
 * Function CALL:speakFullEmail(currentElement) Speak whole conversation intelligently  
 * Input: The current list item element passed from the CNR rule
 * Output: None
 *
 *  THIS IS THE LATEST VERSION
 */
axsFB.Inbox.speakFullEmail = function(currentElement)
{
	
	//Declare a couple of parameters to be read..
  var resultRow = currentElement.elem;
	
	//Return the list of nodes. wrt. nodes corresponding messages. 
	var allMessages = axsFB.axsJAXObj.evalXPath('./div[@id]',resultRow);
	
	var conversationContent = "This is the conversation . . ";
	
	//conversationContent+=allMessages[0].innerHTML;
	//var trial = axsFB.axsJAXObj.evalXPath("./div[2]/div[2]",allMessages[0])[0];
		//conversationContent+=trial.innerHTML;
	for (var i=0; i<allMessages.length; i++)
	{
		//Now evaluate each of these messages.
		conversationContent+= " . On "+(axsFB.axsJAXObj.evalXPath("./div[2]/div[2]",allMessages[i])[0]).innerHTML+" . . ";
		conversationContent+=(axsFB.axsJAXObj.evalXPath("./div[2]/div[1]/a",allMessages[i])[0]).innerHTML+" . wrote the following message . . ";
		var message = ((axsFB.axsJAXObj.evalXPath("./div[3]/div[1]",allMessages[i])[0]).innerHTML).replaceAll("<br/>","");
		message = message.replaceAll("<br />","");
		message = message.replaceAll("<br>","");
		conversationContent+=message+" . . . ";
	}

	var finalMessage = conversationContent
	axsFB.axsLensObj.view(resultRow);
  resultRow.scrollIntoView(true);
	axsFB.axsJAXObj.speakText(finalMessage); 	//Speak the login box name intelligently
}

/**
 * Function CALL:speakLastMessage(currentElement) Speak whole conversation intelligently  
 * Input: The current list item element passed from the CNR rule
 * Output: None
 *
 *  THIS IS THE LATEST VERSION
 */
axsFB.Inbox.speaklastMessage = function(currentElement)
{
	
	//Declare a couple of parameters to be read..
  var resultRow = currentElement.elem;
	
	//Return the list of nodes. wrt. nodes corresponding messages. 
	var allMessages = axsFB.axsJAXObj.evalXPath('./div[@id]',resultRow);
	
	var conversationContent = "This is the last message of the conversation . . ";
	
	//conversationContent+=allMessages[0].innerHTML;
	//var trial = axsFB.axsJAXObj.evalXPath("./div[2]/div[2]",allMessages[0])[0];
		//conversationContent+=trial.innerHTML;
	for (var i=(allMessages.length-1); i<allMessages.length; i++)
	{
		//Now evaluate each of these messages.
		conversationContent+= " . On "+(axsFB.axsJAXObj.evalXPath("./div[2]/div[2]",allMessages[i])[0]).innerHTML+" . . ";
		conversationContent+=(axsFB.axsJAXObj.evalXPath("./div[2]/div[1]/a",allMessages[i])[0]).innerHTML+" . wrote the following message . . ";
		var message = ((axsFB.axsJAXObj.evalXPath("./div[3]/div[1]",allMessages[i])[0]).innerHTML).replaceAll("<br/>","");
		message = message.replaceAll("<br />","");
		message = message.replaceAll("<br>","");
		conversationContent+=message+" . . . ";
	}

	var finalMessage = conversationContent
	axsFB.axsLensObj.view(resultRow);
  resultRow.scrollIntoView(true);
	axsFB.axsJAXObj.speakText(finalMessage); 	//Speak the login box name intelligently
}


/**
 * Function CALL:Compose(currentElement) Compose an email. 
 * Input: The current list item element passed from the CNR rule
 * Output: None
 *
 *  THIS IS THE LATEST VERSION
 */
axsFB.Inbox.Compose = function(currentElement)
{
		axsFB.axsJAXObj.clickElem(currentElement.elem);
}
	
/**
 * Function CALL:ReplyToEmail(currentElement) Reply to an email/dynamic behaviour. 
 * Input: The current list item element passed from the CNR rule
 * Output: None
 *
 *  THIS IS THE LATEST VERSION
 */
axsFB.Inbox.ReplyToEmail = function(currentElement)
{
		//Declare a couple of parameters to be read..
  var resultRow = currentElement.elem;
	
	//Return the list of nodes. wrt. nodes corresponding messages. 
	var allMessages = axsFB.axsJAXObj.evalXPath('./div[@id]',resultRow);
	
	//Code to check whether there is one message or multiple.
	if(allMessages.length>1)
	{
		//Put focus on the Reply input Box
		axsFB.axsJAXObj.speakText("Please enter your reply followed by tab key and then click on send reply . ");
		var pathOfInput = axsFB.axsJAXObj.evalXPath("../div[@id='inline_composer']/form[@id='compose_message']/dl/dd[@id='dd_message_field']/textarea[@id='message']",resultRow)[0].focus();
	}
	else
	{
		var linkToReply = axsFB.axsJAXObj.evalXPath('./div[2]/div[3]/a',allMessages[0])[0];
		axsFB.axsJAXObj.speakText(linkToReply.innerHTML);
		axsFB.axsJAXObj.clickElem(linkToReply);
	}

		
}
	

 
String.prototype.replaceAll = function(pcFrom, pcTo){
	var i = this.indexOf(pcFrom);
	var c = this;
 
	while (i > -1){
		c = c.replace(pcFrom, pcTo); 
		i = c.indexOf(pcFrom);
	}
	return c;
}



/////////////// END INBOX ////////////////


/////////////// REQUESTS ////////////////////

axsFB.Requests = {};

axsFB.Requests.pageOnLoad = function() {

  var cnrString = '<cnr next="RIGHT l" prev="LEFT h" comment="Mix and match t' +
                  'he examples below to suit the page that you are working on' +
                  '.">' +
                  '  ' +
                  '  <list title="List that uses CALL to issue a call back t' +
                  'o speakComplexDataIntelligently(itemObject) with the curre' +
                  'nt item as the parameter" next="DOWN j" prev="UP k" hotkey' +
                  '="e"> ' +
                  '' +
                  '    <item action="CALL:axsFB.Requests.speakEventRequests">' +
                  '      /html[@id="facebook"]/body/div[@id="nonfooter"]/div' +
                  '[@id="page_height"]/div[@id="content"]/div/div[2]/div[1]/d' +
                  'iv/div[@id="event_invite"]/div[@id]/table/tbody/tr/td[2]' +
                  '    </item>' +
                  '    ' +
                  '	<target hotkey="y">' +
                  '		./div[4]/input[@id=""][@value="Yes"]' +
                  '	</target>' +
                  '' +
                  '	<target hotkey="n">' +
                  '		./div[4]/input[@id=""][@value="No"]' +
                  '	</target>' +
                  '	' +
                  '	<target hotkey="m">' +
                  '		./div[4]/input[@id=""][@value="Maybe"]' +
                  '	</target>' +
                  '  </list>' +
                  '' +
                  '  <list title="List that uses CALL to issue a call back t' +
                  'o speakComplexDataIntelligently(itemObject) with the curre' +
                  'nt item as the parameter" next="DOWN j" prev="UP k" hotkey' +
                  '="g">' +
                  '  ' +
                  '	<item action="CALL:axsFB.Requests.speakGroupRequests">' +
                  '		/html[@id="facebook"]/body/div[@id="nonfooter"]/div[@id' +
                  '="page_height"]/div[@id="content"]/div[1]/div[2]/div[1]/di' +
                  'v/div[@id="group_invite"]/div[@id]/table/tbody/tr/td[2]' +
                  '	</item>' +
                  '	' +
                  '	<target hotkey="y">' +
                  '		./div[3]/input[@id=""][@value="Confirm"]' +
                  '	</target>' +
                  '' +
                  '	<target hotkey="n">' +
                  '		./div[3]/input[@id=""][@value="Ignore"]' +
                  '	</target>' +
                  '' +
                  '  </list>' +
                  '' +
                  '' +
                  '	<list title="List that uses CALL to issue a call back to' +
                  ' speakComplexDataIntelligently(itemObject) with the curren' +
                  't item as the parameter" next="DOWN j" prev="UP k" hotkey=' +
                  '"f">' +
                  '  ' +
                  '	<item action="CALL:axsFB.Requests.speakFriendRequests">' +
                  '		/html[@id="facebook"]/body/div[@id="nonfooter"]/div[@id' +
                  '="page_height"]/div[@id="content"]/div/div[2]/div[1]/div/d' +
                  'iv[@id="friend_add"]/span[@id]/div[@id]/table/tbody/tr/td[' +
                  '2]' +
                  '	</item>' +
                  '	' +
                  '	<target hotkey="y">' +
				  '		./form/div[2]/input[@id=""][@value="Confirm"]' +
                  '	</target>' +
                  '' +
                  '	<target hotkey="n">' +
                  '		./form/div[2]/input[@id=""][@value="Ignore"]' +
                  '	</target>' +
                  '' +
                  '  </list>' +
                  '</cnr>	' +
                  '' +
                  '';

  axsFB.axsNavObj.navInit(cnrString, null);
};

axsFB.Requests.sayHelp = function(say){
	var helpStr = "Request commands ."
	helpStr += "To hear friend requests, push f . ";
	helpStr += "To hear event invitations, push e . ";
	helpStr += "To hear group invitations, push g . ";
	helpStr += "To scroll up or down the requests, push up or down on the direction pad .";
	if(say != false)
		axsFB.axsJaxObj.speakTextViaNode(helpStr);
	return helpStr;
};


/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsFB.Requests.keyHandler = function(evt){
  //If Ctrl is held, it must be for some AT. 
  if (evt.ctrlKey) return true;

  if (evt.keyCode == 27){ // ESC
    axsFB.axsJAXObj.lastFocusedNode.blur();
    return false;
  }

  if (axsFB.axsJAXObj.inputFocused) return true;

  var command = axsFB.charCodeMap[evt.charCode];

  if (command) return command();

  return true;
};



/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
axsFB.Requests.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function() {
         axsFB.magSize -= 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
         return false;
       },
  // = (equal symbol)
  61 : function() {
         axsFB.magSize += 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
         return false;
       }
};

axsFB.Requests.speakEventRequests = function(currentElement)
{
	var senderName = axsFB.axsJAXObj.evalXPath('./div[1]/a',currentElement.elem)[0];
	var eventName  = axsFB.axsJAXObj.evalXPath('./b/a',currentElement.elem)[0];
	var date       = axsFB.axsJAXObj.evalXPath('./span',currentElement.elem)[0];
	var finalMessage = "event" + ' . ' + senderName.innerHTML + ' . ' + 'has invited you to' + ' . '
		+ eventName.innerHTML + ' . ' + "on" + ' . ' + date.innerHTML + ' . ' + "Push why to attend event, push end"
		+ ' . ' + "to decline event, push em if you might go to the event";

		//add an event listener to see if Y, N, or M is clicked, look at Nima's code from last night
	//axsFB.axsLensObj.view(resultRow);
  //resultRow.scrollIntoView(true);
	axsFB.axsJAXObj.speakText(finalMessage); 	//Speak the login box name intelligently
}

axsFB.Requests.speakGroupRequests = function(currentElement)
{
	var senderName = axsFB.axsJAXObj.evalXPath('./div[1]/a',currentElement.elem)[0];
	var groupName  = axsFB.axsJAXObj.evalXPath('./b/a',currentElement.elem)[0];
	var finalMessage = "group invitation" + " . " + senderName.innerHTML + ' . ' + 'has invited you to join' + ' . '
		+ groupName.innerHTML + "Push why to join group, push end"
		+ ' . ' + "to decline group invitation";

		//add an event listener to see if Y, N, or M is clicked, look at Nima's code from last night
	//axsFB.axsLensObj.view(resultRow);
  //resultRow.scrollIntoView(true);
	axsFB.axsJAXObj.speakText(finalMessage); 	//Speak the login box name intelligently
}

axsFB.Requests.speakFriendRequests = function(currentElement)
{
	var senderName = axsFB.axsJAXObj.evalXPath('./a',currentElement.elem)[0];
	/*var numCommFriends = axsFB.axsJAXObj.evalXPath('./div[@id="mutual_friend_line"]',currentElement.elem)[0];
	commFrStr = numCommFriends.innerHTML;
	strLen = commFrStr.length - 1;
	commFrStr = commFrStr.substring(0, strLen);*/
	axsFB.axsJAXObj.speakText("friend invitation . " + senderName.innerHTML + "wants to be your friend, . "
		+ "Push y to accept friend invitation, Push end to ignore friend invitation");
}


/////////////// END REQUESTS ////////////////






axsFB.sayHelp = function() {
  var helpStr = ""
  
  if (axsFB.currentPage != null && axsFB.currentPage.sayHelp != null)
    helpStr += axsFB.currentPage.sayHelp(false);
  
  helpStr += "Global Facebook Commands . ";
  helpStr += "control alt and h to go to home. ";
  helpStr += "control alt and p to go to profile. ";
  helpStr += "control alt and f to go to friends. ";
  helpStr += "control alt and i to go to inbox. ";
  helpStr += "control alt and r to go to requests. ";
  helpStr += "control alt and l to log out. ";
  
  axsFB.axsJAXObj.speakTextViaNode(helpStr);
};

axsFB.anyLoginForms = function() {
  var forms = jQuery("form");
  var found = false;
  jQuery.each(forms, function(i, val) {
    if (val.action.match("login") != null)
    {
      found = true;
      return true;
    }
  });
  return found;
}

axsFB.pageOnLoad = function() {

  // FACEBOOK PAGE IDENTIFIER
  if (axsFB.pageTitleContains("Home")) {
    axsFB.currentPage = axsFB.Home;
  } else if (axsFB.pageURLContains("r.php")) {
    axsFB.currentPage = axsFB.Registration;
  } else if (axsFB.pageURLContains("profile.php")) {
    axsFB.currentPage = axsFB.Profile;
  } else if (axsFB.pageTitleContains("Search:")) {
    axsFB.currentPage = axsFB.Search;
  } else if (axsFB.pageTitleContains("Inbox") || axsFB.pageTitleContains("Message:")) {
    axsFB.currentPage = axsFB.Inbox;
  } else if (axsFB.pageTitleContains("Confirm Requests")) {
    axsFB.currentPage = axsFB.Requests;
  } else if (axsFB.anyLoginForms()) {
    axsFB.currentPage = axsFB.Login;
  } else {
    axsFB.currentPage = null;
  }

  
  if (axsFB.currentPage != null && axsFB.currentPage.pageOnLoad != null)
  {
    axsFB.currentPage.pageOnLoad();
  }

}

axsFB.doLogout = function() {
  jQuery("#fb_menu_logout a").click();
};


/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsFB.keyHandler = function(evt){

  
  // ctrl+alt
  if (evt.ctrlKey && evt.altKey) {
    switch(evt.charCode)
    {
      // + ? for Help
      case 63:
        axsFB.sayHelp();
        return false;
      break;
      
      // + h, H goes to Home
      case 104:
      case 72:
        window.location = "/home.php";
        return false;
      break;
      
      // + p, P goes to My Profile
      case 112:
      case 80:
        window.location = "/profile.php";
        return false;
      break;
      
      // + f goes to Friends
      case 102:
      case 70:
        window.location = "/friends/";
        return false;
      break;
      
      // + i goes to Inbox
      case 105:
      case 73:
        window.location = "/inbox/";
        return false;
      break;
      
      // + r goes to My Requests
      case 114:
      case 82:
        window.location = "/reqs.php";
        return false;
      break;
      
      // + l, L Logs Out
      case 108:
      case 76:
        //window.location = document.getElementById('fb_menu_logout').getElementsByTagName('a')[0].href;

        axsFB.doLogout();
        return false;
      break;
      
      // + s, S Goes to Search Field
      case 115:
      case 83:
        jQuery("#q").focus();
        axsFB.axsJAXObj.speakTextViaNode("Enter search query and press enter");
        //document.getElementById('q').focus();
        return false;
      break;
    }
  }
  
  if (axsFB.currentPage != null && axsFB.currentPage.keyHandler != null) {
    return axsFB.currentPage.keyHandler(evt);
  }
  else {
    return true;
  }
  
  /*//If Ctrl is held, it must be for some AT. 
  if (evt.ctrlKey) return true;

  if (evt.keyCode == 27){ // ESC
    axsFB.axsJAXObj.lastFocusedNode.blur();
    return false;
  }

  if (axsFB.axsJAXObj.inputFocused) return true;

  var command = axsFB.keyCodeMap[evt.keyCode] ||
                axsFB.charCodeMap[evt.charCode];

  if (command) return command();

  return true;*/
};

/**
 * Map from key codes to functions
 */
axsFB.keyCodeMap = {
  // Map additional keyboard behavior that involves key codes here
};

/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
 /*
axsFB.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function() {
         axsFB.magSize -= 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
         return false;
       },
  // = (equal symbol)
  61 : function() {
         axsFB.magSize += 0.10;
         axsFB.axsLensObj.setMagnification(axsFB.magSize);
         return false;
       },
  // ? (question mark)
  63 : function() {
         var helpStr = axsFB.HELP +
                       axsFB.axsNavObj.localHelpString() +
                       axsFB.axsNavObj.globalHelpString();
         axsFB.axsJAXObj.speakTextViaNode(helpStr);
         return false;
       }
};
*/

axsFB.init();
var oldURL = window.location.toString();


function ourLoad() {
  axsFB.pageOnLoad();
  pageChangeDetector();
  setInterval("pageChangeDetector()", 250);
}

function reLoad() {
  axsFB.pageOnLoad();
}

function letsJQuery() {
  jQuery.noConflict();
  window.focus();
  jQuery(document).ready(function() {
    window.setTimeout(ourLoad,100);
  });
}

function pageChangeDetector() {
  if (oldURL != window.location.toString()) {
    oldURL = window.location.toString();
    jQuery(document).ready(function() {
      window.setTimeout(reLoad(),150);
    });
  }
}