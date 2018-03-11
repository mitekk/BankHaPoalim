import React from 'react';
import logo from '../../logo.svg';
import '../../styles/header.css';

const Header = () =>{
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
    );
};

export default Header;