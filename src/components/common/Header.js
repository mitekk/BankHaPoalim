import React from 'react';
import Users from '../users/Users';
import logo from '../../logo.svg';
import '../../styles/header.css';
import Calendar from './Calendar';

const Header = (props) => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Users 
            onUserSelect={props.onUserSelect} 
            onUserSelected={props.onUserSelected}/>
            <Calendar/>
        </header>
    );
};

export default Header;