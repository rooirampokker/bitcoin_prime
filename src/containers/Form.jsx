import React, {Component} from 'react';
import Button             from '../components/Button';
import DatePickerComp     from '../components/DatePickerComp';
import OutputPrime        from '../components/OutputPrime';
import { Row, Col, Card } from 'react-bootstrap';
import Moment             from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.apiUrl             = 'https://rest.coinapi.io';
        this.apiKey             = 'B2AA66AA-DAC5-401C-BEAF-BA70D0049792';
        this.currency           = 'BITSTAMP_SPOT_BTC_USD';
        this.setSelectedDate    = this.setSelectedDate.bind(this);
        this.formSubmit         = this.formSubmit.bind(this);
        this.state = {
            toDate: new Date().toISOString(),
            fromDate: new Date().toISOString(),
            dailyPrimes: [],
            formSubmitted: false,
            totalTrades: 0
        }
    }
/*
*
*/
    setSelectedDate(selectedDate, dateType) {
        this.setState({[dateType]:    selectedDate.toISOString(),
                             formSubmitted: false});
    }
/*
*
*/
    buildFetchParams(RESTMethod='GET') {
        let myHeaders = new Headers();
        myHeaders.append('X-CoinAPI-Key', this.apiKey);
        myHeaders.append('Accept', 'application/json,');
        myHeaders.append('Accept-Encoding', 'deflate, gzip');

        let returnParams = {
                method: RESTMethod,
                headers: myHeaders
            }
        return returnParams;
    }

/*
*  REQUEST EXAMPLE - /v1/trades/BITSTAMP_SPOT_BTC_USD/history?time_start=2019-04-13T21:28:00.260Z&time_end=2019-04-13T21:28:00.260Z
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
                  .then(console.log("spinner on"))
                   .then(response => response.json())
                      .then((response) => {
                            //let response = this.testData(response);
                            this.processResponse(response);
                            console.log('spinner off');
                      })
        }
    }
/*
* {
*  '2011-01-01': [123,234],
*  '2011-01-02': [456,789]
*  ...
* }
*/
    processResponse(response) {
        let dailyPrimes = [];
        let allPrimes = {};
        let tradeCount = 0;
        //cycles over each response item, identifies the prime numbers and loads them into an JSON structure...
        Object.keys(response).forEach(element => {
            tradeCount++;
            let thisDate = response[element].time_exchange.split("T")[0];
            let number = Math.round(response[element].price);
            if (this.isPrime(number)) {
                //just add to current date element if it already exists
                if (allPrimes.hasOwnProperty(thisDate)) {
                    dailyPrimes.push(number);
                } else {//otherwise reset the daily primes and start again for the new day...
                    dailyPrimes = [];
                    dailyPrimes.push(number);
                }
                allPrimes[thisDate] = dailyPrimes;
            }
        });
        this.setState({formSubmitted: true,
                             dailyPrimes: allPrimes,
                             totalTrades: tradeCount});
    }
/*
*
*/
    isPrime(number) {
        //cycles over all numbers from 2 onwards to check if number is divisble
        for(let counter = 2; counter < number; counter++) {
            if (number % counter === 0) {
                return false; //return as non-prime the moment it's fully divisible by anything
            }
        }
        return true;
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
    testData() {
        let testData = [
            {
                price: 4,
                size: 0.025997,
                symbol_id: "BITSTAMP_SPOT_BTC_USD",
                taker_side: "BUY",
                time_coinapi: "2019-03-14T09:04:47.9177173Z",
                time_exchange: "2019-03-14T09:04:47.0000000Z",
                uuid: "41ddfe65-9e7c-4749-9f52-6f679ff20107",
            },
            {
                price: 5,
                size: 2.05959469,
                symbol_id: "BITSTAMP_SPOT_BTC_USD",
                taker_side: "BUY",
                time_coinapi: "2019-03-14T09:04:58.5135425Z",
                time_exchange: "2019-03-14T09:04:58.0000000Z",
                uuid: "fd3869eb-53eb-4f81-bccd-e51502f8284b"
            },
            {
                price: 10,
                size: 0.025997,
                symbol_id: "BITSTAMP_SPOT_BTC_USD",
                taker_side: "BUY",
                time_coinapi: "2019-03-13T09:05:08.3046702Z",
                time_exchange: "2019-03-13T09:05:08.0000000Z",
                uuid: "3b7ac020-006d-4145-825d-eb8e551b655d"
            },
            {
                price: 11,
                size: 0.025997,
                symbol_id: "BITSTAMP_SPOT_BTC_USD",
                taker_side: "BUY",
                time_coinapi: "2019-03-13T09:05:08.3046702Z",
                time_exchange: "2019-03-13T09:05:08.0000000Z",
                uuid: "3b7ac020-006d-4145-825d-eb8e551b655d",
            },
            {
                price: 17,
                size: 0.025997,
                symbol_id: "BITSTAMP_SPOT_BTC_USD",
                taker_side: "BUY",
                time_coinapi: "2019-03-13T09:05:08.3046702Z",
                time_exchange: "2019-03-13T09:05:08.0000000Z",
                uuid: "3b7ac020-006d-4145-825d-eb8e551b655d",
            },
        ]
        return testData;
    }
/*
*
*/
    render() {
        let outputPrime = '';
        if (this.state.formSubmitted) {
            outputPrime = <OutputPrime
                            toDate   = {this.state.toDate}
                            fromDate = {this.state.fromDate}
                            primes   = {this.state.dailyPrimes}
                            totalTrades = {this.state.totalTrades}
                          />
        }
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>
                               Specify a to and from date and click on submit to view all rounded trades that are prime numbers
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
            {outputPrime}
            </>
        );
    }
}

export default FormContainer;