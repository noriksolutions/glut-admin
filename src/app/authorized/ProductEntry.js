'use strict';

let React = require('react');
let api = require('../api');
let _ = require('lodash');
let mainStyles = require('../styles/main');
let formStyles = require('../styles/form');
let styles = require('./styles/productEntry');
let Radium = require('radium');
let Grid = require('react-bootstrap').Grid;
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;
let Input = require('react-bootstrap').Input;
let Button = require('react-bootstrap').Button;
let Modal = require('react-bootstrap').Modal;

class ProductEntry extends React.Component {

	constructor(props) {
		super(props);
		this.state = { product: {} };
	}

	componentDidMount() {
		var newProduct = {};
		if (this.props.product)
			newProduct = _.clone(this.props.product);
		this.setState({ product: newProduct });
	}

	componentWillReceiveProps(nextProps) {
		var newProduct = {};
		if (nextProps.product)
			newProduct = _.clone(nextProps.product);
		this.setState({ product: newProduct });
	}

	changeEntry(stateName, ev) {
		var product = this.state.product;
		if (stateName === 'digital' || stateName === 'available')
			product[stateName] = !!ev.target.checked;
		else if (stateName === 'tags') {
			let tagValue = ev.target.value;
			tagValue = tagValue.replace(/\s\s+/g, ' ').trim();
			let tagArray = tagValue.split(',');
			for (let i = 0; i < tagArray.length; i++) {
				tagArray[i] = tagArray[i].trim();
			}
			product.tags = tagArray;
		}
		else if (stateName === 'weight.value') {
			product.weight = product.weight || {};
			product.weight.value = parseFloat(ev.target.value);
		}
		else if (stateName === 'weight.unit') {
			product.weight = product.weight || {};
			product.weight.unit = ev.target.value;
		}
		else if (/^dimensions\.(length|width|height)$/.test(stateName)) {
			product.dimensions = product.dimensions || {};
			product.dimensions[stateName.split('.')[1]] = parseFloat(ev.target.value);
		}
		else if (stateName === 'dimensions.unit') {
			product.dimensions = product.dimensions || {};
			product.dimensions.unit = ev.target.value;
		}
		else
			product[stateName] = ev.target.value;
		this.setState({ product });
	}

	translateTagsValue() {
		let tags = _.get(this, 'state.product.tags', []);
		if (tags.length)
			return tags.join(', ');
		return '';
	}

	setConfirmDelete() {
		this.setState({ confirmDelete: true });
	}

	cancelConfirmDelete() {
		this.setState({ confirmDelete: false });
	}

	deleteProduct() {
		let that = this;
		api.products.remove(this.state.product)
		.then(function() {
			that.props.productChanged();
		})
		.catch(function() {
			window.alert('Oops an error occurred.');
		});
	}

	saveProduct() {
		let that = this;
		if (that.state.blockSave) return;
		that.setState({ blockSave: true });
		let method = (this.state.product._id) ? 'update' : 'add';
		api.products[method](this.state.product)
		.then(function() {
			that.props.productChanged();
			that.setState({ blockSave: false });
		})
		.catch(function() {
			window.alert('Oops an error occurred.');
			that.setState({ blockSave: false });
		});
	}

	render() {
		let button = null;
		if (this.state.product._id)
			button = (<Button onClick={this.setConfirmDelete.bind(this)} bsStyle="danger pull-right">Delete</Button>);
		return (
			<div style={styles.productEntry}>
				<Modal show={!!this.state.confirmDelete}>
					<Modal.Header>
						<Modal.Title>Confirm Delete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to delete <strong>{this.state.product.name}</strong>?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.cancelConfirmDelete.bind(this)}>Cancel</Button>
						<Button onClick={this.deleteProduct.bind(this)} bsStyle="danger">Yes, Delete it.</Button>
					</Modal.Footer>
				</Modal>
				<Row>
					<Col>
						<Input type="text" value={this.state.product.name}
							placeholder="Enter Product Name"
							label="Product Name"
							onChange={this.changeEntry.bind(this, 'name')} />
					</Col>
					<Col>
						<Input type="textarea" value={this.state.product.description}
							placeholder="Enter Description"
							label="Description"
							onChange={this.changeEntry.bind(this, 'description')} />
					</Col>
				</Row>
				<Row>
					<Col xs={6}>
						 <Input type="checkbox" label="Digital"
						 checked={!!this.state.product.digital}
						 onChange={this.changeEntry.bind(this, 'digital')} />
					</Col>
					<Col xs={6}>
						<Input type="text" value={this.state.product.downloadUrl}
							placeholder="https://..."
							label="Download URL"
							onChange={this.changeEntry.bind(this, 'downloadUrl')} />
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<Input type="text" value={this.state.product.quantity}
							placeholder="x5"
							label="Quantity"
							onChange={this.changeEntry.bind(this, 'quantity')} />
					</Col>
					<Col md={3}>
						<Input type="text" value={this.state.product.msrp}
							placeholder="$0.00"
							label="MSRP"
							onChange={this.changeEntry.bind(this, 'msrp')} />
					</Col>
					<Col md={3}>
					<Input type="text" value={this.state.product.salePrice}
						placeholder="$0.00"
						label="Sale Price"
						onChange={this.changeEntry.bind(this, 'salePrice')} />
					</Col>
					<Col md={3}>
						<Input type="text" value={this.state.product.wholesale}
							placeholder="$0.00"
							label="Wholesale"
							onChange={this.changeEntry.bind(this, 'wholesale')} />
					</Col>
				</Row>
				<Row>
					<Col>
						<Input type="text" value={this.translateTagsValue()}
							placeholder="shoes, sports, atheletic"
							label="Tags"
							onChange={this.changeEntry.bind(this, 'tags')} />
					</Col>
				</Row>
				<Row>
					<Col xs={4}>
						<Input type="text" value={this.state.product.upc}
							placeholder="Enter UPC"
							label="UPC"
							onChange={this.changeEntry.bind(this, 'upc')} />
					</Col>
					<Col xs={4}>
						<Input type="checkbox" label="Available"
						checked={!!this.state.product.available}
						onChange={this.changeEntry.bind(this, 'available')} />
					</Col>
				</Row>
				<Row>
					<Col xs={4}>
						<Input type="text" value={_.get(this,'state.product.weight.value', 0)}
							placeholder="0"
							label="Weight Value"
							onChange={this.changeEntry.bind(this, 'weight.value')} />
					</Col>
					<Col xs={4}>
						<Input type="text" value={_.get(this,'state.product.weight.unit', '')}
							placeholder="Kg"
							label="Weight Unit"
							onChange={this.changeEntry.bind(this, 'weight.unit')} />
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<Input type="text" value={_.get(this,'state.product.dimensions.length', 0)}
							placeholder="0"
							label="Length"
							onChange={this.changeEntry.bind(this, 'dimensions.length')} />
					</Col>
					<Col xs={3}>
						<Input type="text" value={_.get(this,'state.product.dimensions.width', 0)}
							placeholder="0"
							label="Width"
							onChange={this.changeEntry.bind(this, 'dimensions.width')} />
					</Col>
					<Col xs={3}>
						<Input type="text" value={_.get(this,'state.product.dimensions.height', 0)}
							placeholder="0"
							label="Height"
							onChange={this.changeEntry.bind(this, 'dimensions.height')} />
					</Col>
					<Col xs={3}>
						<Input type="text" value={_.get(this,'state.product.dimensions.unit', 0)}
							placeholder="cm"
							label="Unit"
							onChange={this.changeEntry.bind(this, 'dimensions.height')} />
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<Button onClick={this.saveProduct.bind(this)} style={styles.saveButton} bsStyle="primary pull-right">Save</Button>
						{button}
					</Col>
				</Row>
			</div>
		);
	}
};

module.exports = Radium(ProductEntry);
