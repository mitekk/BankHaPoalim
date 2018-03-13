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
        };

        this.onTaskSelected = this.onTaskSelected.bind(this);
        this.onUserSelected = this.onUserSelected.bind(this);
        this.calPrev = this.calPrev.bind(this);
        this.calNext = this.calNext.bind(this);
    }

    onTaskSelected(task) {
        this.setState({
            taskId: task.id
        });
    }

    onUserSelected(user) {
        this.setState({
            userId: user.id
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

    render() {
        return (
            <div className="working-hours-container">
                <Header
                    onUserSelected={this.onUserSelected}
                    calDate={this.state.calDate}
                    onPrev={this.calPrev}
                    onNext={this.calNext} />
                <div className="content-container">
                    <TaskList onTaskSelected={this.onTaskSelected} />
                    <MonthReports taskId={this.state.taskId} userId={this.state.userId} calDate={this.state.calDate} />
                </div>
            </div>
        );
    }
}

export default WorkingHours;