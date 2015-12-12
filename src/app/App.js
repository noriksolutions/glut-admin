'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Authorized = require('./authorized/Authorized');
let Unauthorized = require('./unauthorized/Unauthorized');
let getToken = require('./utils/getToken');
let _ = require('lodash');
let ajax = require('./utils/ajax');
let config = require('./config');
let dispatcher = require('./utils/dispatcher');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			authorized: !!getToken()
		};
	}

	onLogout() {
		window.history.replaceState({}, document.title, '/');
		this.setState({ authorized: false });
	}

	componentDidMount() {
		// set config singleton data
		let that = this;
		ajax.getJson('/config')
		.then(function(json) {
			_.assign(config, json);
			dispatcher.emit('config-ready');
		})
		.catch(function(err) {
			window.alert('Could not get configuration.');
		});
		if (!this.boundOnLogout)
			this.boundOnLogout = this.onLogout.bind(this);
		dispatcher.on('logout', this.boundOnLogout);
	}

	componentWillUnmount() {
		dispatcher.off('logout', this.boundOnLogout);
	}

	render() {
		let View = Unauthorized;
		if (this.state.authorized)
			View = Authorized;
		return (
			<View />
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
