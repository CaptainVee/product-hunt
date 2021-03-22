import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import classes from './PostProduct.module.css';

class PostProduct extends Component {

    state = {
        productForm: {
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
            product_topics: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '1', displayValue: 'IT and Software'},
                        {value: '2', displayValue: 'Design'},
                        {value: '3', displayValue: 'Personal Development'},
                        {value: '4', displayValue: 'Marketing'},
                        {value: '5', displayValue: 'Music'},
                        {value: '6', displayValue: 'Cloud'}
                    ],
                },
                value: '1',
                label: 'Product Topics:'
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
                    placeholder: 'Product Thumbnail'
                },
                value: '',
                image: null,
                label: 'Product Thumbnail:'
            },
            product_download_link: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'Product Download Link'
                },
                value: '',
                label: 'Product Download Link:'
            },
            product_status: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'S', displayValue: 'Private'},
                        {value: 'P', displayValue: 'Public'},
                        {value: 'I', displayValue: 'In Progress'}
                    ]
                },
                value: '',
                label: 'Product Status:'
            },
            twitter_url: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'Twitter Url'
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
                    placeholder: 'Product Name'
                },
                value: '',
                label: 'Launch Date:'
            },
            product_created: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Created at'
                },
                value: '',
                label: 'Product Created:'
            }
        }
    }


    onchangeHandler = (event, element) => {
        const copiedProductForm = {...this.state.productForm}
        const copiedProductElement = {...copiedProductForm[element]}

        // if(element === 'product_topics'){
        //     if(!copiedProductElement.value.includes(event.target.value)) {
        //         const newValueArray = [...copiedProductElement.value]
        //         newValueArray.push(event.target.value);
        //         console.log(event.target.value);
        //         copiedProductElement.value = newValueArray;
        //         copiedProductForm[element] = copiedProductElement;
        //         this.setState({productForm: copiedProductForm});
        //     }
        //     else {
        //         // let valueIndex = copiedProductElement.value.findIndex((value) => {
        //         //     return value === event.target.value;
        //         // });
        //         // console.log(valueIndex);
        //     }
        // }
        // else {
            if(element === 'product_image') {
                copiedProductElement.image = event.target.files[0];
                copiedProductElement.value = event.target.value;
                copiedProductForm[element] = copiedProductElement;
                this.setState({productForm: copiedProductForm});
            }
            else{
                copiedProductElement.value = event.target.value;
                copiedProductForm[element] = copiedProductElement;
                this.setState({productForm: copiedProductForm});
            }
            
        // }
    }

    onSubmitProduct = (event) => {
        event.preventDefault();

        const formData = new FormData ();
        formData.append('name', this.state.productForm.product_name.value);
        formData.append('url', this.state.productForm.product_url.value);
        formData.append('caption', this.state.productForm.product_caption.value);
        formData.append('download_link', this.state.productForm.product_download_link.value);
        formData.append('status', this.state.productForm.product_status.value);
        formData.append('topics', [this.state.productForm.product_topics.value]);
        formData.append('content', this.state.productForm.product_description.value);
        formData.append('twitter_url', this.state.productForm.twitter_url.value);
        formData.append('thumbnail', this.state.productForm.product_image.image)

        // const productDetails = {
        //     name: this.state.productForm.product_name.value,
        //     url: this.state.productForm.product_url.value,
        //     caption: this.state.productForm.product_caption.value,
        //     download_link: this.state.productForm.product_download_link.value,
        //     status: this.state.productForm.product_status.value,
        //     topics: [this.state.productForm.product_topics.value],
        //     content: this.state.productForm.product_description.value,
        //     twitter_url: this.state.productForm.twitter_url.value,
        //     thumbnail: this.state.productForm.product_image.image
        // }

        const url = 'https://restapi-4u.herokuapp.com/product/create/';
        axios.post(url, formData, {
            headers: {
                Authorization: 'token 339f34e962796d2c388b91c5d0b54839b6e2205a',
                'content-type': 'multipart/form-data'
            }
            
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render () {

        const productForm = [];

        for(let key in this.state.productForm) {
            productForm.push({
                id: key,
                config: this.state.productForm[key]
            })
        }

        let form = (
            <form className = {classes.ProductForm} onSubmit = {this.onSubmitProduct}>
                <h2>Create Product</h2>
                {productForm.map((formElement) => {
                    return <Input 
                    key = {formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed = {(event) => this.onchangeHandler(event, formElement.id)}
                    label = {formElement.config.label}
                    />
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