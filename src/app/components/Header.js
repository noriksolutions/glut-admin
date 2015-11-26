'use strict';

let React = require('react');
let mainStyles = require('../styles/main');
let Radium = require('radium');
let styles = require('./styles/header');

class Header extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let backLink = null;
		if (this.props.backClick)
			backLink = (
				<a style={styles.backLink} onClick={this.props.backClick}>
					<i className="mdi mdi-arrow-left-bold-circle"></i> Back
				</a>
			);
		let newLink = null;
		if (this.props.newClick)
			newLink = (
				<a style={styles.newLink} onClick={this.props.newClick}>
					<i className="mdi mdi-plus-circle"></i> New {this.props.newLabel}
				</a>
			);
		return (
			<div style={styles.header}>
				{backLink}
				<h1 style={[mainStyles.h1, styles.h1]}>{this.props.h1}</h1>
				{newLink}
			</div>
		);
	}

}

module.exports = Radium(Header);
