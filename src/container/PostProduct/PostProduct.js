import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import classes from './PostProduct.module.css';

class PostProduct extends Component {

    state = {
        productFrom: {
            product_url: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'Product Url',
                    required: true
                },
                value: '',
                label: 'Product Url:'
            },
            product_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Name',
                    required: true
                },
                value: '',
                label: 'Product Name:'
            },
            product_topic: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Topic',
                    required: true
                },
                value: '',
                label: 'Product Topic:'
            },
            product_caption: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Caption',
                    required: true
                },
                value: '',
                label: 'Product Caption:'
            },
            product_image: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    placeholder: 'Product Thumbnail',
                    required: true
                },
                value: '',
                label: 'Product Thumbnail:'
            },
            product_download_link: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'Product Download Link',
                    required: true
                },
                value: '',
                label: 'Product Download Link:'
            },
            product_status: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Status',
                    required: true
                },
                value: '',
                label: 'Product Status:'
            },
            twitter_url: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'Twitter Url',
                    required: true
                },
                value: '',
                label: 'Twitter Url:'
            }, 
            product_description: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Product Description',
                    required: true
                },
                value: '',
                label: 'Product Description:'
            },
            product_launch: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Product Name',
                    required: true
                },
                value: '',
                label: 'Launch Date:'
            },
            product_created: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Created at',
                    required: true
                },
                value: '',
                label: 'Product Created:'
            }
        }
    }

    onchangeHandler = (event, element) => {
        const copiedProductForm = {...this.state.productFrom}
        const copiedPrdoductElement = {...copiedProductForm[element]}

        copiedPrdoductElement.value = event.target.value;
        copiedProductForm[element] = copiedPrdoductElement;
        this.setState({productForm: copiedProductForm});
    }

    render () {

        const productForm = [];

        for(let key in this.state.productFrom) {
            productForm.push({
                id: key,
                config: this.state.productFrom[key]
            })
        }

        let form = (
            <form className = {classes.ProductForm}>
                <h2>Create Product</h2>
                {productForm.map((formElement) => {
                    return <Input 
                    key = {formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed = {(event) => this.onchangeHandler(event, formElement.id)}
                    label = {formElement.config.label}/>
                })}
                <div className = {classes.ButtonContainer}>
                    <Button>Create Product</Button>
                </div> 
            </form>
        )
        return (
            <div className = {classes.formContainer}>
                {form}
            </div>
        );
    }
}

export default PostProduct;