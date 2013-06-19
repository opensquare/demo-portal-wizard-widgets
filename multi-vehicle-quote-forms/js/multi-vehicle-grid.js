function createDriverStack(){
	console.log("Creating vehicle stack...")
	var x = ($(".gridVehicle").length)-1;
	var drivers = []

	$('div[type="driver"]').each(function () {
		drivers.push($(this).attr("id"));
	});
	
	jQuery.each(drivers, function(a, val) {
	    for(var i=1; i<x; i++){
		    var item = $("#"+ val).clone();
		    var insert = $("#" + val).parent();
			var itemId = item.attr("id");

			itemId = itemId + '#'+i;
			item.attr("id", itemId);
			insert.append(item);
		}
	});	
}

//Retain permissions already set
function restorePermissions(){
	$("input[use='permission']").each(function(){
		if($(this).attr('checked'))	{
			var info = $(this).attr("name").split("-");
			var $driver = $("div[code='" + info[2] + "']:gt(0)");
			var $permission = $("." + info[0] + "[abi='" + info[1]  + "']");
			$permission.append($driver);
		}	
	})
	// Reset backing checkboxes
	$('input[type=checkbox]').each(function () {
          $(this).prop('checked', false);            
	});
}

function drag(ev){
	$("#errorMsgs").empty();
	$("#infoMsgs").empty();
	ev.dataTransfer.setData("Text",ev.target.id);
}

function allowDrop(ev){
	ev.preventDefault();
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

function removePermission(rp){
	$("#errorMsgs, #infoMsgs").empty();
	$("#infoMsgs").prepend("<h4> Driver permission removed <h4>")
	returnToStack = $(rp).parent();
	returnToStackId = returnToStack.attr("id");
	returnToStackId = returnToStackId.split("#");
	returnToStackId = returnToStackId[0];

	$(".driverStack[driver='" + returnToStackId + "']").append(returnToStack);
}

function validatePermissions(){
	var error = false;
	var errorMsg = "<h4>There must be at least one main driver per vehicle</h4>";
	$("input[name='validSelection']").prop('checked', false);

	//At least one main driver per vehicle
	$(".main").each(function(){
		driver = $(this).find('div').attr("code");
		if (typeof driver == 'undefined'){
			error = true
		}
	}) 
	if (error){
		$("#errorMsgs").append(errorMsg);
		return false;
	}
	//Driver must have at least one driving permission
	$(".driverStack").each(function(){
		d = $(this).attr('driver');
		var x = $(".multiGrid").html();
		var y = 'id="' + d;
		if(x.indexOf(y) == -1){
			error = true
			errorMsg = "<h4>" + d.replace(/([A-Z])/g, ' $1') + " must have a driving permission on at least one vehicle</h4>";
		}
	})
	if (error){
		$("#errorMsgs").append(errorMsg);
		return false;
	}
	return true;
}


function parsePermissions(){
	$("#errorMsgs, #infoMsgs").empty();
	var inValid = !(validatePermissions());
	
	if(inValid){
		return;
	}else{
		$("input[name='validSelection']").prop('checked', true);
	}	

	console.log("Parsing permissions...")
	var abi;
	var permission;
	var driver;
	// Parse main drivers
	$(".main").each(function(){
		abi = $(this).attr("abi");
		driver = $(this).find('div').attr("code")

		if (typeof driver != 'undefined'){
			var checkName = "'main-" + abi + "-" + driver + "']";
			console.log("Checking box with name: " + checkName)
			$("input[name=" + checkName + '"').prop('checked', true);
		}
	}) 
	// Parse named drivers
	$(".named").each(function(){
		abi = $(this).attr("abi");
		var $namedDrivers = $(this).children();

		$namedDrivers.each(function(){
			driver = $(this).attr("code");
			if (typeof driver != 'undefined'){
				var checkName = "'named-" + abi + "-" + driver + "']";
				console.log("Checking box with name: " + checkName)
				$("input[name=" + checkName + '"').prop('checked', true);
			}
		})				
	})
}