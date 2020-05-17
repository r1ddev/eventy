import React from 'react';
import "./frame.css"
import Menu from '../menu';
class Frame extends React.Component {

    render() {


        return (
            <div id="frame">
                <Menu />
                <div className="frame-container">
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}



export default Frame;
