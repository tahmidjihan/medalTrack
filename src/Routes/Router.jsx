import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../App';
import Layout from './Layout';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout children={<App />} />} />
    </Routes>
  );
}

export default Router;
