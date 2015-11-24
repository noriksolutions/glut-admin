'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Radium = require('radium');

class Unauthorized extends React.Component {

	onClick(ev) {
		window.location = 'http://localhost:3002/auth/google';
	}

	render() {
		return (
			<div style={styles.container}>
				<button onClick={this.onClick} style={styles.button}>
					Login with <i style={styles.i} className="mdi mdi-google"></i><span style={styles.google}>oogle</span></button>
			</div>
		);
	}
};

let styles = {
	container: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '10px',
		fontSize: '15px',
		fontFamily: "'Roboto', sans-serif"
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
