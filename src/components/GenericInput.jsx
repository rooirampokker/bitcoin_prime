import React, { Component } from 'react';

class genericInput extends Component {
    constructor(props){
        super(props);
        this.id        = props.id;
        this.class     = props.class;
        this.inputType = props.inputType;
        this.action    = props.action;
        this.state     = {
             value: '1'
                         }
    }



    render() {
        return (
            <>
                <input type      = {this.inputType}
                       id        = {this.id}
                       className = {this.class}
                       onChange  = {this.action}
                />
            </>
        );
    }
}

export default genericInput;