import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Home from '../Pages/Home';
import Authenticate from '../Pages/Authenticate';
import Marathon from '../Pages/Marathon';
import Marathons from '../Pages/Marathons';
import UpdateMarathon from '../Pages/UpdateMarathon';
import MyMarathons from '../Pages/MyMarathons';
import Dashboard from '../Pages/Dashboard';
import SideNav from '../Components/SideNav';
import MyApplications from '../Pages/myApplications';
import UpdateApplication from './../Pages/updateApplication';
import Err from '../err';

function Router() {
  return (
    <Routes>
      <Route path='*' element={<Err />} />
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
        element={
          <Layout
            children={
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <UpdateMarathon isUpdate={true} />
              </div>
            }
          />
        }
      />
      <Route
        path='/addMarathon'
        element={
          <Layout
            children={
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <UpdateMarathon isUpdate={false} />
              </div>
            }
          />
        }
      />
      <Route
        path='/myMarathons'
        element={
          <Layout
            children={
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <MyMarathons />
              </div>
            }
          />
        }
      />
      <Route
        path='/myApplications'
        element={
          <Layout
            children={
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <MyApplications />
              </div>
            }
          />
        }
      />
      <Route
        path='/updateApplication/:id'
        element={
          <Layout
            children={
              <div className='flex gap-4 md:flex-row flex-col'>
                <SideNav />
                <UpdateApplication />
              </div>
            }
          />
        }
      />
      <Route
        path='/dashboard'
        element={
          <Layout
            children={
              <div className='flex gap-4 flex-wrap'>
                <SideNav />
                <Dashboard />
              </div>
            }
          />
        }
      />
    </Routes>
  );
}

export default Router;
