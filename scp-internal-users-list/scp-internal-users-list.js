function Widget_scp_internal_users_list() {

	var _this = this;
	var channelUsersLoaded = 'scp-internal-users.users-loaded';

	this.onReadyExtend = function() {
		pw.addListenerToChannel(this, channelUsersLoaded);
		_this.$ul = $('ul', _this.$widgetDiv);

		$('.usersList', _this.$widgetDiv).on('change', 'input[type=radio]', function() {
			var userId = $(this).closest('li').data('user-id');
			var selectedUser = getUser(userId);
			pw.notifyChannelOfEvent('scp-internal-users-profile.user-selected', {user: user});
		});
	};

	this.handleEvent = function(channel, event) {
		if (channel === channelUsersLoaded) {
			_this.users = event.users;
			displayUsers(event.users);
		}
	};

	function displayUsers(users) {
		_this.$ul.empty();
		for (var i = 0; i < users.length; i++) {
			$li = $('<li><input type="radio" name="user">' + users[i].displayName + '</li>');
			$li.data('user-id', users[i].id);
			_this.$ul.append($li);
		}
	}

	function getUser(userId) {
		for (var i = 0; i < _this.users.length; i++) {
			if (_this.users[i].id == userId) {
				return _this.users[i];
			}
		}
		return null;
	}
}