import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {
    return (
        <ul className = {classes.NavItems}>
            <NavItem link = '/'>Products</NavItem>
            <NavItem link = '/post-product'>Post Product</NavItem>
        </ul>
    );
}

export default NavItems;