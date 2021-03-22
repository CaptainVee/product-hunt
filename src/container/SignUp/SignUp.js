import React, { Component } from 'react';
import axios from 'axios';

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
                value: '',
                errmsg: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                    required: true
                },
                value: '',
                errmsg: ''
            },
            confirmEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Confirm Email',
                    required: true
                },
                value: '',
                errmsg: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    required: true
                },
                value: '',
                errmsg: ''
            }
        }
    }

    

    onchangeHandler = (event, element) => {
        const updatedSignUpForm = {...this.state.signUpForm};

        const updatedSignUpElement = {...updatedSignUpForm[element]};

        updatedSignUpElement.value = event.target.value;
        updatedSignUpElement.errmsg = '';

        updatedSignUpForm[element] = updatedSignUpElement;

        this.setState({signUpForm: updatedSignUpForm});
    } 

    onSubmitHandler = (event) => {
        event.preventDefault();
        let passwordValue = this.state.signUpForm.password.value;
        let confirmEmail = this.state.signUpForm.confirmEmail.value;
        let email = this.state.signUpForm.email.value

        const copiedSignupForm = {...this.state.signUpForm};
        
        if((passwordValue.length < 8) || (email !== confirmEmail)) {
            if(passwordValue.length < 8) {
                const copiedpasswordConfig = {...copiedSignupForm.password};
                copiedpasswordConfig.errmsg = 'Password must be up to 8 characters or more';
                copiedSignupForm.password = copiedpasswordConfig;
                this.setState({signUpForm: copiedSignupForm});
            }
    
            if((email !== confirmEmail)) {
                const copiedconfirmEmailConfig = {...copiedSignupForm.confirmEmail};
                copiedconfirmEmailConfig.errmsg = 'Must match with Email';
                copiedSignupForm.confirmEmail = copiedconfirmEmailConfig;
                this.setState({signUpForm: copiedSignupForm});
            }
            
        } else {
            let userData = {
                "username": this.state.signUpForm.name.value,
                "email": this.state.signUpForm.email.value,
                "email2": this.state.signUpForm.confirmEmail.value,
                "password": this.state.signUpForm.password.value
            }
            console.log(userData)
            axios.post('https://restapi-4u.herokuapp.com/register/', userData)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

            // axios.get('https://restapi-4u.herokuapp.com/')
            // .then((response) => {
            //     console.log(response)
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
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
                            label = {formElement.id}
                            errmsg = {formElement.config.errmsg}
                            />
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