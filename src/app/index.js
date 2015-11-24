'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Authorized = require('./authorized/Authorized');
let Unauthorized = require('./unauthorized/Unauthorized');

let App = React.createClass({
	render: function() {
		let View = Unauthorized;

		if (window.localStorage.authorized)
			View = Authorized;

		return (<View />);
	}
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
