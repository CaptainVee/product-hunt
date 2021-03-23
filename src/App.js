import React, { Component} from 'react';
import Products from './container/Products/Products';
import SignUp from './container/SignUp/SignUp';
import Layout from './component/Layout/Layout';
import PostProduct from './container/PostProduct/PostProduct';
import { connect } from 'react-redux';

import { Route, Switch} from 'react-router-dom';
import SignIn from './container/SignIn/SignIn';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    if(localStorage.getItem('token')){
      if(this.props.token === '') {
        this.props.onAuthSuccessful(localStorage.getItem('token'))
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
              <Route path = '/post-product' component = {PostProduct} />
              <Route path = '/signup' component = {SignUp}/>
              <Route path = '/signin' component = {SignIn}/>
              <Route path = '/' exact component = {Products}/>
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
    onAuthSuccessful: (token) => dispatch(actions.authSuccessful(token)),
    onAuthFail: () => dispatch(actions.authFail())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
