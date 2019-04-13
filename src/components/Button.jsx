import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
       super(props);
       this.title = props.title ? props.title : 'Click Me';
       this.action = props.action;
       this.type = props.type;
       this.state = {

       }
    }

    render () {
        return (
            <>
                <button
                    value='submit'
                    type={this.type}
                    id='submit'
                    onClick={this.action}
                    className='btn btn-primary'>
                    {this.title}
                </button>
                <br/>
            </>
        );
    }
}
export default Button;