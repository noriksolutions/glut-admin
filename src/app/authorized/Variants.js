'use strict';

let React = require('react');
let Header = require('../components/Header');

class Variants extends React.Component {

		newClick() {
			console.log('new click');
		}

		render() {
			return (
				<div>
					<Header h1="Variants" newClick={this.newClick} newLabel="Variant" />
				</div>
			);
		}
}

module.exports = Variants;
