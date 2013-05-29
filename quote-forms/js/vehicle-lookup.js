function VehicleLookup(lookupUrl, abiUrl, formFlowId) {
	
	this.init = function() {
		if ($("[name='vehKeyReg']").val()) {
			$(".findCar").hide();
			$(".carFound").show();
		}
		
		$(".changeVehicleButton").click(function() {
			clearAll();
			$(".findCar").show();
			$(".carFound").hide();
		});
	}
	
	this.lookupVehicle = function(reg, skipModelLookup) {
		vehicleLookup(lookupUrl + "?rf.flowId=" + formFlowId, reg, function (jqXHR, textStatus) {
			var vehicleXml = jqXHR.responseXML;
			if (jqXHR.status != 200) {
				vehicleNotFound();
			} else {
				//check if dvla => vehicle exists
				if (vehicleXml.getElementsByTagName("VEHICLE")[0].childNodes.length == 0){
					vehicleNotFound();
				}else{
					var vehicleMap = createVehicleMap(vehicleXml);
					vehicleMap["REG"] = reg;
					populateVehicle(vehicleMap, skipModelLookup);
				}
			}
		});
	}

	function vehicleNotFound() {
		setInputValue('vehDescReg','Vehicle Not Found');
		setInputValue('multiple','');
	}
	
	function lookupModelByABI(abiCode, descriptionDetails, callback) {
		var code1 = abiCode.substring(0, 3);
		var code2 = abiCode.substring(3, 6);
		var code3 = abiCode.substring(6);
		var data = {
				"rf.flowId": formFlowId,
				transformer: "xslt",
				value: code1,
				modelCode: code2,
				variantCode: code3,
		   };
		$.ajax({
			url: abiUrl,
			data: data,
			success: function(response) {
				response = response.substring(1, response.length - 1);
				response = eval(response);
				vehicle = response[0][1];
				if(defined(vehicle)){
					// If model appears in lists use instead of CDL
					if(descriptionDetails.mvris != "true"){
						descriptionDetails.model = vehicle.MODEL_DESCRIPTION;
					};
					descriptionDetails.code = vehicle.MAKE_CODE + vehicle.MODEL_CODE + vehicle.VARIANT_CODE;
					callback(descriptionDetails);
				} else {
					callback(descriptionDetails);
				}
			}
		});
	}
	
	function populateVehicle(vehicleDetails, skipModelLookup) {
		var yomReg = vehicleDetails.MANUF_DATE;
		yomReg = yomReg.substring(7);
		var make = vehicleDetails.MAKE;
		make = titleCase(make);
	
		if(vehicleDetails.MVRIS != "true"){
			vehicleDetails.MVRIS = "false"
		}
		var mvris = vehicleDetails.MVRIS;
		
		var fuel = vehicleDetails.FUEL;
		fuel = titleCase(fuel);
		var transmissionReg = vehicleDetails.TRANSMISSION;
		transmissionReg = titleCase(transmissionReg);
		engineCapacity = vehicleDetails.CC;
		vehicleKey = vehicleDetails.ABIBROKERNETCODE;
		var descriptionDetails = {make: make, yomReg: yomReg, fuel: fuel, mvris: mvris};
		var multiple = null;
		if (typeof vehicleDetails.MODEL != "string"){
			multiple = true;
			var dropDown = document.getElementById("multipleMatches");
			for (var i = 0; i < dropDown.length; i++){
				if(dropDown.options[i].value != ""){
					dropDown.options.remove(i);
					i = i - 1;
				}
			}
			for (var i = 0; i < vehicleDetails.MODEL.length; i++){
				document.getElementById("multipleMatches").options[0].text = "Retrieving models...";
				var modelCode = vehicleDetails.MODEL[i].getElementsByTagName("CODE")[0].textContent;
				var modelDesc = titleCase(vehicleDetails.MODEL[i].getElementsByTagName("MODEL")[0].textContent);
				descriptionDetails.model = modelDesc;
				descriptionDetails.code = modelCode;
				descriptionDetails.number = vehicleDetails.MODEL.length;
				if (skipModelLookup) {
					addModelToList(descriptionDetails);
				} else {
					lookupModelByABI(modelCode, descriptionDetails, addModelToList);
				};
			}
		} else {
			multiple = false;
			setInputValue('vehKeyReg', vehicleKey);
			var model = titleCase(vehicleDetails.MODEL);
			descriptionDetails.model = model;
			lookupModelByABI(vehicleKey, descriptionDetails, setSingleModel);
		}
		setInputValue("reg", vehicleDetails.REG);
		setInputValue("make", make);
		setInputValue("fuel", fuel);
		setInputValueChange("yomReg", yomReg);
		setInputValue("engineCapacity", engineCapacity);
		setInputValue("transmissionReg", transmissionReg);
		setInputValue("multiple", multiple);
	}
	function setSelectedModel(yomReg, make, model, fuel, vehicleKey){
		setInputValue("vehKeyReg", vehicleKey);
		var vehDescReg = yomReg + " " + make + " " + model + " (" + fuel + ")";
		setInputValue("vehDescReg", vehDescReg);
		setInputValue("model", model);
	}
	function setSingleModel(descriptionDetails){
		var model = titleCase(descriptionDetails.model);
		setInputValue("model", model);
		var vehDescReg = descriptionDetails.yomReg + " " + descriptionDetails.make + " " + model + " (" + descriptionDetails.fuel + ")";
		setInputValue('vehDescReg', vehDescReg);
		$(".findCar").hide();
		$(".carFound").show();
	}
	function clearAll() {
		setInputValue("reg", "");
		setInputValue("vehKeyReg", "");
		setInputValue("vehDescReg", "");
		setInputValue("make", "");
		setInputValue("model", "");
		setInputValue("fuel", "");
		setInputValueChange("yomReg", "");
		setInputValue("engineCapacity", "");
		setInputValue("transmissionReg", "");
		setInputValue("multiple", "");
	}
	function addModelToList(descriptionDetails){
		addEntryToDropDown(document.getElementById("multipleMatches"), titleCase(descriptionDetails.model), descriptionDetails.code);
		if (descriptionDetails.number + 1 == document.getElementById("multipleMatches").options.length) {
			document.getElementById("multipleMatches").options[0].text = "----SELECT----";
			jQuery("#vehDescReg").html("No vehicle selected");
			jQuery("#descLoad").css("display","none");
		};
	}
	function setSelectedMultiple(){
		var yomReg = document.getElementById('yearOfMake').value;
		var make = document.getElementById('make-in').value;
		var fuel = document.getElementById('fuel-in').value;
		var vehicleKey = document.getElementById('multipleMatches').value;
		var model = document.getElementById('multipleMatches').options[document.getElementById('multipleMatches').selectedIndex].text;
		setInputValue('vehKeyReg 	', vehicleKey);
		var vehDescReg = yomReg + " " + make + " " + model + " (" + fuel + ")";
		setInputValue('vehDescReg', vehDescReg);
		setInputValue("model", model);
	}
	
	function resetVehicleForm(message) {
		resetMultipleDropDown();
		if (defined(message)){
			jQuery("#vehDescReg").html(message);
		} else {
			jQuery("#vehDescReg").html("No vehicle selected");
		}
	}
	
	function resetMultipleDropDown(){
		var dropdown = document.getElementById('multipleMatches');
		clearDropDown(dropdown);
		addEntryToDropDown(dropdown, "----SELECT----","");
	}
	
	function populateTestVehicle() {
		var vehicleDetails = new Object();
		vehicleDetails.YEAROFMANUFACTURE = "2005";
		vehicleDetails.MAKE = "Rover";
		vehicleDetails.MODEL = "25";
		vehicleDetails.FUEL = "DIESEL";
		vehicleDetails.IMPORTED = "0";
		populateVehicle(vehicleDetails);
	}
	function noVehiclesFound(){
	  var modelDropDown = document.getElementById("selectVehicle");
		modelDropDown.length = 0;
		var optn = document.createElement("OPTION");
		optn.text = "No vehicles found ";
		optn.value = "";
		modelDropDown.options.add(optn);
	}
	function populateModel(make) {
		var modelDropDown = document.getElementById("selectModel");
		modelDropDown.length = 0;
		var optn = document.createElement("OPTION");
		optn.text = "Retrieving models....";
		optn.value = "";
		modelDropDown.options.add(optn);
		jQuery.ajax({
			type: "GET",
			url: "resourceManager",
			data: "action=retrieveList&listName=BucketStore://Lists/itbVehicleList&tableName=Models&keys=[MAKE=" + make + "]&filter=MODEL",
			dataType: "xml",
			async: true,
			success: function (response) {
				modelDropDown.length = 0;
				var listItems = response.getElementsByTagName("listItem");
				for (var i = 0; i < listItems.length; i++) {
					var value = listItems[i].childNodes[0].childNodes[0].nodeValue;
					var optn = document.createElement("OPTION");
					optn.text = value;
					optn.value = value;
					modelDropDown.options.add(optn);
				}
			}
		});
	}
	
	function clearVehicleKeys(){
		var vehicleDropDown = document.getElementById("selectVehicle");
		vehicleDropDown.length = 0;
		var optn = document.createElement("OPTION");
		optn.text = "---SELECT---";
		optn.value = "";
			vehicleDropDown.options.add(optn);
	}
	
	function findVehicleKeys() {
		var make = jQuery("#selectMake").val();
		var model = jQuery("#selectModel").val();
		var yearOfMake = jQuery("#makeYear").val();
		var engineType = jQuery("#engineType").val();
		engineType = engineType.substring(0, 1);
		var vehicleDropDown = document.getElementById("selectVehicle");
		vehicleDropDown.length = 0;
		var optn = document.createElement("OPTION");
		optn.text = "Searching for vehicles....";
		optn.value = "";
		vehicleDropDown.options.add(optn);
		jQuery.ajax({
			type: "GET",
			url: "resourceManager",
			data: "action=retrieveList&listName=BucketStore://Lists/itbVehicleList&tableName=ABI&keys=[MAKE_DESCRIPTION=" + make + ", MODEL=" + model + ", ENGINE_TYPE=" + engineType + ", MANUFACTURED_FROM=<" + (yearOfMake * 1 + 1) + ", MANUFACTURED_TO=>" + (yearOfMake * 1 - 1) + "]&filter=MAKE_CODE,MODEL_CODE,VARIANT_CODE,MODEL_DESCRIPTION,ENGINE_CC,DOORS",
			dataType: "xml",
			async: true,
			success: function (response) {
				vehicleDropDown.length = 0;
				var optn = document.createElement("OPTION");
				optn.text = "---SELECT---";
				optn.value = "";
				vehicleDropDown.options.add(optn);
				var listItems = response.getElementsByTagName("listItem");
				for (var i = 0; i < listItems.length; i++) {
					var properties = listItems[i].childNodes;
					var modelDesc = "";
					var makeCode = "";
					var modelCode = "";
					var variantCode = "";
					var engineCC = "";
					var doors = "";
					for (var j = 0; j < properties.length; j++) {
						var propertyname = properties[j].getAttribute("name");
						var propertyvalue = properties[j].childNodes[0].nodeValue;
						if (propertyname == "MAKE_CODE") {
							makeCode = propertyvalue;
						}
						if (propertyname == "MODEL_CODE") {
							modelCode = propertyvalue;
						}
						if (propertyname == "VARIANT_CODE") {
							variantCode = propertyvalue;
						}
						if (propertyname == "MODEL_DESCRIPTION") {
							modelDesc = propertyvalue;
						}
						if (propertyname == "ENGINE_CC") {
							engineCC = propertyvalue;
							engineCC = engineCC.replace(".0", "");
						}
						if (propertyname == "DOORS") {
							doors = propertyvalue;
							doors = doors.replace(".0", "");
						}
					}
					var vehicleDesc = make + " " + modelDesc + " (" + doors + " door, " + engineCC + "cc)";
					var vehicleKey = makeCode + modelCode + variantCode;
					optn = document.createElement("OPTION");
					optn.text = vehicleDesc;
					optn.value = vehicleKey;
					vehicleDropDown.options.add(optn);
				}
			}
		});
	}
	function titleCase(s) {
		if (s == null) {
			return "";
		}
		if (s.indexOf(" ") > -1) {
			return titleCase(s.substring(0, s.indexOf(" "))) + " " + titleCase(s.substring(s.indexOf(" ") + 1));
		} else if (s.indexOf("-") > -1) {
			return titleCase(s.substring(0, s.indexOf("-"))) + "-" + titleCase(s.substring(s.indexOf("-") + 1));
		} else if (s.indexOf("'") > -1) {
			return titleCase(s.substring(0, s.indexOf("'"))) + "'" + titleCase(s.substring(s.indexOf("'") + 1));
		} else {
			return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
		}
	}
	function defined(object) {
		if (typeof object != "undefined") {
			return true;
		} else {
			return false;
		}
	}
	
	function setInputValue(fieldName, value) {
		$("[name='" + fieldName + "']").val(value).text(value);
	}
	
	function setInputValueChange(fieldName, value) {
		$("[name='" + fieldName + "']").val(value).text(value).change();
	}

	/** 
	 * The following functions are from cdl.js
	 */
	function vehicleLookup(lookupUrl, vrm, callback) {
		$.ajax({
			url: lookupUrl,
			data: { "regNumber": vrm },
			complete: function(jqXHR, textStatus) {
				callback(jqXHR, textStatus);
			}
		});
	}

	function createVehicleMap(xml) {
		var vehicleMap = new Object();
		if (xml.getElementsByTagName("VEHICLE")[0].childNodes.length == 0 || xml.getElementsByTagName("MVRIS").length > 0){
			vehicleMap = useMvrisResults(xml);
		} else {
			var attributes = xml.getElementsByTagName("VEHICLE")[0].getElementsByTagName("*");
			for (var i = 0; i < attributes.length; i++) {
				attrName = attributes[i].nodeName;
				attrValue = attributes[i].childNodes[0].nodeValue;
				vehicleMap[attrName] = attrValue;
			}
			var fuel = xml.getElementsByTagName("DVLA")[0].getElementsByTagName("VEHICLE")[0].getElementsByTagName("FUEL")[0].childNodes[0].nodeValue;
			if (fuel == "HEAVY OIL"){
				fuel = "DIESEL";
			}
		}
		var transmissionReg;
		if (xml.getElementsByTagName("MVRIS").length > 0){
			transmissionReg = xml.getElementsByTagName("MVRIS")[0].getElementsByTagName("GEARBOX_TYPE")[0].childNodes[0].nodeValue;
		}
		if (checkForMultiple(xml.getElementsByTagName("ABI")[0])){
			vehicleMap["MODEL"] = new Array();
			var modelAttributes = xml.getElementsByTagName("ABI")[0].getElementsByTagName("ABI_CODE");
			for (var i = 0; i < modelAttributes.length; i++) {
				vehicleMap["MODEL"][i] = modelAttributes[i];
			}
		}

		var abicode = xml.getElementsByTagName("ABI")[0].getElementsByTagName("ABI_CODE")[0].getElementsByTagName("CODE")[0].childNodes[0].nodeValue;
		vehicleMap["TRANSMISSION"] = transmissionReg;
		vehicleMap["ABIBROKERNETCODE"] = abicode;
		return vehicleMap;
	}
	function checkForMultiple(abiXml){
		if (abiXml.getElementsByTagName("ABI_CODE").length > 1){
			return true;
		}
		return false;
	}
	function useMvrisResults(xml){
		// Only required values for forms are taken from result xml
		var map = new Object();
		var attributes = xml.getElementsByTagName("MVRIS")[0];
		map["MANUF_DATE"] = attributes.getElementsByTagName("REG_DATE")[0].childNodes[0].nodeValue;
		map["MAKE"] = attributes.getElementsByTagName("MAKE")[0].getElementsByTagName("DESC")[0].childNodes[0].nodeValue;
		map["FUEL"] = attributes.getElementsByTagName("FUEL")[0].getElementsByTagName("DESC")[0].childNodes[0].nodeValue;
		var model = attributes.getElementsByTagName("MODEL")[0].getElementsByTagName("DESC")[0].childNodes[0].nodeValue;
		var model_variant = attributes.getElementsByTagName("MODEL_VARIANT_NAME")[0].childNodes[0].nodeValue;
		map["MODEL"] = model + " " + model_variant;
		map["CC"] = attributes.getElementsByTagName("CC")[0].childNodes[0].nodeValue;
		map["MVRIS"] = "true";
		return map;
	}
}