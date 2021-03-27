import React from 'react'

import classes from './Comment.module.css';

const Comment = (props) => {
    return (
        <div className = {classes.Comment}>
            <div className = {classes.comentHeader}>
                <p className = {classes.Username}>{props.username}</p>
                <p className = {classes.Date}>{props.date}</p>
            </div>
            <p className = {classes.CommentContent}>{props.content}</p>
            <small className = {classes.Reply}>Replies</small>
        </div>
    )
}

export default Comment;