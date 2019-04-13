import React, { Component } from 'react';
import FormContainer from './containers/Form';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
/*
*
*/
  render() {
    return (
      <div className="container">
        <FormContainer/>

      </div>
    );
  }
}

export default App;
