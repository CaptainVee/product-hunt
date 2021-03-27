import React from 'react';


import classes from './Upvote.module.css';
import Arrow_Up from '../../assets/arrow_up.svg';

const Upvote = (props) => {
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
        <div className = {upVoteclasses.join(' ')} onClick = {props.upvoted}>
            <img src={Arrow_Up} alt = "Vote"/>
            <p className = {classes.Number}>{props.total_upvotes}</p>
        </div> 
    );
}

export default Upvote;