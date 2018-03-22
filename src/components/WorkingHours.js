import React, { Component } from 'react';
import Header from './common/Header'
import MonthReports from './monthReports/MonthReports';
import TaskList from './task/TaskList';
import moment from 'moment';
import '../styles/workingHours.css';


class WorkingHours extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskId: undefined,
            userId: undefined,
            calDate: new moment(),
            alertClass: ''
        };

        this.onTaskSelected = this.onTaskSelected.bind(this);
        this.onUserSelected = this.onUserSelected.bind(this);
        this.calPrev = this.calPrev.bind(this);
        this.calNext = this.calNext.bind(this);
        this.toggleAlertClass = this.toggleAlertClass.bind(this);
    }

    onTaskSelected(task) {
        this.setState({
            taskId: task.id
        });
    }

    onUserSelected(user) {
        this.setState({
            userId: user.userID
        });
    }

    calPrev() {
            this.setState((prevState) => ({
                calDate: prevState.calDate.add(-1, 'months')
            }));
    }

    calNext() {
        this.setState((prevState) => ({
            calDate: prevState.calDate.add(1, 'months')
        }));
    }

    toggleAlertClass() {
        this.setState({
            alertClass: 'alertBlinkBG'
        }, () => {
            setTimeout(() => {
                this.setState({ alertClass: '' });
            }, 2500);
        });
    }

    render() {
        return (
            <div className="working-hours-container">
                <Header
                    onUserSelected={this.onUserSelected}
                    calDate={this.state.calDate}
                    onPrev={this.calPrev}
                    onNext={this.calNext} />
                <div className="content-container">
                    <TaskList onTaskSelected={this.onTaskSelected} alertClass={this.state.alertClass} userId={this.state.userId} />
                    <MonthReports
                        taskId={this.state.taskId}
                        userId={this.state.userId}
                        calDate={this.state.calDate}
                        toggleAlertClass={this.toggleAlertClass}
                        alertClass={this.state.alertClass} />
                </div>
            </div>
        );
    }
}

export default WorkingHours;