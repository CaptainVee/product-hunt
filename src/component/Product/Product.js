import React from 'react';


import classes from './Product.module.css';
import ProductImage from '../../assets/mug.jpg';
import Comment from '../../assets/comment.svg';
import Arrow_Up from '../../assets/arrow_up.svg';

const Product = (props) => {
    return (
        <div className = {classes.Product}>
                <div className = {classes.ProductImgCountainer}>
                    <img src = {ProductImage} alt = 'Product'/>
                </div>
                <div className = {classes.ProductInfo}>
                    <div>
                        <h2>Product Title</h2>
                        <p>Product Description</p>
                    </div>
                    <div className = {classes.ProductCommentSection}>
                        <div className = {classes.ProductComment}>
                            <img src={Comment} alt='Comment'/>
                            <p>56</p>
                        </div>
                        <div className = {classes.ProductCategory}>
                            <p>Design</p>
                        </div>
                    </div>
                </div>
                <div className = {classes.ProductVote}>
                    <img src={Arrow_Up} alt = "Vote"/>
                    <p>79</p>
                </div>     
            </div>
    );
}

export default Product;