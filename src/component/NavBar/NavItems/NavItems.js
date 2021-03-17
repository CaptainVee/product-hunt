import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {
    return (
        <ul className = {classes.NavItems}>
            <NavItem>Products</NavItem>
            <NavItem>Post Product</NavItem>
        </ul>
    );
}

export default NavItems;