import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../App';
import Layout from './Layout';
import Home from '../Pages/Home';
import Authenticate from '../Pages/Authenticate';
import Marathon from '../Pages/Marathon';
import Marathons from '../Pages/Marathons';
import UpdateMarathon from '../Pages/UpdateMarathon';
import MyMarathons from '../Pages/MyMarathons';

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
      <Route
        path='/updateMarathon/:id'
        element={<Layout children={<UpdateMarathon isUpdate={true} />} />}
      />
      <Route
        path='/addMarathon'
        element={<Layout children={<UpdateMarathon isUpdate={false} />} />}
      />
      <Route
        path='/myMarathons'
        element={<Layout children={<MyMarathons />} />}
      />
    </Routes>
  );
}

export default Router;
