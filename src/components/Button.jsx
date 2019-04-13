import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
       super(props);
       this.title = props.title ? props.title : 'Click Me';
       this.action = props.action;
       this.state = {

       }
    }

    render () {
        return (
            <>
                <button
                    value='submit'
                    type='submit'
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