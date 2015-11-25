'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Radium = require('radium');
let ajax = require('../utils/ajax');
let _ = require('lodash');
let mainStyles = require('../styles/main');

class Unauthorized extends React.Component {

	onClick(ev) {
		let baseUrl = _.get(this, 'state.baseUrl');
		if (baseUrl)
			window.location = baseUrl + '/auth/google';
		else
			window.alert('Oops, an error occurred.');
	}

	componentDidMount() {
		let that = this;
		ajax.getJson('./api/config')
		.then(function(json) {
			that.setState({ baseUrl: json.athu.baseUrl });
		})
		.catch(function(err) {
			window.alert('Could not connect to application.');
		});
	}

	render() {
		return (
			<div style={mainStyles.container}>
				<button onClick={this.onClick.bind(this)} style={mainStyles.button}>
					Login with <i style={styles.i} className="mdi mdi-google"></i>
					<span style={styles.google}>oogle</span></button>
			</div>
		);
	}
};

let styles = {
	google: {
		color: 'rgb(213,15,37)'
	},
	i: {
		fontSize: '25px',
		color: 'rgb(213,15,37)',
		position: 'relative',
		left: 3
	}
};

module.exports = Radium(Unauthorized);
