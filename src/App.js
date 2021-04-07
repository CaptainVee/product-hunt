import React, { Component} from 'react';
import Products from './container/Products/Products';
import SignUp from './container/SignUp/SignUp';
import Layout from './component/Layout/Layout';
import PostProduct from './container/PostProduct/PostProduct';
import { connect } from 'react-redux';

import { Route, Switch} from 'react-router-dom';
import SignIn from './container/SignIn/SignIn';
import * as actions from './store/actions/index';
import Profile from './container/Profile/Profile';
import ProductDetail from './container/ProductDetail/ProductDetail';
import FounderProfile from './container/FounderProfile/FounderProfile';


class App extends Component {
  componentDidMount() {
    if(localStorage.getItem('token') && localStorage.getItem('userId')){
      if(this.props.token === '') {
        this.props.onAuthSuccessful(localStorage.getItem('token'), localStorage.getItem('userId'));
      }
    }else{
      this.props.onAuthFail();
    }
  }
  render () {
    return (
      <div>
         <Layout>
            <Switch>
              <Route path = '/profile' exact component = {Profile}/>
              <Route path = '/post-product' component = {PostProduct} />
              <Route path = '/signup' component = {SignUp}/>
              <Route path = '/signin' component = {SignIn}/>
              <Route path = '/product-detail/:id' exact component = {ProductDetail}/>
              <Route path = '/founder-profile/:founderId' exact component = {FounderProfile}/>
              <Route path = '/' component = {Products}/>
            </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccessful: (token, id) => dispatch(actions.authSuccessful(token, id)),
    onAuthFail: () => dispatch(actions.authFail())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
