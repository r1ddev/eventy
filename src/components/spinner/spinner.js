import React from 'react';
import "./spinner.css"
class Spinner extends React.Component {

    render() {

        if (this.props.big) {
            return (
                <div class="d-flex justify-content-center my-spinner-big">
                    <div class="spinner-border text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        return (
            <div class="d-flex justify-content-center my-spinner">
                <div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}



export default Spinner;
