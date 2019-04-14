import React, {Component} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Moment             from 'moment';

class OutputPrime extends Component {
    constructor(props) {
        super(props);
        this.toDate = props.toDate.split("T")[0];
        this.fromDate = props.fromDate.split("T")[0];
        this.primes = props.primes;
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    {console.log(this.toDate)}
                    {console.log(this.fromDate)}
                    <Card.Title>
                        Prime Numbers for all trades between {this.fromDate} and {this.toDate}
                    </Card.Title>
                    {
                        this.primes.map(number => {
                            if (number) {
                                console.log('boo');
                            }
                            let comp = <Row><Col>{number}</Col></Row>
                            return comp;
                        })
                    }
                </Card.Body>
            </Card>
        )
    }
}

export default OutputPrime;