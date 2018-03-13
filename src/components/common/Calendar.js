import React from 'react';
import Moment from 'react-moment';
import '../../styles/calendar.css';

Moment.globalLocale = 'he';

const Calendar = (props) => {

    return (
        <div className="calendar-container row">
        <div></div>
            <Moment className="next-container col-2" onClick={props.onNext} add={{ month: 1 }} format="MMMM">{props.calDate}</Moment>
            <Moment className="current-container col-8" format="MMMM">{props.calDate}</Moment>
            <Moment className="prev-container col-2" onClick={props.onPrev} subtract={{ month: 1 }} format="MMMM">{props.calDate}</Moment>
        </div>
    );
};

export default Calendar;

{/* <div className="calendar-container row">
            <Moment className="next-con t ainer col-2" onClick={props.onNext} add={{ month: 1 }} format="MMMM">{props.calDate}</Moment>
            <Moment className="current-container col-8" format="MMMM">{props.calDate}</Moment>
            <Moment className="prev-container col-2" onClick={props.onPrev} subtract={{ month: 1 }} format="MMMM">{props.calDate}</Moment>
        </div> */}