'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Authorized = require('./authorized/Authorized');
let Unauthorized = require('./unauthorized/Unauthorized');
let querystring = require('querystring');

class App extends React.Component {
	render() {
		let View = Unauthorized;

		let qs = {};
		if (window.location.search)
			qs = querystring.parse(window.location.search.substr(1));

		if (qs.jwt)
			View = Authorized;

		return (<View />);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
