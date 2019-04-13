import React, {Component} from 'react';
import Button  from '../components/Button';
import DatePickerComp from '../components/DatePickerComp';
import { Row, Col, Card } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import Moment from 'moment';



class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.apiUrl             = 'https://rest.coinapi.io/';
        this.setSelectedDate    = this.setSelectedDate.bind(this);
        this.formSubmit          = this.formSubmit.bind(this);
        this.state = {
            toDate: new Date(),
            fromDate: new Date()
        }
    }
/*
*
*/
    setSelectedDate(selectedDate, dateType) {
        this.setState({[dateType]: selectedDate});
    }
/*
*
*/
    formSubmit(e) {
        console.log(this.validateDateSelection())
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
    validateDateSelection() {
        let monthsApart = Moment(this.state.toDate).diff(Moment(this.state.fromDate), 'months', true);
        if (monthsApart > 6) {
        alert("please ensure that start and end dates are no more than 6 months apart");
        return false;
        } else {
            alert("pass dates to API for processing...");
            return true;
        }
    }
/*
*
*/
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                           Specify a to and from date
                    </Card.Title>
                        <form>
                            <DatePickerComp
                                id={'fromDate'}
                                label={'From: '}
                                action={this.setSelectedDate}
                            />
                            <DatePickerComp
                                id={'toDate'}
                                label={'To: '}
                                action={this.setSelectedDate}
                            />
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
                </Card.Body>
            </Card>
        );
    }
}

export default FormContainer;