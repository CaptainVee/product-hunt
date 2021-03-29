import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import classes from './PostProduct.module.css';
import Spinner from '../../component/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary/Auxillary';

toast.configure();
class PostProduct extends Component {

    state = {
        productForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Name',
                    required: true
                },
                value: '',
                label: 'Product Name:'
            },
            url: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'Product Url',
                    required: true
                },
                value: '',
                label: 'Product Url:'
            },
            caption: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Caption',
                    required: true
                },
                value: '',
                label: 'Product Caption:'
            },
            download_link: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'Product Download Link'
                },
                value: '',
                label: 'Product Download Link:'
            },
            status: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'S', displayValue: 'Private'},
                        {value: 'P', displayValue: 'Public'},
                        {value: 'I', displayValue: 'In Progress'}
                    ]
                },
                value: 'S',
                label: 'Product Status:'
            }, 
            topics: {
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
            thumbnail: {
                elementType: 'input',
                elementConfig: {
                    type: 'file'
                },
                value: '',
                image: null,
                label: 'Product Thumbnail:'
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
            content: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Product Description',
                    required: true
                },
                value: '',
                label: 'Product Description:'
            }
        },
        loading: false
    }

    onchangeHandler = (event, element) => {
        const copiedProductForm = {...this.state.productForm}
        const copiedProductElement = {...copiedProductForm[element]}

            if(element === 'thumbnail') {
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
            
    }

    onSubmitProduct = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = new FormData ();
        formData.append('name', this.state.productForm.name.value);
        formData.append('url', this.state.productForm.url.value);
        formData.append('caption', this.state.productForm.caption.value);
        formData.append('download_link', this.state.productForm.download_link.value);
        formData.append('status', this.state.productForm.status.value);
        formData.append('topics', [this.state.productForm.topics.value]);
        formData.append('content', this.state.productForm.content.value);
        formData.append('twitter_url', this.state.productForm.twitter_url.value);
        if(this.state.productForm.thumbnail.image) {
            formData.append('thumbnail', this.state.productForm.thumbnail.image)
        }
        

        const url = 'https://restapi-4u.herokuapp.com/product/create/';
        axios.post(url, formData, {
            headers: {
                Authorization: `token ${this.props.token}`,
                'content-type': 'multipart/form-data'
            }
            
        })
        .then((response) => {
            this.thumbnailResetHandler();
            this.setState({loading: false})
            this.notify();
            this.props.history.push(`/product-detail/${response.data.id}`)
        })
        .catch((error) => {
            this.thumbnailResetHandler();
            console.log(error)
            this.setState({loading: false})
        })
    }

    notify = () => toast.success("Product Successfully Created!! ");

    thumbnailResetHandler = () => {
        const copiedProductFormState = {...this.state.productForm};

        const copiedThumbnail = copiedProductFormState.thumbnail;
        copiedThumbnail.image = null;
        copiedThumbnail.value = '';

        copiedProductFormState.thumbnail = copiedThumbnail;
        this.setState({productForm: copiedProductFormState});
    }

    render () {

        const productForm = [];

        for(let key in this.state.productForm) {
            productForm.push({
                id: key,
                config: this.state.productForm[key]
            })
        }

        let formBody = null;
        
        if(!this.state.loading) {
            formBody = (
                <Aux>
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
                </Aux>
            )
        }
        else {
            formBody = <Spinner />
        }

        let form = (
            <form className = {classes.ProductForm} onSubmit = {this.onSubmitProduct}>
                <h2>Create Product</h2>
                {formBody}
            </form>
        )

        return (
            <div className = {classes.formContainer}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}


export default connect(mapStateToProps)(PostProduct);