import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
       super(props);
       this.title  = props.title ? props.title : 'Click Me';
       this.action = props.action;
       this.type   = props.type;
    }

    render () {
        return (
            <>
                <button
                    value     = 'submit'
                    id        = 'submit'
                    type      = {this.type}
                    onClick   = {this.action}
                    className = 'btn btn-primary'>
                    {this.title}
                </button>
                <br/>
            </>
        );
    }
}
export default Button;