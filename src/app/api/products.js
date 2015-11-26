module.exports = {
	set: function(api) {
		api.products = {
			list: function(options) {
				return api._get('/products', options);
			},
			one: function(options) {
				let id = options._id || options.id;
				return api._get('/products/' + id);
			},
			add: function(options) {
				return api._post('/products', options);
			},
			update: function(options) {
				let id = options._id || options.id;
				return api._put('/products/' + id, options);
			},
			remove: function(options) {
				let id = options._id || options.id;
				return api._del('/products/' + id);
			}
		};
	}
};
