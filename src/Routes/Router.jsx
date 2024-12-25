import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../App';
import Layout from './Layout';
import Home from '../Pages/Home';
import Authenticate from '../Pages/Authenticate';
import Marathon from '../Pages/Marathon';
import Marathons from '../Pages/Marathons';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout children={<Home />} />} />
      <Route
        path='/login'
        element={<Layout children={<Authenticate login={true} />} />}
      />
      <Route
        path='/register'
        element={<Layout children={<Authenticate login={false} />} />}
      />
      <Route
        path='/marathons/:id'
        element={<Layout children={<Marathon />} />}
      />
      <Route path='/marathons' element={<Layout children={<Marathons />} />} />
    </Routes>
  );
}

export default Router;
