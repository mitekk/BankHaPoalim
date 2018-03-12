import React, { Component } from 'react';
import Header from './common/Header'
import MonthReports from './monthReports/MonthReports';
import TaskList from './task/TaskList';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../styles/workingHours.css';

class WorkingHours extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskId: undefined,
            userId: undefined
        };

        this.onTaskSelected = this.onTaskSelected.bind(this);
        this.onUserSelected = this.onUserSelected.bind(this);
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

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {
        return (
            <div className="working-hours-container">
                <Header onUserSelected={this.onUserSelected} />
                <div className="content-container">
                    <TaskList onTaskSelected={this.onTaskSelected} />
                    <MonthReports taskId={this.state.taskId} userId={this.state.userId} />
                </div>
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

export default WorkingHours;