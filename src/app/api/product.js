module.exports = {
	set: function(api) {
		api.products = {
			list: function(options) {
				api._get('/products', options);
			},
			one: function(options) {
				let id = options.id;
				delete options.id;
				api._get('/products/' + id, options);
			}
		};
	}
};
