import React from 'react';

import classes from './NavBar.module.css';
import NavItems from './NavItems/NavItems';
import NavButton from './NavItems/NavButton/NavButton';

const NavBar = (props) => {
    return (
        <header className = {classes.Header}>
            <div className = {classes.NavAside}>
                <div className = {classes.Logo}>
                    <div className = {classes.Initial}>
                        <h1>P</h1>
                    </div>
                    <h1>Hunt</h1>
                </div>
                <NavItems />
            </div>
            <div className = {classes.NavButtons}>
                <NavButton styleName = 'SignIn'>Sign In</NavButton>
                <NavButton styleName = 'SignUp'>Sign Up</NavButton>
            </div>
        </header>
    );
}

export default NavBar;