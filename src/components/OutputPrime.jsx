import React, {Component} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Utils              from '../utils/Utils';

class OutputPrime extends Component {
    constructor(props) {
        super(props);
        this.toDate = props.toDate.split("T")[0];
        this.fromDate = props.fromDate.split("T")[0];
        this.primes = props.primes;
        this.totalTrades = props.totalTrades;
        this.currency    = props.currency;
        this.utils       = new Utils();
    }
/*
*
*/
    getTrades(tradeDate) {
        return (this.primes[tradeDate].map((tradePrice, index) => (
            <Row
                key={'PrimeRow'+index}>
                <Col
                    key={'PrimeCol'+index}
                    className='tradeValue'>
                    {this.currency}{tradePrice}
                </Col>
            </Row>
        )));
    }
/*
*
 */
    render() {
        let cardContent = 'Selected range contains no prime numbers';
        if (Object.keys(this.primes).length) {
            cardContent = Object.keys(this.primes).map((tradeDate, index) => (
                    <div
                        key={'Container'+index}>
                      <Row>
                        <Col>
                            <h5>{tradeDate+" (Total prime trades is also prime: "+this.utils.isPrime(this.primes[tradeDate].length)+"("+this.primes[tradeDate].length+")) "}</h5>
                        </Col>
                      </Row>
                      {this.getTrades(tradeDate)}
                    </div>
        ))
        }
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col
                                className='blockquote text-center'>
                                <div>Summary of trades (Total: {this.totalTrades})</div>
                                <div>{this.fromDate} to {this.toDate}</div>
                            </Col>
                        </Row>
                    </Card.Title>
                    {cardContent}
                </Card.Body>
            </Card>
        )
    }
}

export default OutputPrime;