import React from 'react';

const Calendar = (props) => {

    return (
        <div className="calendar-container">
            <div className="prev-container col-2" onclick={props.onPrev}>{props.prevCalTitle}</div>
            <div className="current-container col-8">{props.dateCalTitle}</div>
            <div className="next-container col-2" onclick={props.onNext}>{props.nextCalTitle}</div>
        </div>
    );
};

export default Calendar;