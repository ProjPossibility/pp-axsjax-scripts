// Author Gurmeet Singh gurmeets@usc.edu

// ==UserScript==
// @name          Sudoku Accessibility Enhancements
// @namespace     
// @description   Uses WAI-ARIA to enhance accessibility for Sudoku
// @include       http://view.websudoku.com/*
// @include		http://www.websudoku.com/*
// ==/UserScript==

function loadScript(){
  var currentURL = document.baseURI;
  if (currentURL.indexOf('http://www.websudoku.com/') === 0) {
     document.location = "http://view.websudoku.com/";
     return;
  }
  var theScript = document.createElement('script');
  theScript.type = 'text/javascript';
  theScript.src = 'http://ss12.info/svn/axsjax/Sudoku/ss12ScriptChooser.js';
  document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();