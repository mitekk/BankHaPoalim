import React from 'react';
import Moment from 'react-moment';
import LeftArrow from 'react-icons/lib/fa/chevron-right';
import RightArrow from 'react-icons/lib/fa/chevron-left';
import '../../styles/calendar.css';

Moment.globalLocale = 'he';

const Calendar = (props) => {

    return (
        <div className="calendar-container row">
            <LeftArrow className="prev-container col-2" onClick={props.onPrev} />
            <Moment className="current-container col-8" format="MMMM YYYY">
                {props.calDate}
            </Moment>
            <RightArrow className="next-container col-2" onClick={props.onNext} />
        </div>
    );
};

export default Calendar;