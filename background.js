//set globals
var topszotarURL = 'http://topszotar.hu/angolmagyar/';



function init() {
	// Set context menu text
	var menuText = "Topszótár...";

	// Register context menu
	chrome.contextMenus.create({"title": menuText, "contexts": ['selection'], "onclick": onClickTopszotar});

	// Report errors
	if (chrome.extension.lastError) {
		console.log("Failed to load the Topszótar extention. Error message: " + chrome.extension.lastError);
	}

	
	//when we hit the browser action icon
	chrome.browserAction.onClicked.addListener(function(tab){
		
		//get selected text from the content script
		chrome.tabs.sendRequest(tab.id, {command: "content-getSelectedText"}, function(response) {
			window.open(window.topszotarURL + response.selectedText, '_blank');
		});
	});
	
	//send (options) message to content.js
	handleRequest();
}


function onClickTopszotar(info, tab) {
	// Add one to the index so it opens to the right of the current tab
	var tabnum = tab.index + 1;
	
	//only numbers the 'dash' character, and a-zA-z + accented chars allowed
	//info.selectionText = info.selectionText.replace(/[^a-zA-Z0-9-éáűőúöüó]/g, "");
	
	// Append selected text to topszotar url
	var url = encodeURI(window.topszotarURL + info.selectionText);
	
	// Open new tab
	chrome.tabs.create({"index": tabnum, "url": url});
}


/*
 * API: http://code.google.com/chrome/extensions/messaging.html	
 */
function handleRequest() {	
	chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {
			if (request.command == "getOptions")
			  sendResponse({
				hotkeys: window.localStorage['hotkeys'],
				topszotarURL: window.topszotarURL
				
				});
		});
}



window.addEventListener('load', function() {
	init();
});