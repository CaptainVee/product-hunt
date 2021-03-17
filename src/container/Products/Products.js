import React, { Component } from 'react';
import classes from './Products.module.css';

import Product from '../../component/Product/Product';

class Products extends Component {
    state = {
        
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

export default Products;