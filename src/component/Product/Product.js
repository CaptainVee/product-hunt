import React from 'react';


import classes from './Product.module.css';
// import ProductImage from '../../assets/mug.jpg';
import Comment from '../../assets/comment.svg';
import Arrow_Up from '../../assets/arrow_up.svg';

const Product = (props) => {
    const initilaHanhler = (initial) => {
         let [firstInitial] = initial;
         return firstInitial;
    }
    let newThumbnail = null;
    if(props.thumbnail ){
        newThumbnail = (<div className = {classes.Initial}>
            <h2>{initilaHanhler(props.title)}</h2>
        </div>)
    }   
    return (
        <div className = {classes.Product}>
                <div className = {classes.ProductImgCountainer}>
                    {/* <img src = {props.thumbnail} alt = 'Product'/> */}
                    {newThumbnail}
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
                <div className = {classes.ProductVote}>
                    <img src={Arrow_Up} alt = "Vote"/>
                    <p className = {classes.Number}>{props.total_upvotes}</p>
                </div>     
            </div>
    );
}

export default Product;