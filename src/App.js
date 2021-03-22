import Products from './container/Products/Products';
import SignUp from './container/SignUp/SignUp';
import Layout from './component/Layout/Layout';
import PostProduct from './container/PostProduct/PostProduct';

import { Route, Switch} from 'react-router-dom';
import SignIn from './container/SignIn/SignIn';

function App() {
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

export default App;
