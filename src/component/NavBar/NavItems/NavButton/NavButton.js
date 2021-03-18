import  React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavButton.module.css';

const NavButton = (props) => {
    return (
        <NavLink className = {classes[props.styleName]} to = {props.link}>
            {props.children}
        </NavLink>
    );
}

export default NavButton;