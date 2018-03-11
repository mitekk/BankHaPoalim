import React from 'react';
import Users from '../users/Users';
import logo from '../../logo.svg';
import '../../styles/header.css';

const Header = (props) => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Users onUserSelect={props.onUserSelect} />
        </header>
    );
};

export default Header;