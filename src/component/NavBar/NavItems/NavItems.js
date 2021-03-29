import React from 'react';
import { connect } from 'react-redux';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => {
    let postProduct = null;

    if(props.authenticated) {
        postProduct = (<NavItem link = '/post-product'>Post Product</NavItem>);
    }
    return (
        <ul className = {classes.NavItems}>
            <NavItem link = '/'>Products</NavItem>
            {postProduct}
        </ul>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.authenticated
    }
}

export default connect(mapStateToProps)(NavItems);