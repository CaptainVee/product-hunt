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
                            comments = {product.comments}/>
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
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Profile);