import React from 'react';

import classes from './NavItem.module.css';

const NavItem = (props) => {
    return (
        <li className = {classes.NavItem}>
            <a href= 'order.html'>{props.children}</a>
        </li>
    );
}

export default NavItem;