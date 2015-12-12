'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let api = require('../api');
let _ = require('lodash');
let styles = require('./styles/products');
let mainStyles = require('../styles/main');
let Radium = require('radium');
let Header = require('../components/Header');
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;

class Transactions extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			mode: 'list'
		};
	}

	loadTransactions() {
		var that = this;
		that.setState({ loading: true });
		api.transations.list()
		.then(function(json) {
			that.setState({ loading: false });
			that.setState({ transactions: json });
		})
		.catch(function(err) {
			that.setState({ loading: false });
		});
	}

	transactionsChanged() {
		this.loadTransactions.mode = 'list';
		this.loadProducts();
	}

	componentDidMount() {
		this.loadTransactions();
	}

	backClick() {
		this.setState({ mode: 'list', product: undefined });
	}

	transactionClick(transaction) {
		this.setState({ mode: 'view', transaction: transaction });
	}

	transactionRender() {
		return (
			<div>
				Transaction View
			</div>
		);
	}

	transactionsRender() {
		let results = <div style={styles.noResults}>No results</div>;
		let that = this;
		if (this.state.loading)
			results = <div style={styles.loading}>...loading</div>;
		if (this.state.transactions.length)
			results = _.map(this.state.transactions, function(transaction) {
				return (
					<Row onClick={that.transactionClick.bind(that, transaction)} key={transaction._id + '_row'}>
						<Col><div key={transaction._id} style={styles.transaction}>{transaction.name}</div></Col>
					</Row>);
			});
		return (
			<div>
				<Header h1="Transactions" />
				<div style={styles.transactions}>
					{results}
				</div>
			</div>
		);
	}

	render() {
		if (this.state.mode === 'view')
			return this.transactionRender();
		else
			return this.transactionsRender();
	}
}

module.exports = Radium(Transactions);
