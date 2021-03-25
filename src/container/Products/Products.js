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

    upvoteHandler = ( productId, token, authenticatedStatus, userId ) => {
        if( authenticatedStatus ) {
            axios.post(`https://restapi-4u.herokuapp.com/upvote/${productId}/`, null, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then((response) => {
                console.log(response)
                this.upVotedUpdateHandler(productId, userId);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    } 

    upvoteStatus = (productId, userId) => {
        let productIndex = this.state.products.findIndex((product) => {
            return product.id === productId;
        })
        let upvoteStatus = this.state.products[productIndex].upvoters.some((user) => {
            return user.id === userId;
        })
        return upvoteStatus;
    }

    upVotedUpdateHandler = (productId, userId) => {
        let copiedProductArray = [...this.state.products];
        let indexOfProduct = copiedProductArray.findIndex((product) => {
            return product.id === productId;
        })
        
        let upVoteChecker = copiedProductArray[indexOfProduct].upvoters.some((user) => {
            return user.id === +userId
        })

        if(upVoteChecker) {
            let newUpVoters = copiedProductArray[indexOfProduct].upvoters.filter((user) => {
                if(user.id === +userId){
                    copiedProductArray[indexOfProduct].total_upvotes = copiedProductArray[indexOfProduct].total_upvotes - 1;
                    return false
                }
                else {
                    return user;
                }
            })
            copiedProductArray[indexOfProduct].upvoters = newUpVoters;
            this.setState({products: copiedProductArray});
        }
        else{
            copiedProductArray[indexOfProduct].total_upvotes = copiedProductArray[indexOfProduct].total_upvotes + 1;
            let newUpVoters = [...copiedProductArray[indexOfProduct].upvoters];
            newUpVoters.push({id: userId});
            copiedProductArray[indexOfProduct].upvoters = newUpVoters;
            this.setState({products: copiedProductArray});
        }
        
    }

    upVotersSpliceHandler = ( upVotersArray, userId ) => {
        let copiedUpvotersArray = [...upVotersArray];
        let userIdIndex = copiedUpvotersArray.findIndex((usersId) => {
            return usersId === userId
        })

        let newCopiedUserArray = copiedUpvotersArray.splice(userIdIndex, 1);
        return newCopiedUserArray;
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
                         comments = {product.comments}
                         upvoted = {() => this.upvoteHandler(product.id, this.props.token, this.props.authenticated, +this.props.userId)}
                         upvoteStatus = {this.upvoteStatus(product.id,  +this.props.userId)}/>
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

const mapStateToProps = state => {
    return {
        token: state.token,
        authenticated: state.authenticated,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetRedirected: () => dispatch(actions.resetRedirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);