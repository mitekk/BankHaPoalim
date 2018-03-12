import React from 'react';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.getNextDate = this.getNextDate.bind(this);
        this.getPrevDate = this.getPrevDate.bind(this);

        getCurrentDate = () => {
            return '';
        }
        getNextDate = () => {
            return '';
        }
        getPrevDate = () => {
            return '';
        }
    }

};

export default Calendar;


// <div className="calendar-container">
// className="calendar-prev" onClick={this.setDate(-1 ) } >{this.getPrevDate ()}</div>
//    <div className="calendar-current ">{this.getCurrentDat e ()}</div> 
// <div className="calendar-next" onClick={this.setDate(1)}>{this.getNextDate()}</div>
// </div>