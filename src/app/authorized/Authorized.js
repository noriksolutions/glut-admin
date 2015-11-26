'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let mainStyles = require('../styles/main');
let styles = require('./styles/authorized');
let Radium = require('radium');
let lodash = require('lodash');
let api = require('../api');
let dispatcher = require('../utils/dispatcher');
let config = require('../config');

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

	componentDidMount() {
		dispatcher.on('config-ready', function() {
			api.users.verifyAdmin()
			.then(function() {
				// noop
			})
			.catch(function() {
				dispatcher.emit('logout');
			});
		});
	}

	logout() {
		dispatcher.emit('logout');
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
				<div style={styles.topBar}>
					<a style={styles.topLink} onClick={this.logout.bind(this)}><i className="mdi mdi-lock"></i> logout</a>
				</div>
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



module.exports = Radium(Authorized);
