import React, { Component } from 'react';
import classes from './Products.module.css';
import { connect } from 'react-redux'

import Product from '../../component/Product/Product';
import * as actions from '../../store/actions/index';

class Products extends Component {
    state = {
        
    }

    componentDidMount() {
        this.props.onResetRedirected();
    }
    render () {
        return (
           <div className = {classes.Products}>
               <Product />
               <Product />
               <Product />
           </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetRedirected: () => dispatch(actions.resetRedirect())
    }
}

export default connect(null, mapDispatchToProps)(Products);