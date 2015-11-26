module.exports = {
	container: {
		display: 'flex',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		fontFamily: '\'Roboto\' sans-serif'
	},
	topBar: {
		position: 'absolute',
		top: '20px',
		right: '20px'
	},
	topLink: {
		':hover': {
			textDecoration: 'underline',
			cursor: 'pointer'
		}
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
