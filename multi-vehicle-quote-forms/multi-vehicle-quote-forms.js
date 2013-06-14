function Widget_multi_vehicle_quote_forms() {
	
	this.onReadyExtend = function() {
		var calcref = this.$widgetDiv.attr('calcref');
		var params = this.$widgetDiv.attr('params');
		
		var cr;
		
		// SCP
		if (typeof calcref != 'undefined') {
			cr = calcref;
		}
		
		// CP
		if (typeof params != 'undefined') {
			var paramsObj = {};
			params.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
				paramsObj[key] = value;
			});
			if (typeof paramsObj.ref != 'undefined' && paramsObj.ref != null && paramsObj.ref.indexOf("{") == -1) {
				cr = paramsObj.ref;
			}
		}
		
		var initialData;
		if (typeof cr != 'undefined') {
			initialData = '<quote><calcref>' + cr + '</calcref></quote>';
		}
		rf.loadFlow('widgets/multi-vehicle-quote-forms/new-quote-flow.js', $('.rhinoforms-quote-formContainer', this.$widgetDiv), initialData);


		var setLanguage = function() {
			var language = ($('#currentLocale').html().substring(2) == 'en') ? 'english' : 'finnish';
			$.getJSON('widgets/common-language-switcher/finnish.json', function(data) {
				$.each(data, function(key, val) {
					if(language == 'finnish'){replaceString(document.body, key, val);}
					else {replaceString(document.body, val, key);}	
				});
			});
		};

		rf.onEveryFormLoad(setLanguage);

	}	
}

function allowDrop(ev){
	ev.preventDefault();
}

function drag(ev){
	$("#errorMsgs").empty();
	$("#infoMsgs").empty();
	ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev){

	$("#errorMsgs").empty();
	var $oneMainDriverError = $('<h4>You can only have one main driver!<h4>');

	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");

	var abi;
	var permission;
	var driver;

	abi = ev.toElement.getAttribute("abi");
	permission = ev.toElement.getAttribute("permission");

	if( ev.toElement.getAttribute('num') == '1' && ev.target.children.length != 0){

		console.log(ev.toElement)
		$("#errorMsgs").prepend($oneMainDriverError)

	} else {

		var x = $(ev.toElement.parentNode).html();
		var z = data.split("#");
		var y = 'id="' + z[0];
		
		//if driver not already present on vehicle
		if(x.indexOf(y) == -1){
			ev.target.appendChild(document.getElementById(data));
		} else {
			$("#errorMsgs").prepend("<h4>" +  z[0].replace(/([A-Z])/g, ' $1') + " is already present as a driver on this vehicle!!!<h4>")
		}
	}
	
}
