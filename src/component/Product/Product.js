import React from 'react';


import classes from './Product.module.css';
import Comment from '../../assets/comment.svg';
import Upvote from '../Upvote/Upvote';

const Product = (props) => {

    const productDetailRedirect = (productId) => {
        props.history.push(`/product-detail/${productId}`)
    }
    
    return (
        <div className = {classes.Product} onClick = {() => productDetailRedirect(props.id) }>
                <div className = {classes.ProductImgCountainer}>
                    <img src = {`${props.thumbnail}`} alt = 'Product'/>
                </div>
                <div className = {classes.ProductInfo}>
                    <div>
                        <h2 className = {classes.Title}>{props.title}</h2>
                        <p className = {classes.Caption}>{props.caption}</p>
                    </div>
                    <div className = {classes.ProductCommentSection}>
                        <div className = {classes.ProductComment}>
                            <img className = {classes.ProductCommentImg} src={Comment} alt='Comment'/>
                            <p className = {classes.Number}>{props.comments}</p>
                        </div>
                        <div className = {classes.ProductCategory}>
                            <p className = {classes.Topics}>{props.topics}</p>
                        </div>
                    </div>
                </div>
                <Upvote upvoted = {props.upvoted} total_upvotes = {props.total_upvotes} upvoteStatus = {props.upvoteStatus}/>
                
            </div>
    );
}


export default Product;