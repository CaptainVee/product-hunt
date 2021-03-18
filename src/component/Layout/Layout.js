import React from 'react';

import classes from './Layout.module.css';
import Aux from '../../hoc/Auxillary/Auxillary';
import NavBar from '../NavBar/NavBar';

const Layout = (props) => {
    return (
        <Aux>
            <NavBar />
            <main>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout