import React, {Component} from 'react';
import Button  from '../components/Button';
import DatePicker from 'react-datepicker';
import { Row, Col } from 'react-bootstrap';
import { Glyphicon } from "react-bootstrap-tools";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';


class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        };
        this.handleChange       = this.handleChange.bind(this);

        this.apiUrl             = 'https://api.coindesk.com/v1/';
        this.formSubmit         = this.formSubmit.bind(this);
        this.genericInputAction = this.genericInputAction.bind(this);
    }
/*
*
*/
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
/*
*
*/
    genericInputAction(e) {
        this.setState({genericInputValue: e.target.value});
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
        e.preventDefault();
        let formData = new FormData();
        let myHeaders = new Headers();
        fetch(this.apiUrl,
              this.fetchParams(formData, myHeaders))
            .then(response => response.json())
            .then((response) => {
               console.log(response);
               this.setState({submitted: true});
            })
    }
/*
*
*/
    render() {
        return (
            <>
                <Row>
                   <Col md={1}>
                       <label>From: </label>
                   </Col>
                   <Col md={11}>
                       <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            className='form-control'
                            aria-describedby='fromCalendar'
                            aria-label='fromCalendar'/>
                   </Col>
                </Row>
                <Row>
                    <Col md={1}>
                        <label>To: </label>
                    </Col>
                    <Col md={11}>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleChange}
                            className='form-control'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Button
                            title  = 'Submit'
                            action = {this.formSubmit}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

export default FormContainer;