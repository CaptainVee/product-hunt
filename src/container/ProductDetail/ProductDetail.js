import React, { Component } from 'react';
import classes from './ProductDetail.module.css';
import axios from 'axios';
import { connect } from 'react-redux';

import ProductImage from '../../assets/mug.jpg';
import UpvoteImage from '../../assets/arrow_up.svg';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';

class ProductDetail extends Component {

    state = {
        commentForm : {
            elementType: 'textarea',
            elementConfig: {
                placeholder: 'Comment',
                required: true
            },
            value: '',
        }
    }

    componentDidMount () {
        axios.get('https://restapi-4u.herokuapp.com/product/1/detail/')
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    onchangeHandler = (event) => {
        const newCommentForm = {...this.state.commentForm};
        newCommentForm.value = event.target.value;
        this.setState({commentForm: newCommentForm});
    }
    render () {
        return (
            <div className = {classes.ProductDetail}>
                <div className = {classes.ProductDetailHeader}>
                    <div className = {classes.ProductHeaderInfo}>
                        <div className = {classes.ImageContainer}>
                            <img src = {ProductImage} alt='Product'/>
                        </div>
                        <div className = {classes.ProductInfo}>
                            <h1>Product Title</h1>
                            <p className = {classes.Caption}>Product Caption</p>
                            <div className = {classes.TopicContainer}><p className = {classes.Topic}>Product Topics</p></div>
                        </div>
                    </div>
                    <div className = {classes.upVoteSection}>
                        <div className = {classes.UpvoteContainer}>
                            <img src = { UpvoteImage } alt = 'Upvote'/>
                            <p>Upvote</p>
                            <p>8</p>
                        </div>
                    </div>
                </div>

                <div className = {classes.ProductDescriptionSection}>
                    <div className={classes.ProductFonderSection}>
                        <h2>Bamidele (Founder)</h2>
                    </div>
                    <div className = {classes.ProductDescription}>
                        <p>Lorem ipsum dolor sit amet, \consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div className = {classes.CommentSectionContainer}>
                    <h2>Comment Section</h2>
                    <div className = {classes.comments}>
                    <p>Lorem ipsum dolor sit amet, \consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, \consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <Input elementType = {this.state.commentForm.elementType}
                    elementConfig = {this.state.commentForm.elementConfig}
                    value = {this.state.commentForm.value}
                    changed = {(event) => this.onchangeHandler(event)}/>
                    <div className = {classes.CommentButton}>
                        <Button>Comment</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        authenticated: state.authenticated
    }
}
export default connect(mapStateToProps)(ProductDetail);