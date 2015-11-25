let request = require('superagent');
let querystring = require('querystring');
let getToken = require('../utils/getToken');

function setJwt(options) {
	options = options || {};
	options.jwt = getToken();
	return options;
}

function getQs(options) {
	let qs = querystring.stringify(options);
	if (qs) return '?' + qs;
	return '';
}

function getRequest(url, options, verb) {
	options = setJwt(options);
	let useQs = ['get', 'del'].indexOf(verb) > -1 ? true : false;
	let qs = useQs ? getQs(options) : '';
	let newUrl = url + qs;
	let promise = new Promise(function(resolve, reject) {
		let req = request[verb](url);
		if (!useQs)
			req = req.set('Content-Type', 'application/json').send(options);
		req.end(function(err, res) {
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

let api = {
	_get: function(url, options) {
		return getRequest(url, options, 'get');
	},
	_post: function(url, options) {
		return getRequest(url, options, 'post');
	},
	_put: function(url, options) {
		return getRequest(url, options, 'put');
	},
	_delete: function(url, options) {
		return getRequest(url, options, 'del');
	}
};

require('./products').set(api);

module.exports = api;
