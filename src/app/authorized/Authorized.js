'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let mainStyles = require('../styles/main');
let Radium = require('radium');
let lodash = require('lodash');

let viewLookup = {
	Dashboard: require('./Dashboard'),
	Transactions: require('./Transactions'),
	Users: require('./Users'),
	Products: require('./Products'),
	Variants: require('./Variants')
};

class Authorized extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			active: 'Dashboard'
		};
	}

	setChoice(active) {
		this.setState({ active: active });
	}

	render() {

		let state = this.state;

		function getStyle(link) {
			let style = [styles.menuLink];
			if (state.active === link)
				style.push(styles.activeMenuLink);
			return style;
		}

		let View = viewLookup[this.state.active];

		return (
			<div style={styles.container}>
				<div style={styles.left}>
					<div style={styles.logo}></div>
					<a key="Dashboard" style={getStyle('Dashboard')} onClick={this.setChoice.bind(this, 'Dashboard')}>Dashboard</a>
					<a key="Transactions" style={getStyle('Transactions')} onClick={this.setChoice.bind(this, 'Transactions')}>Transactions</a>
					<a key="Users" style={getStyle('Users')} onClick={this.setChoice.bind(this, 'Users')}>Users</a>
					<a key="Products" style={getStyle('Products')} onClick={this.setChoice.bind(this, 'Products')}>Products</a>
					<a key="Variants" style={getStyle('Variants')} onClick={this.setChoice.bind(this, 'Variants')}>Variants</a>
				</div>
				<div style={styles.content}>
					<View />
				</div>
			</div>
		);
	}
};

let styles = {
	container: {
		display: 'flex',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		fontFamily: '\'Roboto\' sans-serif'
	},
	left: {
		backgroundColor: '#efefef',
		width: '200px',
		height: '100vh'
	},
	content: {
		fontFamily: '\'Roboto\' sans-serif',
		padding: '20px'
	},
	logo: {
		backgroundImage: 'url(\'/img/logo.png\')',
		backgroundSize: '50%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		width: '100%',
		paddingBottom: '50%',
		marginBottom: '20px'
	},
	menuLink: {
		display: 'block',
		fontFamily: '\'Roboto\' sans-serif',
		fontSize: '20px',
		padding: '10px',
		color: '#333',
		':hover': {
			backgroundColor: '#f9f',
			color: '#333'
		},
		cursor: 'pointer'
	},
	activeMenuLink: {
		color: '#fff',
		backgroundColor: '#f7f'
	}
};

module.exports = Radium(Authorized);
