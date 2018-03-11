import React, { Component } from 'react';
import TaskApi from '../../api/taskApi';
import '../../styles/users.css';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: TaskApi.getUsers(),
        }
        this.state = {
            selectedUser: this.state.users[0],
        }
    }

    render() {
        return (
            <div className="users-container">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selectedUser.name}
                </button>
                <div className="dropdown-menu" size="sm" aria-labelledby="dropdownMenuButton">
                    {this.state.users && this.state.users.map((user, index) =>
                        <a role="button"
                            key={user.id}
                            className="dropdown-item" onClick={this.props.onUserSelect(user)}>{user.name}</a>
                    )}
                </div>
            </div>
        );
    }
}

export default Users;

// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
/* export default class Example extends React.Component {
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}> 
                            <DropdownToggle caret>
                    Dropdown
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>*/