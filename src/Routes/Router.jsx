import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../App';
import Layout from './Layout';
import Home from '../Pages/Home';
import Authorization from './../Pages/Authorization';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout children={<Home />} />} />
      <Route
        path='/login'
        element={<Layout children={<Authorization login={true} />} />}
      />
      <Route
        path='/register'
        element={<Layout children={<Authorization login={false} />} />}
      />
    </Routes>
  );
}

export default Router;
