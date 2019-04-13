import React, {Component} from 'react';
import Button  from '../components/Button';
import DatePicker from 'react-datepicker';
import { Row, Col } from 'react-bootstrap';
import { Glyphicon } from "react-bootstrap-tools";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import Moment from 'moment';


class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: new Date(),
            toDate: new Date()
        };
        this.apiUrl             = 'https://api.coindesk.com/v1/';
        this.formSubmit         = this.formSubmit.bind(this);
        this.handleFromDate     = this.handleFromDate.bind(this);
        this.handleToDate     = this.handleToDate.bind(this);
    }
/*
*
*/
    handleFromDate(fromDate) {
        console.log(fromDate);
        this.setState({fromDate: fromDate})
    }
/*
*
*/
    handleToDate(toDate) {
        this.setState({toDate: toDate})
    }
/*
*
 */
    fetchParams(formData, headers) {
        return {
            method: 'POST',
            body: formData,
            headers: headers,
            credentials: 'include'
        }
    }
/*
*
 */
    formSubmit(e) {
        let monthsApart = Moment(this.state.toDate).diff(Moment(this.state.fromDate), 'months', true);
        if (monthsApart > 6) {
         alert("please ensure that start and end dates are no more than 6 months apart");
        } else {
            alert(true);
        }
        // e.preventDefault();
        // let formData = new FormData();
        // let myHeaders = new Headers();
        // fetch(this.apiUrl,
        //       this.fetchParams(formData, myHeaders))
        //     .then(response => response.json())
        //     .then((response) => {
        //        console.log(response);
        //        this.setState({submitted: true});
        //     })
    }
/*
*
*/
    render() {
        return (
            <form>
                <Row>
                   <Col md={1}>
                       <label>From: </label>
                   </Col>
                   <Col md={11}>
                       <DatePicker
                            selected={this.state.fromDate}
                            onChange={this.handleFromDate}
                            id='fromDate'
                            className='form-control'/>
                   </Col>
                </Row>
                <Row>
                    <Col md={1}>
                        <label>To: </label>
                    </Col>
                    <Col md={11}>
                        <DatePicker
                            selected={this.state.toDate}
                            onChange={this.handleToDate}
                            id='toDate'
                            className='form-control'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Button
                            title  = 'Submit'
                            type   = 'button'
                            action = {this.formSubmit}
                        />
                    </Col>
                </Row>
            </form>
        );
    }
}

export default FormContainer;