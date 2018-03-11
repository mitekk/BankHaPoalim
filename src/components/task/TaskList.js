import React, { Component } from 'react';
import TaskApi from '../../api/taskApi';
import Task from './Task';
import '../../styles/tasksList.css';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: TaskApi.getTasks(),
            searchValue: ''
        }
        this.handleTaskSelect = this.handleTaskSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleTaskSelect(id) {
        this.props.onTaskSelected(id);
    }

    handleSearchChange(e) {
        this.setState({
            searchValue: e.target.value
        });
    }

    render() {
        return (
            <div className="task-list-container col-2">
                <div className="form-group">
                    <input
                        className="form-control input-sm"
                        placeholder="חיפוש משימה"
                        type="text"
                        onChange={this.handleSearchChange} />
                </div>
                {this.state.tasks
                    .filter(task => task.name.indexOf(this.state.searchValue) > -1)
                    .map((task) =>
                        <Task key={task.id} task={task} onTaskSelect={this.handleTaskSelect} />
                    )}
            </div>
        );
    }
}

export default TaskList;
