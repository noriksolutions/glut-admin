'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let api = require('../api');
let _ = require('lodash');
let styles = require('./styles/products');
let mainStyles = require('../styles/main');
let Radium = require('radium');
let Header = require('../components/Header');
let ProductEntry = require('./ProductEntry');
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;

class Products extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: [],
			mode: 'list'
		};
	}

	loadProducts() {
		var that = this;
		that.setState({ loading: true });
		api.products.list()
		.then(function(json) {
			that.setState({ loading: false });
			that.setState({ products: json });
		})
		.catch(function(err) {
			that.setState({ loading: false });
		});
	}

	productChanged() {
		this.state.mode = 'list';
		this.loadProducts();
	}

	componentDidMount() {
		this.loadProducts();
	}

	newClick() {
		this.setState({ mode: 'new', product: undefined });
	}

	backClick() {
		this.setState({ mode: 'list', product: undefined });
	}

	productClick(product) {
		this.setState({ mode: 'edit', product: product });
	}

	productsRender() {
		let results = <div style={styles.noResults}>No results</div>;
		let that = this;
		if (this.state.loading)
			results = <div style={styles.loading}>...loading</div>;
		if (this.state.products.length)
			results = _.map(this.state.products, function(product) {
				return (
					<Row onClick={that.productClick.bind(that, product)} key={product._id + '_row'}>
						<Col><div key={product._id} style={styles.product}>{product.name}, ${product.msrp}, x{product.quantity}</div></Col>
					</Row>);
			});
		return (
			<div>
				<Header h1="Products" newLabel="Product" newClick={this.newClick.bind(this)} />
				<div style={styles.products}>
					{results}
				</div>
			</div>
		);
	}

	editProductRender(product) {
		return (
			<div>
				<Header h1="Edit Product" backClick={this.backClick.bind(this)} />
				<ProductEntry productChanged={this.productChanged.bind(this)} product={this.state.product} />
			</div>
		);
	}

	newProductRender() {
		return (
			<div>
				<Header h1="New Product" backClick={this.backClick.bind(this)} />
				<ProductEntry productChanged={this.productChanged.bind(this)} />
			</div>
		);
	}

	render() {
		if (this.state.mode === 'new')
			return this.newProductRender();
		else if (this.state.mode === 'edit')
			return this.editProductRender();
		else
			return this.productsRender();
	}
}

module.exports = Radium(Products);
