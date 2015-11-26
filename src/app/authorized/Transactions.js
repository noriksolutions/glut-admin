'use strict';

let React = require('react');
let Header = require('../components/Header')

class Transactions extends React.Component {
	render() {
		return (
			<div>
				<Header h1="Transactions" />
			</div>
		);
	}
}

module.exports = Transactions;
