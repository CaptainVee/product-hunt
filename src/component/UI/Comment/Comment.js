import React from 'react'

import classes from './Comment.module.css';

const Comment = (props) => {
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateFormater = ( completeDate ) => {
        let date = new Date(completeDate).getDate();
        let month = new Date (completeDate).getMonth();
        let year = new Date (completeDate).getFullYear();

        let todayDate = new Date().getDate();
        let todayMonth = new Date().getMonth();
        let todayYear = new Date().getFullYear();
        if((date === todayDate) && (month === todayMonth) && (year === todayYear)) {
            return 'Today';
        }
        else if(year === todayYear) {
            return `${date} ${monthArray[month]}`;
        }
        else {
            return `${date} ${monthArray[month]}, ${year}`;
        }

    }
    return (
        <div className = {classes.Comment}>
            <div className = {classes.comentHeader}>
                <p className = {classes.Username}>{props.username}</p>
                <p className = {classes.Date}>{dateFormater(props.date)}</p>
            </div>
            <p className = {classes.CommentContent}>{props.content}</p>
            <small className = {classes.Reply} onClick = {props.reply}>Reply {`(${props.replies})`}</small>
            <div>{props.children}</div>
        </div>
    )
}

export default Comment;