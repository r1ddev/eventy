import React from 'react';
import "./spinner.scss"
class Spinner extends React.Component {

    render() {

        if (this.props.big) {
            return (
                <div className="d-flex justify-content-center my-spinner-big">
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="d-flex justify-content-center my-spinner">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}



export default Spinner;
