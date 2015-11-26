'use strict';

let querystring = require('querystring');

module.exports = function getToken() {
	let qs = {};
	if (window.location.search)
		qs = querystring.parse(window.location.search.substr(1));
	return qs.jwt;
};
