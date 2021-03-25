import React from 'react';


import classes from './Product.module.css';
// import ProductImage from '../../assets/mug.jpg';
import Comment from '../../assets/comment.svg';
import Arrow_Up from '../../assets/arrow_up.svg';

const Product = (props) => {

    let upVoteclasses = [classes.ProductVote]

    if(props.upvoteStatus) {
        if(upVoteclasses.length === 2) {
            let newUpvoteClasses = upVoteclasses.splice(1,1);
            newUpvoteClasses.push(classes.ProductUpVoted);
            upVoteclasses = newUpvoteClasses;
        }else {
            upVoteclasses.push(classes.ProductUpVoted);
        }
    }
    else {
        if(upVoteclasses.length === 2) {
            let newUpvoteClasses = upVoteclasses.splice(1,1);
            newUpvoteClasses.push(classes.NotProductUpVoted);
            upVoteclasses = newUpvoteClasses;
        }else {
            upVoteclasses.push(classes.NotProductUpVoted);
        }
    }
      
    return (
        <div className = {classes.Product}>
                <div className = {classes.ProductImgCountainer}>
                    <img src = {`https://restapi-4u.herokuapp.com${props.thumbnail}`} alt = 'Product'/>
                </div>
                <div className = {classes.ProductInfo}>
                    <div>
                        <h2 className = {classes.Title}>{props.title}</h2>
                        <p className = {classes.Caption}>{props.caption}</p>
                    </div>
                    <div className = {classes.ProductCommentSection}>
                        <div className = {classes.ProductComment}>
                            <img src={Comment} alt='Comment'/>
                            <p className = {classes.Number}>{props.comments}</p>
                        </div>
                        <div className = {classes.ProductCategory}>
                            <p className = {classes.Topics}>{props.topics}</p>
                        </div>
                    </div>
                </div>
                <div className = {upVoteclasses.join(' ')} onClick = {props.upvoted}>
                    <img src={Arrow_Up} alt = "Vote"/>
                    <p className = {classes.Number}>{props.total_upvotes}</p>
                </div>     
            </div>
    );
}

export default Product;