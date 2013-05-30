function Widget_scp_internal_users_profile() {

	var _this = this;
	var channelUserSelected = 'scp-internal-users-profile.user-selected';

	this.onReadyExtend = function() {
		pw.addListenerToChannel(this, channelUserSelected);
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
	}
}