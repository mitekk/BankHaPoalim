import React, { Component } from 'react';
import Axios from 'axios';
// import TaskApi from '../../api/taskApi';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReportedSlot from '../slot/ReportedSlot';
import moment from 'moment';
import _ from 'lodash';
import '../../styles/month.css';

const ax = window.location.host.indexOf('audit-prd-sp') >= 0 ?
    Axios.create({ baseURL: 'http://audit-prd-api.resouce.bank/api/AuditTasks/' }) :
    window.location.host.indexOf('audit-test-sp') >= 0 ?
        Axios.create({ baseURL: 'http://audit-test-api.resouce.bank/api/AuditTasks/' }) :
        Axios.create({ baseURL: 'http://localhost:3000/data/' });

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
            clickCounter: 0,
            prevDate: undefined,
            validationMsg: '',
            modal: false
        };

        this.calTimeout = 0;

        this.handleReportHours = this.handleReportHours.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.removeReport = this.removeReport.bind(this);
        this.setHover = this.setHover.bind(this);
        this.removeHover = this.removeHover.bind(this);
        this.getHoverStyle = this.getHoverStyle.bind(this);
        this.updatePrevDate = this.updatePrevDate.bind(this);
    }

    updatePrevDate(nextProps) {
        ax.get(`GetDevCalendar/${moment(nextProps.calDate).format('YYYY')}/${moment(nextProps.calDate).format('MM')}/${this.props.userId}`)
            .then(function (response) {
                this.setState({ monthWorkingHours: response.data.embededObject });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.calDate !== this.state.prevDate) {
            clearTimeout(this.calTimeout);
            this.calTimeout = setTimeout(() => this.updatePrevDate(nextProps), 1000);
        }

        if (nextProps.userId !== this.props.userId) {
            ax.get(`GetDevCalendar/${moment(this.props.calDate).format('YYYY')}/${moment(this.props.calDate).format('MM')}/${nextProps.userId}`)
                .then(function (response) {
                    this.setState({ monthWorkingHours: response.data.embededObject });
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        // this.setState({ monthWorkingHours: TaskApi.getworkPeriodReport() });
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
                    let msg = this.validateReport(data, this.props.taskId, this.props.userId);
                    if (msg === '') {
                        debugger;
                        if (this.state.clickCounter > 1) {
                            let reqData = {
                                Date: data.day.date,
                                Hours: data.day.unused,
                                TaskId: this.props.taskId,
                                UserId: this.props.userId
                            };

                            // ax.post('api/AuditTasks/SetDevTask', reqData)
                            //     .then(function (response) {
                            //         console.log(response);
                            //     })
                            //     .catch(function (error) {
                            //         console.log(error);
                            //     });

                            ax.post('SetDevTask', reqData)
                                .then(function (response) {
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }
                        else {
                            let reqData = {
                                Date: data.day.date,
                                Hours: data.index,
                                TaskId: this.props.taskId,
                                UserId: this.props.userId
                            };

                            // ax.post('api/AuditTasks/SetDevTask', reqData)
                            //     .then(function (response) {
                            //         console.log(response);
                            //     })
                            //     .catch(function (error) {
                            //         console.log(error);
                            //     });

                            ax.post('SetDevTask', reqData)
                                .then(function (response) {
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }
                    }
                    else {
                        this.props.toggleAlertClass();
                        this.setState({ validationMsg: msg },
                            () => {

                            });
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

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    validateReport(data, taskId, userId) {
        let validMsg = undefined;
        if (data && data.day && data.index && taskId && userId) {
            validMsg = '';
            // console.log(`User: ${userId}, reported task: ${taskId}, on: ${data.day.date}, ${data.index} hours`);
        }
        else if (!data || !data.day || !data.index) {
            validMsg = 'setReportHours data is incomplete';
            console.error('setReportHours data is incomplete');
        }
        else if (!taskId) {
            validMsg = 'setReportHours taskId is invalid';
            console.error('setReportHours taskId is invalid');
        }
        else if (!userId) {
            validMsg = 'setReportHours userId is invalid';
            console.error('setReportHours userId is invalid');
        }
        return validMsg;
    }

    removeReport = (id) => {
        let reqData = {
            Id: id
        };
        ax.post('SetDevTask', reqData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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

    getNoReportStyle = () => {
        return {
            backgroundColor: '#b7b7b7',
            cursor: 'not-allowed'
        };
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
                                <div className="date-container">{moment(day.date).format('DD')}</div>
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
                                {day.reports && day.reports.length > 0 ?
                                    day.reports.map((report, index) =>
                                        <ReportedSlot
                                            key={index}
                                            report={report}
                                            onRemove={this.removeReport} />
                                    ) :
                                    _.times(8, (index) => {
                                        return (
                                            <div key={index}
                                                className="free-container"
                                                onClick={day.isWorkingDay ? this.handleReportHours.bind(this, { day, index: this.reverseIndex(8, index) + 1 }) : undefined}
                                                onMouseEnter={day.isWorkingDay ? this.setHover({ index: this.reverseIndex(8, index), date: day.date }) : undefined}
                                                onMouseLeave={day.isWorkingDay ? this.removeHover() : undefined}
                                                style={day.isWorkingDay ? this.getHoverStyle({ index: this.reverseIndex(8, index), date: day.date }) : this.getNoReportStyle()}>
                                                <div className="slot-container"></div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )}
                    </div>
                )
                }
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MonthReports;