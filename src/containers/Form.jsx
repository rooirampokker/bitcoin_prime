import React, {Component} from 'react';
import Button             from '../components/Button';
import DatePickerComp     from '../components/DatePickerComp';
import OutputPrime        from '../components/OutputPrime';
import Spinner            from '../components/Spinner';
import TestData           from '../components/TestData';
import Utils              from '../utils/Utils';
import { Row, Col, Card } from 'react-bootstrap';
import Moment             from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.apiUrl             = 'https://rest.coinapi.io';
        this.apiKey             = 'B2AA66AA-DAC5-401C-BEAF-BA70D0049792';
        this.currencyKey        = 'BITSTAMP_SPOT_BTC_USD';
        this.currencySymbol     = '$';
        this.testData           = new TestData();
        this.utils              = new Utils();
        this.setSelectedDate    = this.setSelectedDate.bind(this);
        this.formSubmit         = this.formSubmit.bind(this);
        this.state = {
            toDate: new Date().toISOString(),
            fromDate: new Date().toISOString(),
            dailyPrimes: [],
            formSubmitted: false,
            totalTrades: 0,
            loading: false
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
*  Decorator: REQUEST EXAMPLE - /v1/trades/BITSTAMP_SPOT_BTC_USD/history?time_start=2019-04-13T21:28:00.260Z&time_end=2019-04-13T21:28:00.260Z
*/
    getTradesOverPeriod() {
        return this.apiUrl+"/v1/trades/"+this.currencyKey+"/history?time_start="+this.state.fromDate+"&time_end="+this.state.toDate;
    }
/*
*
 */
    formSubmit(e) {
        e.preventDefault();
        if(this.utils.validateDateSelection(this.state.toDate, this.state.fromDate)) {
              fetch(this.getTradesOverPeriod(),this.buildFetchParams())
                  .then(this.setState({loading: true}))
                   .then(response => response.json())
                      .then((response) => {
                            //let response = this.testData.getSample();
                            this.processResponse(response);
                            this.setState({loading: false})
                      })
        }
    }
/*
* allTrades =
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
            if (this.utils.isPrime(number)) {
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
    render() {
        let outputPrime = '';
        if (this.state.formSubmitted) {
            outputPrime = <OutputPrime
                            toDate      = {this.state.toDate}
                            fromDate    = {this.state.fromDate}
                            primes      = {this.state.dailyPrimes}
                            totalTrades = {this.state.totalTrades}
                            currency    = {this.currencySymbol}
                          />
        }
        let spinner = '';
        if (this.state.loading) {
            spinner = <Spinner/>
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
                                <Row>
                                    <Col md={12}
                                         className='blockquote text-center'>
                                        {spinner}
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