'use strict';

let React = require('react');
let Header = require('../components/Header');

class Users extends React.Component {

	newClick() {
		console.log('new click');
	}

	render() {
		return (
			<div>
				<Header h1="Users" newClick={this.newClick} newLabel="User" />
			</div>
		);
	}
}

module.exports = Users;
