import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import ProductPage from './containers/ProductPage/ProductPage.js';
import LoginPage from './containers/LoginPage/LoginPage.js';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <ProductPage />
          <LoginPage/>
        </Layout>
      </div>
    );
  }
}

export default App;
