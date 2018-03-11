import React, { Component } from 'react';
import Header from './common/Header'
import MonthReports from './monthReports/MonthReports';
import TaskList from './task/TaskList';
import '../styles/workingHours.css';

class WorkingHours extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskId: undefined,
            userId: undefined
        };

        this.handleTaskSelected = this.handleTaskSelected.bind(this);
    }

    handleTaskSelected(id) {
        this.setState({ taskId: id });
    }

    render() {
        return (
            <div className="working-hours-container">
                <Header />
                <div className="content-container">
                    <TaskList onTaskSelected={this.handleTaskSelected} />
                    <MonthReports taskId={this.taskId} userId={this.userId} />
                </div>
            </div>
        );
    }
}

export default WorkingHours;