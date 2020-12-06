import React from 'react';
import "./spinner-button.scss"

import posed from 'react-pose';
import Spinner from "../../components/spinner";

const Box = posed.div({
    open: { height: 'auto', opacity: 1, marginRight: '40px' },
    closed: { height: 0, opacity: 0, marginRight: 0 },
});

class SpinnerButton extends React.Component {

    render() {
		return (
			<button
				id="spinner-button"
				{...this.props}>

				<Box pose={this.props.spinner ? "open" : "closed"}>
					<Spinner />
				</Box>                                
				
				{this.props.children}
			</button>
		)
	}
}

export default SpinnerButton;