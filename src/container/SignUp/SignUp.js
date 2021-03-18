import React, { Component } from 'react';

import classes from './SignUp.module.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';

class SignUp extends Component {
    state = {
        signUpForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    required: true
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                    required: true
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    required: true
                },
                value: ''
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password',
                    required: true
                },
                value: ''
            }
        }
    }

    onchangeHandler = (event, element) => {
        const updatedSignUpForm = {...this.state.signUpForm};

        const updatedSignUpElement = {...updatedSignUpForm[element]};

        updatedSignUpElement.value = event.target.value;

        updatedSignUpForm[element] = updatedSignUpElement;

        this.setState({signUpForm: updatedSignUpForm});
    } 

    onSubmitHandler = (event) => {
        event.preventDefault();
        let passwordValue = this.state.signUpForm.password.value;
        let confirmPassword = this.state.signUpForm.confirmPassword.value;

        if((passwordValue !== confirmPassword) && (passwordValue !== '' && confirmPassword !== '') ) {
            console.log('Hacked');
        }
    }

    render () {

        let formElement = [];

        for(let key in this.state.signUpForm) {
            formElement.push({
                id: key,
                config: this.state.signUpForm[key]
            })
        }

        let form = (
            <form className = {classes.SignUpForm} onSubmit = {this.onSubmitHandler}>
                <h2>Sign Up</h2>
                {formElement.map((formElement) => {
                    return <Input 
                            key = {formElement.id}
                            value = {formElement.config.value}
                            changed = {(event) => this.onchangeHandler(event, formElement.id)}
                            elementConfig = {formElement.config.elementConfig}
                            elementType = {formElement.config.elementType}
                            label = {formElement.id}/>
                })}
                    <div className = {classes.ButtonContainer}>
                        <Button>Sign Up</Button>
                    </div>
            </form>
        )
        return (
            <div className = {classes.SignUpContainer}>
                {form}
            </div>
        );
    }
}

export default SignUp;