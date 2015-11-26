let request = require('superagent');
let querystring = require('querystring');
let getToken = require('../utils/getToken');
let config = require('../config');
let _ = require('lodash');

function getQs(options) {
	if (!options)
		return '';
	let qs = querystring.stringify(options);
	if (qs) return '?' + qs;
	return '';
}

function getRequest(url, options, verb) {
	let useQs = ['get', 'del'].indexOf(verb) > -1 ? true : false;
	let qs = useQs ? getQs(options) : '';
	let baseUrl = _.get(config, 'api.baseUrl', '');
	let newUrl = baseUrl + url + qs;
	let promise = new Promise(function(resolve, reject) {
		let req = request[verb](newUrl).set('Authorization', 'JWT ' + getToken());
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
	_del: function(url, options) {
		return getRequest(url, options, 'del');
	}
};

require('./products').set(api);
require('./users').set(api);
require('./transactions').set(api);
require('./variants').set(api);

module.exports = api;
