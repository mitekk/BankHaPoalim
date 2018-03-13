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
                onUserSelected={props.onUserSelected} />
            <Calendar
                calDate={props.calDate}
                onPrev={props.onPrev}
                onNext={props.onNext}
            />
        </header>
    );
};

export default Header;