function Widget_scp_internal_users_profile() {

	var _this = this;
	var channelUserSelected = 'scp-internal-users-profile.user-selected';

	this.onReadyExtend = function() {
		pw.addListenerToChannel(this, channelUserSelected);

		$('.change-password-button', _this.$widgetDiv).click(function() {
			$("#modalPopupContent").html("<div class='widget' name='scp-internal-users-password-change'></div>");
			pw.mount($("#modalPopupContent .widget:first"));
			$("#modalPopupContainer").show();
		});

		$('.edit-button', _this.$widgetDiv).click(function() {
			$("#modalPopupContent").html("<div class='widget' name='scp-internal-users-edit'></div>");
			pw.mount($("#modalPopupContent .widget:first"));
			$("#modalPopupContainer").show();
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelUserSelected) {
			_this.user = event.user;
			displayUser(event.user);
		}
	};

	function displayUser(user) {
		$('.username', _this.$widgetDiv).html(user.username);
		$('.displayName', _this.$widgetDiv).html(user.displayName);
		var groups = "";
		for (var i = 0; i < user.roles.length; i++) {
			if (groups.length > 0) {
				groups += ", ";
			}
			groups += user.roles[i].name;
		}
		if (groups.length === 0) {
			groups = "-";
		}
		$('.groups', _this.$widgetDiv).html(groups);
	}
}