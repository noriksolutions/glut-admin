'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Radium = require('radium');
let _ = require('lodash');
let mainStyles = require('../styles/main');
let config = require('../utils/config');

class Unauthorized extends React.Component {

	onClick(ev) {
		let baseUrl = _.get(config, 'athu.baseUrl');
		if (baseUrl)
			window.location = baseUrl + '/auth/google';
		else
			window.alert('Oops, an error occurred.');
	}

	render() {
		return (
			<div style={[mainStyles.container, styles.intro]}>
				<button onClick={this.onClick.bind(this)} style={mainStyles.button}>
					Login with <i style={styles.i} className="mdi mdi-google"></i>
					<span style={styles.google}>oogle</span></button>
			</div>
		);
	}
};

let styles = {
	intro: {
		backgroundImage: 'url(\'/img/intro-bg.jpg\')',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	},
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
