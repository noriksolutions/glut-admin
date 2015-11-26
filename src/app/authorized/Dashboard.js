'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let mainStyles = require('../styles/main');
let Radium = require('radium');

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to Glut Admin!</h1>
				<p>You can administer your ecommerce data through here.</p>
				<p>See the menu to the left.</p>
			</div>
		);
	}
}

module.exports = Radium(Dashboard);
