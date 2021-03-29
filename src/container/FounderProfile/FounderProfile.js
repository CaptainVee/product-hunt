import React, { Component } from 'react';
import axios from 'axios';

import classes from './FounderProfile.module.css';
import { connect } from 'react-redux';
import Product from '../../component/Product/Product';
import Spinner from '../../component/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary/Auxillary';


class FounderProfile extends Component {

    state = {
        userInfo: {
            product: []
        },
        loading: false
    }

    componentDidMount () {
        this.setState({loading: true});
        let founderId = this.props.match.params.founderId
        setTimeout(() => {
            let url = `https://restapi-4u.herokuapp.com/profile/${founderId}/`;
            axios.get(url)
        .then((response) => {
            let copiedUserData = {...this.state.userInfo}
            copiedUserData = response.data
            let copiedProduct = [...copiedUserData.product];
            copiedProduct = response.data.product;
            copiedUserData.product = copiedProduct; 
            this.setState({userInfo: copiedUserData});
            this.setState({loading: false});
        })
        .catch((err) => {
            console.log(err)
        })
        }, 3000)
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

    upvoteStatus = (productId, userId) => {
        let productIndex = this.state.userInfo.product.findIndex((product) => {
            return product.id === productId;
        })
        let upvoteStatus = this.state.userInfo.product[productIndex].upvoters.some((user) => {
            return user.id === userId;
        })
        return upvoteStatus;
    }

    upvoteHandler = ( productId, token, authenticatedStatus, userId, event ) => {
        event.stopPropagation();
        if( authenticatedStatus ) {
            axios.post(`https://restapi-4u.herokuapp.com/upvote/${productId}/`, null, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then((response) => {
                let copiedUserInfo = {...this.state.userInfo};
                let copiedUsersProduct = [...copiedUserInfo.product];
                
                let indexOfUpvotedProduct = copiedUsersProduct.findIndex((product) => {
                    return product.id === productId;
                });

                copiedUsersProduct[indexOfUpvotedProduct].upvoters = response.data.upvoters;
                copiedUsersProduct[indexOfUpvotedProduct].total_upvotes = response.data.upvoters.length;
                copiedUserInfo.product = copiedUsersProduct;
                this.setState({userInfo: copiedUserInfo})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    } 

    render () {
        let profileBody = <Spinner />

        let productsContainer = null;

        if(this.state.userInfo.product.length === 0) {
            productsContainer = <p>No Activity Yet</p>
        }
        else {
            productsContainer = (
                <Aux>
                     <h3 className = {classes.ProductLength}>Product {`(${this.state.userInfo.product.length})`}</h3>
                    {this.state.userInfo.product.map((product) => {
                        return (
                            <Product key = {product.id}
                            title = {product.name}
                            caption = {product.caption}
                            thumbnail = {product.thumbnail}
                            topics = {this.topicsHandler(product.topics[0])}
                            total_upvotes = {product.total_upvotes}
                            comments = {product.comments}
                            upvoted = {(event) => this.upvoteHandler(product.id, this.props.token, this.props.authenticated, +this.props.userId, event)}
                            upvoteStatus = {this.upvoteStatus(product.id,  +this.props.userId)}
                            id = {product.id}
                            {...this.props}
                            />
                        );
                    })}
                </Aux>
            )
        }

        if((!this.state.loading) && this.state.userInfo) {
            profileBody = (
                <div className = {classes.Profile}>
                <div className = {classes.ProfileHeader}>
                    <div className = {classes.ProfileInfo}>
                        <div className = {classes.ImageContainer}>
                            {/* <div className = {classes.ImagePlaceHolder}>
                                <h2>B</h2>
                            </div> */}
                            <img src = {this.state.userInfo.picture} alt = {this.state.userInfo.user} className = {classes.UserImage}/>
                        </div>
                        <div className = {classes.UserPersonalInfo}>
                            <h2>{this.state.userInfo.user}</h2>
                            <h3>{this.state.userInfo.email}</h3>
                        </div>  
                    </div>
                    <div className = {classes.ProfileActivity}>
                        <h3>Activity</h3>
                    </div>
                </div>
                <div className = {classes.ProfileActivitySetail}>
                   {productsContainer}
                </div>
            </div>
            )
        }
        return (
            profileBody
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
        authenticated: state.authenticated
    }
}

export default connect(mapStateToProps)(FounderProfile);