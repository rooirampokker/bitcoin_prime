import Moment from 'moment';

class Utils {
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
    validateDateSelection(toDate, fromDate) {
        let monthsApart = Moment(toDate).diff(Moment(fromDate), 'months', true);
        if (monthsApart > 6) {
            alert("Please ensure that start and end dates are no more than 6 months apart");
            return false;
        } else if (toDate < fromDate) {
            alert("'To Date' can not be before 'From Date'");
            return false;
        } else {
            console.log("pass dates to API for processing...");
            return true;
        }
    }
}

export default Utils;