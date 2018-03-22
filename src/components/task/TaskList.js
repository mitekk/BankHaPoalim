import React, { Component } from 'react';
import Axios from 'axios';
// import TaskApi from '../../api/taskApi';
import Task from './Task';
import '../../styles/tasksList.css';

const ax = window.location.host.indexOf('audit-prd-sp') >= 0 ?
    Axios.create({ baseURL: 'http://audit-prd-api.resouce.bank/api/AuditTasks/' }) :
    window.location.host.indexOf('audit-test-sp') >= 0 ?
        Axios.create({ baseURL: 'http://audit-test-api.resouce.bank/api/AuditTasks/' }) :
        Axios.create({ baseURL: 'http://localhost:3000/data/' });

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
        ax.get(`GetDevTasksByUser/${this.props.userId}`).then((response) => {
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
