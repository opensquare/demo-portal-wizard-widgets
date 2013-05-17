function Widget_cp_note_alert() {

	this.onReadyExtend = function() {
		
		var url = document.URL;
		var policyId = url.substring(url.lastIndexOf("/") + 1);
     	policyId = policyId.substring(policyId.lastIndexOf("#") + 1);

		$('.snooze').click(function(){
			window.location.replace(url);
		});

		$('.dismiss').click(function(){
			var alertId = $('#alertContent').attr('alertId');
			$.ajax({url: 'proxy/scribe/' + alertId, type: 'DELETE'});
			window.location.replace(url);
		});

		$.ajax(	{url: "proxy/scribe/notes" + '?key=' + policyId,
          type: 'GET',
          success: function(notesArray, status, xhr) {
          	var $userAlert = ""; 
          	var alertId;        
	          for (var i = 0; i < notesArray.length; i++) {

			      if(notesArray[i].group === "ALERT"){
			      	$userAlert = $userAlert + notesArray[i].message
			      	alertId = notesArray[i].id;
			      }
			  }

			 if(notesArray.length != 0){
			 	 $('#alertContent').attr('alertId', alertId);
				 $('#alertContent').append($userAlert);
			 	 window.location.href = "#userAlert";
			 }

          }
		});  
	}
}

