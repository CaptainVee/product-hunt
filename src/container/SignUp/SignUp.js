import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';

import classes from './SignUp.module.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import Spinner from '../../component/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary/Auxillary';
import * as actions from '../../store/actions/index';

toast.configure();
class SignUp extends Component {
    state = {
        signUpForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    required: true
                },
                value: '',
                errmsg: '',
                label: 'Username'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                    required: true
                },
                value: '',
                errmsg: '',
                label: 'Email'
            },
            email2: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Confirm Email',
                    required: true
                },
                value: '',
                errmsg: '',
                label: 'Confirm Email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    required: true
                },
                value: '',
                errmsg: '',
                label: 'Password'
            }
        },
        loading: false
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
        let confirmEmail = this.state.signUpForm.email2.value;
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
                const copiedconfirmEmailConfig = {...copiedSignupForm.email2};
                copiedconfirmEmailConfig.errmsg = 'Must match with Email';
                copiedSignupForm.email2 = copiedconfirmEmailConfig;
                this.setState({signUpForm: copiedSignupForm});
            }
            
        } else {
            let userData = {
                "username": this.state.signUpForm.username.value,
                "email": this.state.signUpForm.email.value,
                "email2": this.state.signUpForm.email2.value,
                "password": this.state.signUpForm.password.value
            }
            
            this.setState({loading: true});
            axios.post('https://restapi-4u.herokuapp.com/register/', userData)
            .then((response) => {
                this.notify();
                setTimeout(() => {
                    this.setState({loading: false});
                    this.props.onRedirect('./signin');
                }, 5000)
            })
            .catch((err) => {
                this.setState({loading: false});
                if(err.response.data) {
                    this.errorHandler(err.response.data);
                }
                
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

    errorHandler = (errorObject) => {
        for(let key in errorObject) {
            const copiedSignUpForm = {...this.state.signUpForm};
            const copiedFormElement = {...copiedSignUpForm[key]};
            copiedFormElement.errmsg = errorObject[key];
            copiedSignUpForm[key] = copiedFormElement;
            this.setState({signUpForm: copiedSignUpForm});
        }
    }

    notify = () => toast.success("REGISTRATION SUCCESSFUL!! ");


    render () { 
        let formElement = [];

        for(let key in this.state.signUpForm) {
            formElement.push({
                id: key,
                config: this.state.signUpForm[key]
            })
        }
        let formElements = null;
        if(!this.state.loading) {
            formElements = (<Aux>{formElement.map((formElement) => {
                return <Input 
                        key = {formElement.id}
                        value = {formElement.config.value}
                        changed = {(event) => this.onchangeHandler(event, formElement.id)}
                        elementConfig = {formElement.config.elementConfig}
                        elementType = {formElement.config.elementType}
                        label = {formElement.config.label}
                        errmsg = {formElement.config.errmsg}
                        />
                })}
                <div className = {classes.ButtonContainer}>
                    <Button>Sign Up</Button>
                </div></Aux>)
        } else {
            formElements = <Spinner />
        }
       

        let form = (
            <form className = {classes.SignUpForm} onSubmit = {this.onSubmitHandler}>
                <h2>Sign Up</h2>
                {formElements}
            </form>
        )

        let redirect = null;
        if(this.props.redirected) {
            redirect = <Redirect to = {this.props.redirectlink}/>
        }
        return (
            <div className = {classes.SignUpContainer}>
                {redirect}
                {form}
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        redirectlink: state.redirectLink,
        redirected: state.redirected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirect: (link) => dispatch(actions.redirect(link))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);