module.exports = {
	set: function(api) {
		api.users = {
			verifyAdmin: function() {
				return api._get('/users/verify-admin');
			}
		};
	}
};
