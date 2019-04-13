import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import { Row, Col } from 'react-bootstrap';

class DatePickerComp extends Component {
    constructor(props) {
       super(props);
        this.state = {
           thisDate: new Date()
        };
        this.label = props.label;
        this.id    = props.id;
        this.setSelectedDate = props.action;
        this.handleDate = this.handleDate.bind(this);
    }
/*
*
*/
    handleDate(date) {
        this.setState({thisDate: date}, () => this.setSelectedDate(this.state.thisDate, this.id));
    }
/*
*
*/
    render() {
        return (
            <Row>
                <Col md={1}>
                    <label>{this.label}</label>
                </Col>
                <Col md={11}>
                    <DatePicker
                        selected={this.state.thisDate}
                        onChange={this.handleDate}
                        //2016-01-01T00:00:00
                        dateFormat="YYYY/MM/dd"
                        id={this.id}
                        className='form-control'/>
                </Col>
            </Row>
        );
    }
}

export default DatePickerComp;