import React, { Component } from 'react';
import classes from './ProductDetail.module.css';
import axios from 'axios';
import { connect } from 'react-redux';


import UpvoteImage from '../../assets/arrow_up.svg';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import Comment from '../../component/UI/Comment/Comment';
import Reply from '../../component/UI/Reply/Reply';
import Aux from '../../hoc/Auxillary/Auxillary';

class ProductDetail extends Component {

    state = {
        productDetails: {
            upvote: [],
            upvoteLength: null,
            comments: [],
            topics: []
        },
        commentForm : {
            elementType: 'textarea',
            elementConfig: {
                placeholder: 'Comment',
                required: true
            },
            value: '',
        },
        replyForm : {
            elementType: 'textarea',
            elementConfig: {
                placeholder: 'Reply',
                required: true
            },
            value: '',
        },
        loading: false,
        currentCommentReply: null
    }

    componentDidMount () {
        this.setState({loading: true})
        let productId = this.props.match.params.id
        axios.get(`https://restapi-4u.herokuapp.com/product/${productId}/detail/`)
        .then((response) => {
            let copiedStateProductDetail = {...this.state.productDetails};
            copiedStateProductDetail = response.data;
            let copiedStateProductDetailUpvote = [...copiedStateProductDetail.upvote];
            let copiedComments = [...copiedStateProductDetail.comments];
            let copiedTopics = [...copiedStateProductDetail.topics];
            copiedTopics = response.data.topics
            copiedComments = response.data.comments 
            copiedStateProductDetailUpvote = response.data.upvote;
            copiedStateProductDetail.upvoteLength = response.data.upvote.length;
            copiedStateProductDetail.upvote = copiedStateProductDetailUpvote;
            copiedStateProductDetail.comments = copiedComments;
            copiedStateProductDetail.topics = copiedTopics;
            this.setState({productDetails: copiedStateProductDetail});
            this.setState({loading: false});
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
            this.setState({loading: false})
        })
    }

    topicsHandler = ( id ) => {
        let topicId = (String(id))
        const topics = {'1': 'IT and Software', 
                        '2': 'Design', 
                        '3': 'Personal Development', 
                        '4': 'Marketing', 
                        '5': 'Music', 
                        '6': 'Cloud'}
        for(let key in topics) {
            if(key === topicId) {
                return topics[key]
            }
        }
    }

    upvoteHandler = (token, userId, productId, authenticatedStatus) => {
        if( authenticatedStatus ) {
            axios.post(`https://restapi-4u.herokuapp.com/upvote/${productId}/`, null, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then((response) => {
                console.log(response)
                this.upVotedUpdateHandler(userId);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    upVotedUpdateHandler = (userId) => {
        let copiedState = {...this.state.productDetails}
        let copiedTotalvotes = [...copiedState.upvote];
        
        let upVoteChecker = copiedTotalvotes.some((user) => {
            return user === +userId
        })

        if(upVoteChecker) {
            let newUpVoters = copiedTotalvotes.filter((user) => {
                if(user === +userId){
                    copiedState.upvoteLength = copiedState.upvoteLength - 1;
                    return false
                }
                else {
                    return user;
                }
            })
            copiedTotalvotes = newUpVoters;
            copiedState.upvote = copiedTotalvotes
            this.setState({productDetails: copiedState});
        }
        else{
            let newUpVoters = [...copiedTotalvotes];
            newUpVoters.push(userId);
            copiedState.upvoteLength = copiedState.upvoteLength + 1;
            copiedTotalvotes = newUpVoters;
            copiedState.upvote = copiedTotalvotes
            this.setState({productDetails: copiedState});
        }
        
    }

    onchangeHandler = (event, element) => {
        if(element === 'commentForm') {
            const newCommentForm = {...this.state.commentForm};
            newCommentForm.value = event.target.value;
            this.setState({commentForm: newCommentForm});
        }
        else if (element === 'replyForm') {
            const newReplyForm = {...this.state.replyForm};
            newReplyForm.value = event.target.value;
            this.setState({replyForm: newReplyForm})
        }
    }

    onCommentHandler = (event, productId) => {
        event.preventDefault();
        if(this.props.authenticated) {
            let commentContent = {
                content: this.state.commentForm.value
            }
            axios.post(
                `https://restapi-4u.herokuapp.com/comment/create/?pk=${productId}`, commentContent, {
                headers: {
                    Authorization: `token ${this.props.token}`
                }
            })
            .then((response) => {
                const copiedProductDetail = {...this.state.productDetails}
                let copiedCommentArray = [...copiedProductDetail.comments];
                copiedCommentArray.push({content: response.data.content});
                copiedProductDetail.comments = copiedCommentArray;
                console.log(copiedCommentArray)
                this.setState({productDetails: copiedProductDetail});
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }

    replyClicked = (event, id) => {
        if(!this.state.currentCommentReply || this.state.currentCommentReply !== id) {
            this.setState({currentCommentReply: id})
            const newReplyForm = {...this.state.replyForm};
            newReplyForm.value = event.target.value;
            this.setState({replyForm: newReplyForm})
        }
        else {
            this.setState({currentCommentReply: null})
            const newReplyForm = {...this.state.replyForm};
            newReplyForm.value = event.target.value;
            this.setState({replyForm: newReplyForm})
        }
    }

    onReplyHandler = (event, commentId) => {
        event.preventDefault();
        console.log(commentId);
    }
    render () {

        const replyBodyFunction = (comment) => {
            if(comment.id === this.state.currentCommentReply) {
                let replyBody = comment.replies.map((reply) => {
                    return (
                        <Reply 
                        key = {reply.timestamp}
                        username = {reply.username}
                        date = {reply.timestamp}
                        content = {reply.content}/>
                    )
                });

                return (
                    <Aux>
                        {replyBody}
                        <form onSubmit ={(event) => this.onReplyHandler(event, comment.id)}>
                                <Input elementType = {this.state.replyForm.elementType}
                                elementConfig = {this.state.replyForm.elementConfig}
                                value = {this.state.replyForm.value}
                                changed = {(event) => this.onchangeHandler(event, 'replyForm')}/>
                                <Button> Reply </Button>
                                </form>
                    </Aux>
                )
            }
            else {
                return null
            }
        }

        let productDetail = <Spinner />;
        if(!this.state.loading) {
            productDetail = (
                <div className = {classes.ProductDetail}>
                <div className = {classes.ProductDetailHeader}>
                    <div className = {classes.ProductHeaderInfo}>
                        <div className = {classes.ImageContainer}>
                            <img src = {this.state.productDetails.thumbnail} alt='Product'/>
                        </div>
                        <div className = {classes.ProductInfo}>
                            <h1>{this.state.productDetails.name}</h1>
                            <p className = {classes.Caption}>{this.state.productDetails.caption}</p>
                            <div className = {classes.TopicContainer}><p className = {classes.Topic}>{this.topicsHandler(this.state.productDetails.topics[0])}</p></div>
                        </div>
                    </div>
                    <div className = {classes.upVoteSection}>
                        <div className = {classes.UpvoteContainer} onClick = {() => this.upvoteHandler(this.props.token, +this.props.userId, this.props.match.params.id, this.props.authenticated)}>
                            <img src = { UpvoteImage } alt = 'Upvote'/>
                            <p>Upvote</p>
                            <p>{this.state.productDetails.upvoteLength}</p>
                        </div>
                    </div>
                </div>

                <div className = {classes.ProductDescriptionSection}>
                    <div className={classes.ProductFonderSection}>
                        <h2>{this.state.productDetails.username} (Founder)</h2>
                    </div>
                    <div className = {classes.ProductDescription}>
                        <p>{this.state.productDetails.content}</p>
                    </div>
                </div>
                <div className = {classes.CommentSectionContainer}>
                    <h2>Comments</h2>
                    <div className = {classes.comments}>
                    {this.state.productDetails.comments.reverse().map((comment) => {
                        return <Comment key = {comment.id}
                        username = {comment.username}
                        date = {comment.timestamp}
                        content = {comment.content}
                        replies = {comment.replies.length}
                        reply = {(event) => this.replyClicked (event, comment.id)}> 
                            <div className = {classes.Replies}>
                                {replyBodyFunction(comment)}
                            </div>
                        </Comment>
                    })}
                    
                    </div>
                    <form onSubmit = {(event) => this.onCommentHandler(event, this.props.match.params.id)}>
                        <Input elementType = {this.state.commentForm.elementType}
                        elementConfig = {this.state.commentForm.elementConfig}
                        value = {this.state.commentForm.value}
                        changed = {(event) => this.onchangeHandler(event, 'commentForm')}/>
                        <div className = {classes.CommentButton}>
                            <Button>Comment</Button>
                        </div>
                    </form>
                   
                </div>
            </div>
            )
        }
        return (
            productDetail
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        authenticated: state.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetRedirect : () => dispatch(actions.resetRedirect())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);