	/* On YOM selection - populate body-type */
	$("#input_yom").change(function () {
		var bodyUrl = $("#input_bodyProxy").attr("rf.source");
		var bodyParams = $("#input_mm").val().replace(" ","%20") + '&yom=' + $("#input_yom option:selected").text()	
		var bodyElement = '#input_body'
		$("#input_body, #input_transmission, #input_desc").empty();
		$("#input_body, #input_transmission, #input_desc").attr('disabled','disabled');
		lists.getList(bodyUrl, bodyParams, bodyElement);

	})

	/* On Body selection - populate transmission */
	$("#input_body").change(function () {
		var tranmissionUrl = $("#input_transmissionProxy").attr("rf.source");
		var tranmissionParams = $("#input_mm").val().replace(" ","%20") + '&yom=' + $("#input_yom option:selected").text() + '&body_type=' + $("#input_body option:selected").text().replace(" ","%20")
		var tranmissionElement = '#input_transmission';
		$("#input_transmission, #input_desc").attr('disabled','disabled');
		lists.getList(tranmissionUrl, tranmissionParams, tranmissionElement);
	})

	/* On Transmission selection - populate model description */
	$("#input_transmission").change(function () {
		var descUrl = $("#input_descProxy").attr("rf.source");
		var descParams = $("#input_mm").val().replace(" ","%20") + '&yom=' + $("#input_yom option:selected").text() + '&body_type=' + $("#input_body option:selected").text().replace(" ","%20") + '&transmission=' + $("#input_transmission option:selected").text();
		var descElement = '#input_desc';
		$("#input_desc").attr('disabled','disabled');
		lists.getList(descUrl, descParams, descElement);
	})

	$("#input_desc").change(function () {
		$('#vehDescNoReg').val($("#input_desc option:selected").text());
		$("#foundVehicle").show();
	})

function ListResources(formFlowId) {

	this.getList = function(listUrl, params, element) {
		$(element).append("<option>Please wait...</option>")
		var data = {
			value: params,
			"rf.flowId": formFlowId,
		}
		$.ajax({
			url: listUrl,
			data: data,
			success: function(response) {
				populateSelect(response, element);
			},
			error: function() {
				alert("Failed lookup!")
			}
		})
	}
			
	function populateSelect(dataArray, element) {
		$(element).empty();
		$(element).append("<option>Please select</option>");

		//Remove undefined elements and populate select
		for (var i in dataArray) {
			var item = dataArray[i];
		    if ( typeof item[0] == 'undefined' ) {
		        dataArray.splice(i,1);
		   	}else{
			   	if(item[1]){
					$(element).append('<option value="' + item[0] + '">' + item[1] + '</option>');
				}else{
					$(element).append('<option value="' + item + '">' + item + '</option>');
				}
		   }
		}
		$(element).removeAttr('disabled');
	}
}