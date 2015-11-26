'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Authorized = require('./authorized/Authorized');
let Unauthorized = require('./unauthorized/Unauthorized');
let getToken = require('./utils/getToken');
let _ = require('lodash');
let ajax = require('./utils/ajax');
let config = require('./utils/config');

class App extends React.Component {

	componentDidMount() {
		// set config singleton data
		let that = this;
		ajax.getJson('/config')
		.then(function(json) {
			_.assign(config, json);
		})
		.catch(function(err) {
			window.alert('Could not connect to application.');
		});
	}

	render() {
		let View = Unauthorized;
		let jwt = getToken();
		if (jwt)
			View = Authorized;
		return <View />;
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
