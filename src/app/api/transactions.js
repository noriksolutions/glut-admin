module.exports = {
	set: function(api) {
		api.transactions = {
			list: function(options) {
				return api._get('/transactions', options);
			},
			one: function(options) {
				let id = options._id || options.id;
				return api._get('/transactions/' + id);
			}
		};
	}
};
