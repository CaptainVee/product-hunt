import React, { Component } from 'react';
import axios from 'axios';

import classes from './Profile.module.css';
import { connect } from 'react-redux';
import Product from '../../component/Product/Product';
import Spinner from '../../component/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary/Auxillary';


class Profile extends Component {

    state = {
        userInfo: {
            product: []
        },
        loading: false
    }

    componentDidMount () {
        this.setState({loading: true});
        setTimeout(() => {
            let url = `https://restapi-4u.herokuapp.com/profile/${this.props.userId}/`;
            axios.get(url)
        .then((response) => {
            console.log(response);
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

    upVotedUpdateHandler = (productId, userId) => {
        let copiedState = {...this.state.userInfo}
        let copiedProductArray = [...copiedState.product];
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
            copiedState.product = copiedProductArray
            this.setState({userInfo: copiedState});
        }
        else{
            copiedProductArray[indexOfProduct].total_upvotes = copiedProductArray[indexOfProduct].total_upvotes + 1;
            let newUpVoters = [...copiedProductArray[indexOfProduct].upvoters];
            newUpVoters.push({id: userId});
            copiedProductArray[indexOfProduct].upvoters = newUpVoters;
            copiedState.product = copiedProductArray
            this.setState({userInfo: copiedState});
        }
        
    }
    render () {
        let profileBody = <Spinner />

        let productsContainer = null;

        if(this.state.userInfo.product.length === 0) {
            productsContainer = <p>You don't have any recent activity</p>
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
                            upvoted = {() => this.upvoteHandler(product.id, this.props.token, this.props.authenticated, +this.props.userId)}
                            upvoteStatus = {this.upvoteStatus(product.id,  +this.props.userId)}
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

export default connect(mapStateToProps)(Profile);