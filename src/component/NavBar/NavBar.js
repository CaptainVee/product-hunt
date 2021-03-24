import React from 'react';
import { connect } from 'react-redux';

import classes from './NavBar.module.css';
import NavItems from './NavItems/NavItems';
import NavButton from './NavItems/NavButton/NavButton';


const NavBar = (props) => {

    let otherSide = null;
    if(!props.authenticated) {
        otherSide = (
            <div className = {classes.NavButtons}>
                <NavButton link = '/signin' styleName = 'SignIn'>Sign In</NavButton>
                <NavButton link = '/signup' styleName = 'SignUp'>Sign Up</NavButton>
            </div>
        )
    }
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
            {otherSide}
        </header>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.authenticated
    }
}
export default connect(mapStateToProps)(NavBar);