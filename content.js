//get options from the 'backend'
chrome.extension.sendRequest({command: "getOptions"}, function(response) {
	hotkeys = response.hotkeys; //this will be window.hotkeys...
	topszotarURL = response.topszotarURL;
	//console.log(response);

});

// Add shortcut (or 'hotkey')
window.addEventListener('keydown', function(e) {

		if(window.hotkeys == 'true') { 
			if (e.which == 84 && e.altKey) {
			// Run code for ALT+T
			
				window.open(window.topszotarURL + window.getSelection().toString(), '_blank');
			}
		}
}, false);

window.addEventListener('load', function() {
	init();
});


function handleRequest() {
	chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.command == "content-getSelectedText")
		  sendResponse({selectedText: window.getSelection().toString()});
	});

}



function init() {
	handleRequest();
}

