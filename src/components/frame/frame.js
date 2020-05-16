import React from 'react';
import "./frame.css"
import Menu from '../menu';
class Frame extends React.Component {

    render() {


        return (
            <div id="frame">
                <Menu />
                {
                    this.props.children
                }
            </div>
        )
    }
}



export default Frame;
