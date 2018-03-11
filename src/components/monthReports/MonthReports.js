import React, { Component } from 'react';
import TaskApi from '../../api/taskApi';
import ReportedSlot from '../slot/ReportedSlot';
import '../../styles/month.css';
import _ from 'lodash';

class MonthReports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            monthWorkingHours: {
                weekList: []
            },
            hoverIndex: undefined,
            hoverDate: undefined,
            clickTimer: undefined,
            clickCounter: 0
        };

    }

    componentDidMount() {
        this.setState({ monthWorkingHours: TaskApi.getworkPeriodReport() });
    }

    componentWillUnmount() {
        this.setState({ monthWorkingHours: null });
    }

    handleReportHours = (data) => {
        let timeoutDuration = 250;

        if (this.state.clickTimer) {
            this.setState((prevState) => ({
                clickCounter: prevState.clickCounter + 1
            }));
        }
        else {
            this.setState({
                clickTimer: setTimeout(() => {
                    if (this.state.clickCounter > 1) {
                        data.index = data.day.unused;
                        TaskApi.setReportHours(data, this.props.taskId, this.props.userId);
                    }
                    else {
                        TaskApi.setReportHours(data, this.props.taskId, this.props.userId);
                    }

                    this.setState({ clickCounter: 0 });

                }, timeoutDuration),
                clickCounter: 1
            });
        }

        setTimeout(() => {
            this.setState((prevState) => ({
                clickTimer: clearTimeout(prevState.clickTimer),
            }));
        }, timeoutDuration);

    }

    removeReport = (id) => {
        TaskApi.removeReport(id, this.props.taskId, this.props.userId);
    }

    setHover = (data) => (e) => {
        this.setState({
            hoverIndex: data.index,
            hoverDate: data.date
        });
    }

    removeHover = (index) => (e) => {
        this.setState({
            hoverIndex: undefined,
            hoverDate: undefined
        });
    }

    getHoverStyle = (data) => {
        return {
            backgroundColor: new Date(this.state.hoverDate).getTime() !== new Date(data.date).getTime() ?
                undefined :
                this.state.hoverIndex < data.index ? undefined : '#fffff0c2'
        }
    }

    reverseIndex = (usedSlots, freeSlotIndex) => {
        return (usedSlots - 1) - freeSlotIndex;
    }

    render() {
        return (
            <div className="month-container month-rows col-10">
                {this.state.monthWorkingHours.weekList.map((week, index) =>
                    <div key={index} className="week-container week-columns">
                        {week.dayList.filter((day) => {
                            let rtnDay = undefined;
                            if (day.dayOfTheWeek <= 4) {
                                rtnDay = day;
                            }
                            return rtnDay;
                        }).map((day, index) =>
                            <div key={index} className="day-container">
                                {_.times(day.unused, (index) => {
                                    return (
                                        <div key={index}
                                            className="free-container"
                                            onClick={this.handleReportHours.bind(this, { day, index: this.reverseIndex(day.unused, index) + 1 })}
                                            onMouseEnter={this.setHover({ index: this.reverseIndex(day.unused, index), date: day.date })}
                                            onMouseLeave={this.removeHover()}
                                            style={this.getHoverStyle({ index: this.reverseIndex(day.unused, index), date: day.date })}>
                                            <div className="slot-container"></div>
                                        </div>
                                    );
                                })}
                                {day.reports.map((report, index) =>
                                    <ReportedSlot
                                        key={index}
                                        report={report}
                                        onRemove={this.removeReport} />
                                )}
                            </div>
                        )}
                    </div>
                )
                }
            </div>
        );
    }
}

export default MonthReports;