import React, { Component } from 'react';
import Axios from 'axios';
// import TaskApi from '../../api/taskApi';
import Task from './Task';
import '../../styles/tasksList.css';

const ax = Axios.create({
    baseURL: 'http://localhost:3000/data'
});

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            searchValue: ''
        }
        this.onTaskSelected = this.onTaskSelected.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        ax.get('tasks.json').then((response) => {
            this.setState({
                tasks: response.data.embededObject
            })
        });
    }

    onTaskSelected(id) {
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
                        <Task key={task.id}
                            task={task}
                            onTaskSelected={this.onTaskSelected}
                            alertClass={this.props.alertClass} />
                    )}
            </div>
        );
    }
}

export default TaskList;
