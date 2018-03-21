import React, { Component } from 'react';
import Axios from 'axios';
// import TaskApi from '../../api/taskApi';
import '../../styles/users.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ax = Axios.create({
    baseURL: 'http://localhost:3000/data'
});

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUser: { id: 0, name: '' },
            users: [''],
            dropdownOpen: false

        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        // this.setState({ users: TaskApi.getUsers() }, () => {
        //     this.setState({ selectedUser: this.state.users[0] }, () => {
        //         this.onUserSelected(this.state.selectedUser);
        //     });
        // });
        ax.get('users.json').then((response) => {
            this.setState({
                users: response.data.embededObject
            }, () => {
                this.setState({
                    selectedUser: this.state.users[0]
                }, () => {
                    this.onUserSelected(this.state.selectedUser);
                })
            })
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onUserSelected(user) {
        this.setState({
            selectedUser: user
        }, () => {
            this.props.onUserSelected(user);
        });
    }

    render() {
        return (
            <div className="users-container btn-group">
                <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.selectedUser.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.state.users && this.state.users.map((user, index) =>
                            <DropdownItem key={index}
                                onClick={this.onUserSelected.bind(this, user)}>
                                {user.name}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default Users;