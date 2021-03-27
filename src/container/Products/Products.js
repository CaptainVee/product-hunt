import React, { Component } from 'react';
import classes from './Products.module.css';
import { connect } from 'react-redux';
import axios from 'axios';


import Product from '../../component/Product/Product';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary/Auxillary';

class Products extends Component {
    state = {
        products: [],
        loading: false
    }
    componentDidMount() {
        this.props.onResetRedirected();
        this.setState({loading: true})
        axios.get('https://restapi-4u.herokuapp.com')
        .then(response => {
            console.log(response);
            this.setState({products: response.data});
            this.setState({loading: false})
        }) 
        .catch(err => {
            this.setState({loading: false})
        })
    }

    topicsHandler = ( id ) => {
        const topics = {'1': 'IT and Software', 
                        '2': 'Design', 
                        '3': 'Personal Development', 
                        '4': 'Marketing', 
                        '5': 'Music', 
                        '6': 'Cloud'}

        for(let key in topics) {
            if(key === id) {
                return topics[key]
            }
        }
    }

    upvoteHandler = ( productId, token, authenticatedStatus, userId, event) => {
        event.stopPropagation();
        if( authenticatedStatus ) {
            axios.post(`https://restapi-4u.herokuapp.com/upvote/${productId}/`, null, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then((response) => {
                console.log(response)
                this.upVotedUpdateHandler(productId, userId);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    } 

    upvoteStatus = (productId, userId) => {
        let productIndex = this.state.products.findIndex((product) => {
            return product.id === productId;
        })
        let upvoteStatus = this.state.products[productIndex].upvoters.some((user) => {
            return user.id === userId;
        })
        return upvoteStatus;
    }

    upVotedUpdateHandler = (productId, userId) => {
        let copiedProductArray = [...this.state.products];
        let indexOfProduct = copiedProductArray.findIndex((product) => {
            return product.id === productId;
        })
        
        let upVoteChecker = copiedProductArray[indexOfProduct].upvoters.some((user) => {
            return user.id === +userId
        })

        if(upVoteChecker) {
            let newUpVoters = copiedProductArray[indexOfProduct].upvoters.filter((user) => {
                if(user.id === +userId){
                    copiedProductArray[indexOfProduct].total_upvotes = copiedProductArray[indexOfProduct].total_upvotes - 1;
                    return false
                }
                else {
                    return user;
                }
            })
            copiedProductArray[indexOfProduct].upvoters = newUpVoters;
            this.setState({products: copiedProductArray});
        }
        else{
            copiedProductArray[indexOfProduct].total_upvotes = copiedProductArray[indexOfProduct].total_upvotes + 1;
            let newUpVoters = [...copiedProductArray[indexOfProduct].upvoters];
            newUpVoters.push({id: userId});
            copiedProductArray[indexOfProduct].upvoters = newUpVoters;
            this.setState({products: copiedProductArray});
        }
        
    }

    render () {

        let productBody = null;

        const dateFormater = (fullDate) => {
            let date = new Date(fullDate).getDate();
            let month = new Date(fullDate).getMonth();
            let year = new Date(fullDate).getFullYear();

            if(date < 10) {
                date = `0${date}`;
            }

            if(month < 10) {
                month = `0${month}`
            }

            return `${year}-${month}-${date}`;
        }

        const productsLaunchDate = []

        const dateDisplayHandler = (fullDate) => {
            const monthArray = ['Janaury', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let date = new Date(fullDate).getDate();
            let month = new Date(fullDate).getMonth() + 1;
            let year = new Date(fullDate).getFullYear();

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

        this.state.products.forEach((product) => {
            let fulldate = dateFormater(product.launch_date);
            if(!productsLaunchDate.includes(fulldate)){
                productsLaunchDate.push(fulldate);
            }

        })

        const ProductBodyFunction = () => {
            let sortedProductBody = <div className = {classes.Products}>
                {productsLaunchDate.reverse().map((date) => {
                    return (
                        <Aux key = {date}>
                            <h2 className = {classes.Date}>{dateDisplayHandler(date)}</h2>
                            {productLooPFunction(date)}
                        </Aux>
                    )
                })}
            </div>
            return sortedProductBody
        }

        const productLooPFunction = (date) => {
            const productFilteredbyDate = this.state.products.filter((product) => {
                return date === dateFormater(product.launch_date)
            })
            const productsMapbyDate = productFilteredbyDate.map((product) => {
                return (
                    <Product key = {product.id}
                     title = {product.name}
                     caption = {product.caption}
                     thumbnail = {product.thumbnail}
                     topics = {this.topicsHandler(product.topics[0])}
                     total_upvotes = {product.total_upvotes}
                     comments = {product.comments}
                     upvoted = {(event) => this.upvoteHandler(product.id, this.props.token, this.props.authenticated, +this.props.userId, event)}
                     upvoteStatus = {this.upvoteStatus(product.id,  +this.props.userId)}
                     id = {product.id} {...this.props}/>
                )
            })

            return productsMapbyDate;
        }

        if(!this.state.loading) {
            productBody = ProductBodyFunction();
        }
        else {
            productBody = <Spinner />
        }

        return (
            <Aux>
               {productBody}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        authenticated: state.authenticated,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetRedirected: () => dispatch(actions.resetRedirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);