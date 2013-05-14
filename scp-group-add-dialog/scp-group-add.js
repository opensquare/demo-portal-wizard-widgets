function Widget_scp_group_add_dialog() {

	var _this = this;
	var channelGroupAdded = 'scp-group-add';

	this.onReadyExtend = function() {

		$('.cancel-button', _this.$widgetDiv).click(function() {
			$('#modalPopupContainer').hide();
			pw.notifyChannelOfEvent(channelGroupAdded, {success:false});
		});

		$('.ok-button', _this.$widgetDiv).click(function() {
			var newRoleName = $('input.addGroup', _this.$widgetDiv).val();
			var role = {"name":newRoleName};
			$.ajax({
				type:"POST",
				url:"proxy/security/role/add",
				data:JSON.stringify(role),
				dataType:"json",
				contentType:"application/json"}).done(function(savedRole) {
					$('#modalPopupContainer').hide();
					pw.notifyChannelOfEvent(channelGroupAdded, {"success":true, "role":savedRole});
				});
		});
	};
}