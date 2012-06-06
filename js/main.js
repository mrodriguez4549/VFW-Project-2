/* 
	Marco Rodriguez -->
  	06-07-12 -->
 	Project 2 -->
	VFW 1206 -- >
*/
// Javascript file 

//Wait for DOM
window.addEventListener("DOMContentLoaded", function(){
	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	// populate options for ET Time 

	function fastestTime(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = $('fastest')
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "fast");

		for(var i=0, f=fast.length; i<f; i++){ // loop thru our variable data
			var makeOption = document.createElement('option');
			var optText = fast[i];
			makeOption.setAttribute("value", fast[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// populate options for amount of power 

	function powerAmount(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = $("hp"),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "hpr");

		for(var i=0, h=hpr.length; i<h; i++){ // loop thru our variable data
			var makeOption = document.createElement("option");
			var optText = hpr[i];
			makeOption.setAttribute("value", hpr[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// populate options for power adders

	function powerAdders(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = $('adder'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "adders");

		for(var i=0, a=adders.length; i<a; i++){ // loop thru our variable data
			var makeOption = document.createElement('option');
			var optText = adders[i];
			makeOption.setAttribute("value", adders[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// redio buttons

	function getSelectedRadio(){
		var radios = document.forms[0].tranny;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				trannyValue = radios[i].value;
			}
		}
	}

	function getCheckboxValue(){
		if($('fav').checked){
			siteValue = $('fav').value;
		}else{
			siteValue = "No";
		}
	}

// toggle controls

	function toggleControls(n){
		switch(n){
			case "on":
				$('contactForm').style.display  = "none";
				$('clear').style.display 		= "inline";
				$('displayLink').style.display 	= "none";
				$('addNew').style.display 		= "inline";
				break;

			case "off":
				$('contactForm').style.display  = "block";
				$('clear').style.display 		= "inline";
				$('displayLink').style.display 	= "inline";
				$('addNew').style.display 		= "none";
				$('items').style.display 		= "none";
				break;

			default:
				return false;		
		}
	}

	// stored data function

		function storeData(){
		var id 					= Math.floor(Math.random()*100000001);
		getSelectedRadio();
		getCheckboxValue();
		var item  				= {};
			item.fname			= ["First Name:", 	$('fname').value];
			item.lname			= ["Last Name:", 	$('lname').value];
			item.email			= ["Email:", 		$('email').value];
			item.date			= ["Date:", 		$('date').value];
			item.car			= ["Car:", 			$('car').value];
			item.make			= ["Make:", 		$('make').value];
			item.caramount		= ["Car Amount:", 	$('caramount').value];
			item.fastest		= ["Fastest:", 		$('fastest').value];
			item.hp				= ["Horse Power:", 	$('hp').value];
			item.adder			= ["Adder:", 		$('adder').value];
			item.tranny			= ["Transmission:", 	trannyValue];
			item.favorite		= ["Referred from:", 	siteValue];
			item.comments		= ["Comments:", 	$('comments').value];

			// save data stringify
			localStorage.setItem(id, JSON.stringify(item));
			alert("Contact Saved!");
	}

	// get data
	function getData(){
		toggleControls("on");
		if(localStorage.length ===0){
			alert("There is no data in local storage.");
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//
			var obj = JSON.parse(value);
			var makeSublist = document.createElement('ul');
			makeli.appendChild(makeSublist);

			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			} 
		}
	}

	// clear local data

	function clearLocal(){
		if(localStorage.length === 0){
			alert("Nothing to delete.");
		}else{
			localStorage.clear();
			alert("All Data Deleted");
			window.location.reload();
			return false;
		}
	}

	//Variable Defaults
	var fast = ["--ET Time--", "12's", "11's", "10's", "9's", "8's", "7's"],
		hpr = ["--Horse Power--", "400HP", "500HP", "600HP", "700HP", "800HP", "900HP", "1000HP", "1000HP+"],
		adders = ["--Power Adders--", "Nitrous Stage 1", "Nitrous Stage 2", "Nitrous Direct Port", "Nitrous Dry Kit", "--Forced Induction--", "Single Turbo", "Twin Turbo", "Single Turbo Meth", "Twin Turbo Race Fuel", "--Supercharged--", "Supercharged F1", "Supercharged F2", "Supercharged F3", "Supercharged F4"],
		trannyValue
		siteValue = "No"
		;

	// calling the functions for the populated option drop downs
		fastestTime();
		powerAmount();
		powerAdders();	

	//Set Link Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);

	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);

	var save = $("submit");
	save.addEventListener("click", storeData);

});