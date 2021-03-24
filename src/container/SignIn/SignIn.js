import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './SignIn.module.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary/Auxillary';



class SignIn extends Component {

    state = {
        signInForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Username',
                    required: true
                },
                value: ''
            },
            // email: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'email',
            //         placeholder: 'Your Email',
            //         required: true
            //     },
            //     value: ''
            // },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password',
                    required: true
                },
                value: ''
            }
        },
        errmsg: '',
        loading: false
    }

    componentDidMount () {
        this.props.onRedirectReset();
    }

    errorHandler = (errMessageServer) => {
        let copiedErrorMessage = this.state.errmsg;
        copiedErrorMessage = errMessageServer;
        this.setState({errmsg: copiedErrorMessage})
    }
    onchangeHandler = (event, element) => {
        let copiedErrMsg = this.state.errmsg;
        copiedErrMsg = '';
        const copiedSignInForm = {...this.state.signInForm};

        const copiedchangedElement = {...copiedSignInForm[element]};

        copiedchangedElement.value = event.target.value;
        copiedSignInForm[element] = copiedchangedElement;
        this.setState({signInForm: copiedSignInForm});
        this.setState({errmsg: copiedErrMsg});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        let loginDetails = {
            username: this.state.signInForm.username.value,
            password: this.state.signInForm.password.value
        }
        axios.post('https://restapi-4u.herokuapp.com/login/', loginDetails)
        .then((response) => {
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('token', response.data.token);
            this.props.onAuthSuccessfull(response.data.token, response.data.id);
            this.setState({loading: false});
            this.props.onRedirect('/');
        })
        .catch((err) => {
            this.setState({loading: false})
            this.errorHandler(err.response.data.non_field_errors[0]);
        })
    }

    render () {

        let formElements = [];

        for(let key in this.state.signInForm) {
            formElements.push({
                id: key,
                config: this.state.signInForm[key]
            });
        }

        let formElement = null;

        if(!this.state.loading){
            formElement = (<Aux>
                {formElements.map((formElement) => {
                    return <Input key = {formElement.id} 
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            label = {formElement.id}
                            changed = {(event) => this.onchangeHandler(event, formElement.id)}/>
                })}
                <small className = {classes.Small}>{this.state.errmsg}</small>
                <div className = {classes.ButtonContainer}>
                    <Button >Sign In</Button>
                </div>
            </Aux>);
        }
        else {
            formElement = <Spinner />
        }

        let redirectElement = null;

        if(this.props.redirected){
            redirectElement = <Redirect to = {this.props.redirectlink}/>
        }

        let form = (
            <form className = {classes.SignInForm} onSubmit = {this.onSubmitHandler}>
                <h2>Sign In</h2>
                {formElement}
            </form>
        )
        return (
            <div className = {classes.FormContainer}>
                {redirectElement}
                {form}
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
        onRedirectReset: () => dispatch(actions.resetRedirect()),
        onRedirect: (path) => dispatch(actions.redirect(path)),
        onAuthSuccessfull: ( token, id ) => dispatch(actions.authSuccessful(token, id)),
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);