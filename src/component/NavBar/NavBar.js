import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NavBar.module.css';
import NavItems from './NavItems/NavItems';
import NavItem from '../NavBar/NavItems/NavItem/NavItem';
import NavButton from './NavItems/NavButton/NavButton';
import Button from '../UI/Button/Button';
import Menu from '../../assets/menu.svg';
import Store from '../../assets/store1.png';
import CloseIcon from '../../assets/close_icon.svg';
import * as actions from '../../store/actions/index';


class NavBar extends Component {
    state = {
        sideBar: false
    }


    sideBarHandler = () => {
        if(this.state.sideBar) {
            this.setState({sideBar: false})
        }
        else {
            this.setState({sideBar: true})
        }
        
    }

    closeSideBarHandler = () => {
        if(this.state.sideBar) {
            this.setState({sideBar: false})
        }
        else {
            this.setState({sideBar: true})
        }
    }
    render () {

        let menuImage = Menu;
        if(this.state.sideBar) {
            menuImage = CloseIcon
        }
        let otherSide = null;
    if(!this.props.authenticated) {
        otherSide = (
            <div className = {classes.NavButtons}>
                <NavButton link = '/signin' styleName = 'SignIn'>Sign In</NavButton>
                <NavButton link = '/signup' styleName = 'SignUp'>Sign Up</NavButton>
            </div>
        )
    }

    else {
        otherSide = (
            <div className = {classes.NavButtons}>
                <NavItem link = '/profile'>Profile </NavItem>
                <Button clicked = {() => this.props.onLogOut()} >Log Out</Button>
            </div>
        )
    }
        return (
            <header className = {classes.Header}>
            <div className = {classes.MenuBar} onClick = {() => {this.sideBarHandler()}}>
                 <img src = {menuImage} alt='Menu'/>
             </div>
            <div className = {classes.NavAside}>
                <div className = {classes.Logo}>
                    <div className = {classes.Initial}>
                    <img  className = {classes.Image} src={Store} alt="Logo" />
                    </div>
                    <input className = {classes.Search} type="text" placeholder="Search.."></input>
                </div>
                <div className = {classes.NavItems}>
                    <NavItems />
                </div>
            </div>
            {otherSide}
            <div className = {classes.SideBar} 
            style = {this.state.sideBar? {transform: 'translateX(0)'} : {transform: 'translateX(-100%)'}} 
            onClick = {() => this.closeSideBarHandler()}>
                <div className = {classes.NavItems}>
                    <NavItems />
                </div>
                {otherSide}
            </div>
        </header>
        );
    }
} 
const mapStateToProps = state => {
    return {
        authenticated: state.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);