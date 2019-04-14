import React, {Component} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Moment             from 'moment';

class OutputPrime extends Component {
    constructor(props) {
        super(props);
        this.toDate = props.toDate.split("T")[0];
        this.fromDate = props.fromDate.split("T")[0];
        this.primes = props.primes;
        this.totalTrades = props.totalTrades;
    }
/*
*
*/
    getTrades(tradeDate) {
        return (this.primes[tradeDate].map((tradePrice, index) => (
            <Row
                key={index}>
                <Col>{tradePrice}</Col>
            </Row>
        )));
    }
/*
*
 */
    render() {
        let cardContent = 'Selected range contains no prime numbers';
        if (Object.keys(this.primes).length) {
            cardContent = Object.keys(this.primes).map(tradeDate => (
                  <>
                      <Row
                        key={tradeDate}>
                        <Col>{tradeDate+" (primes: "+this.primes[tradeDate].length+")"}</Col>
                      </Row>
                      {this.getTrades(tradeDate)}
                  </>
        ))
        }
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        Prime Numbers for all trades between {this.fromDate} and {this.toDate} (Total trades over period: {this.totalTrades})
                    </Card.Title>
                    {cardContent}
                </Card.Body>
            </Card>
        )
    }
}

export default OutputPrime;