import React from 'react';
import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router';

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Sidebar
      aria-label='Default sidebar example'
      data-Theme='dark'
      className='w-screen md:w-64 md:h-screen '>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={() => {
              navigate('/dashboard');
            }}
            href='#'
            active={location.pathname === '/dashboard' ? true : false}
            icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>

          <Sidebar.Item
            onClick={() => {
              navigate('/addMarathon');
            }}
            active={location.pathname === '/addMarathon' ? true : false}
            icon={HiInbox}>
            Add Marathon
          </Sidebar.Item>
          <Sidebar.Item
            onClick={() => {
              navigate('/myMarathons');
            }}
            active={location.pathname === '/myMarathons' ? true : false}
            icon={HiUser}>
            My Marathons
          </Sidebar.Item>

          <Sidebar.Item
            onClick={() => {
              navigate('/myApplications');
            }}
            active={location.pathname === '/myApplications' ? true : false}
            icon={HiShoppingBag}>
            My Applications
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideNav;
