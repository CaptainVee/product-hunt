import React from 'react';


import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    let  inputClasses = [classes.InputElement];


    switch (props.elementType) {
        case ('input'):
            inputElement = <input className = {inputClasses.join(' ')} {...props.elementConfig} value = {props.value} 
            onChange = {props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className = {inputClasses.join(' ')} {...props.elementConfig} value = {props.value}
            onChange = {props.changed}/>;
            break;
        
        case ('file'):
            inputElement = <input className = {inputClasses.join(' ')} {...props.elementConfig} value = {props.value}
            onChange = {props.changed}/>;
            break;
        default: 
        inputElement = <input className ={inputClasses.join(' ')} {...props.elementConfig} value = {props.value}/>
    }

    return (
        <div className = {classes.Input}>
            <label className = {classes.Label}> {props.label} </label>
            {inputElement}
            <small className = {classes.Small}>{props.errmsg}</small>
        </div>
    );
}

export default Input;