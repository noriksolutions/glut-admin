'use strict';

let request = require('superagent');

module.exports = {
	getJson: function(url) {
		var promise = new Promise(function(resolve, reject) {
			request.get(url)
			.end(function(err, res) {
				if (err) {
					reject(err);
					return;
				}
				try {
					let json = JSON.parse(res.text);
					resolve(json);
				} catch(ex) {
					reject(ex);
				}
			});
		});
		return promise;
	}
};
