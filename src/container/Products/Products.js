import React, { Component } from 'react';
import classes from './Products.module.css';
import { connect } from 'react-redux';
import axios from 'axios';

import Product from '../../component/Product/Product';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

class Products extends Component {
    state = {
        products: [],
        loading: false
    }
    componentDidMount() {
        this.props.onResetRedirected();
        this.setState({loading: true})
        axios.get('https://restapi-4u.herokuapp.com')
        .then(response => {
            console.log(response);
            // const updatedProducts = [...this.state.products];
            // updatedProducts = response.data;
            this.setState({products: response.data});
            this.setState({loading: false})
        }) 
        .catch(err => {
            this.setState({loading: false})
        })
    }

    topicsHandler = ( id ) => {
        const topics = {'1': 'IT and Software', 
                        '2': 'Design', 
                        '3': 'Personal Development', 
                        '4': 'Marketing', 
                        '5': 'Music', 
                        '6': 'Cloud'}

        for(let key in topics) {
            if(key === id) {
                return topics[key]
            }
        }
    }


    render () {

        let productBody = null;

        if(!this.state.loading) {
            productBody = (<div className = {classes.Products}>
                     {this.state.products.map((product) => {
                    return (
                        <Product key = {product.id}
                         title = {product.name}
                         caption = {product.caption}
                         thumbnail = {product.thumbnail}
                         topics = {this.topicsHandler(product.topics[0])}
                         total_upvotes = {product.total_upvotes}
                         comments = {product.comments}/>
                    )
                })}
            </div>)
        }
        else {
            productBody = <Spinner />
        }
        return (
           productBody
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetRedirected: () => dispatch(actions.resetRedirect())
    }
}

export default connect(null, mapDispatchToProps)(Products);