function $(id) {
	return document.getElementById(id);
}

function init() {

	var tabLinks = getTabLinks();
	
	//add onclick property for tabLinks
	for(var i = 0; i < tabLinks.length; i++) {
		tabLinks[i].onclick = updatePage;
	}

	
	// Detect change to save the page.
	var inputs = document.querySelectorAll('input');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('change', saveOptions);
	}
	
	//Set the localStorage 
	setOptions();	
}

//get the tabLinks in the sidebar
function getTabLinks() {
	var tabLinks = new Array();
	var i = 1;
	var link;
	while(link = $("tabLink" + i)){
		tabLinks.push( link );
		i++;
	}

	return tabLinks;
}

//get the pages or 'tabs'
function getTabs() {
	var tabs = new Array();
	var i = 1;
	var tab;
	while(tab = $("tab" + i)){
		tabs.push( tab );
		i++;
	}

	return tabs;
}



//refresh page when click on another tabLink (set display styles etc..)
function updatePage() {
	//console.log(this.id);
	var tabs 	 = getTabs();
	var tabLinks = getTabLinks();

	//go through the tabs and tabLinks and set their display / class property accordingly
	for (var i = 0; i < tabs.length; i++) {
		if (tabLinks[i].id == this.id) {
			tabLinks[i].className = 'navbar-item-selected';
			tabs[i].style.display = 'block';
		}	else {
			tabLinks[i].className = 'navbar-item';
			tabs[i].style.display = 'none';
		}
	}
	//console.log(tabs);
}

function setOptions() {

	//set defaults
	if (!window.localStorage['hotkeys']) {
		window.localStorage['hotkeys'] = 'true';
	}
	
	//set inputs
	if (window.localStorage['hotkeys'] === 'true')	$("hotkeys").checked = 'true';
	else $("hotkeys").checked = '';
}

function saveOptions() {
	if($("hotkeys").checked)	window.localStorage['hotkeys'] = 'true';
	else	window.localStorage['hotkeys'] = 'false';
}



window.addEventListener('load', function() {	
	init();
});
