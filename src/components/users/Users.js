import React, { Component } from 'react';
import TaskApi from '../../api/taskApi';

class Users extends Componen {
    constructor(props) {
        suprt(props);
        this.setState({
            users: TaskApi.getUsers(),
            selectedUser: users[0]
        })
    }

    render() {
        return (
            <div className="users-container">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selectedUser.name}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.state.users.map((user, index) =>
                        <a role="button"
                            key={user.id}
                            className="dropdown-item" onClick={}>{user.name}</a>
                    )}
                </div>
            </div>
        );
    }
}