import React from 'react';
import './error.scss'

class Error extends React.Component {

	render() {
		return (
			<div style={{ backgroundColor: '#ffe800' }} className="min-vh-100 flex-center">
				<div class="alert alert-success" role="alert">
					<div className='alert-link'>404</div>
				</div>
			</div>
		)
	}
}

export default Error;