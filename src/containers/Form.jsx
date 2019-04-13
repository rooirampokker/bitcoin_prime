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
        this.apiUrl             = 'https://rest.coinapi.io';
        this.currency           = 'BITSTAMP_SPOT_BTC_USD';
        //GET
        this.getTradePath       = '';
        this.setSelectedDate    = this.setSelectedDate.bind(this);
        this.formSubmit         = this.formSubmit.bind(this);
        this.formData           =  new FormData();
        this.state = {
            toDate: new Date().toISOString(),
            fromDate: new Date().toISOString()
        }
    }
/*
*
*/
    setSelectedDate(selectedDate, dateType) {
        this.setState({[dateType]: selectedDate.toISOString()});
    }
/*
*
*/
    buildFetchParams(RESTMethod='GET') {
        let thisData  = new FormData();
        let myHeaders = new Headers();
        myHeaders.append('X-CoinAPI-Key', 'B2AA66AA-DAC5-401C-BEAF-BA70D0049792');
        myHeaders.append('Accept', 'application/json,');
        myHeaders.append('Accept-Encoding', 'deflate, gzip');
        Object.keys(this.state).map(key => {
            this.formData.append(this[key], this.state[key]);
        });
        //WORKS WELL FOR LOADING FORMDATA FOR 'POST'ing AND DISABLE BODY FOR GET
        let thisBody = RESTMethod === 'GET' ? '' : {body: this.formData};


        let returnParams = {
                method: RESTMethod,
                headers: myHeaders,
                thisBody,
            }
        return returnParams;
    }

/*
*  /v1/trades/BITSTAMP_SPOT_BTC_USD/history?time_start=2019-04-13T21:28:00.260Z&time_end=2019-04-13T21:28:00.260Z
*/
    getTradesOverPeriod() {
        return this.apiUrl+"/v1/trades/"+this.currency+"/history?time_start="+this.state.fromDate+"&time_end="+this.state.toDate;
    }
/*
*
 */
    formSubmit(e) {
        e.preventDefault();
        if(this.validateDateSelection()) {
            fetch(this.getTradesOverPeriod(),this.buildFetchParams())
             .then(response => response.json())
                .then((response) => {
                    response.forEach(element => {
                        console.log(element.timeExchange);
                        console.log(element.price);
                    });

                });
        }
    }
/*
* //this must eventually pop up as toaster, modal or other integrated message
*/
    validateDateSelection() {
        let monthsApart = Moment(this.state.toDate).diff(Moment(this.state.fromDate), 'months', true);
        if (monthsApart > 6) {
        alert("please ensure that start and end dates are no more than 6 months apart");
        return false;
        } else {
            console.log("pass dates to API for processing...");
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