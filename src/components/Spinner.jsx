import React, {Component} from 'react';
import Loader from 'react-loader-spinner';

class Spinner extends Component {

    render() {
        return(
            <Loader
                type="Bars"
                color="#00BFFF"
                height="50"
                width="300"
            />
        );
    }
}

export default Spinner;