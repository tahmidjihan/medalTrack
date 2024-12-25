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
import { Link, useNavigate } from 'react-router';
function SideNav() {
  const navigate = useNavigate();
  return (
    <Sidebar
      aria-label='Default sidebar example'
      className='w-screen md:w-64 md:h-screen'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={() => {
              navigate('/dashboard');
            }}
            href='#'
            icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>

          <Sidebar.Item
            onClick={() => {
              navigate('/addMarathon');
            }}
            icon={HiInbox}>
            Add Marathon
          </Sidebar.Item>
          <Sidebar.Item
            onClick={() => {
              navigate('/myMarathons');
            }}
            icon={HiUser}>
            My Marathons
          </Sidebar.Item>

          <Sidebar.Item href='#' icon={HiShoppingBag}>
            Products
          </Sidebar.Item>

          <Sidebar.Item
            href='#'
            className='btn-error hover:bg-red-600 border-black btn'>
            <button>Logout</button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideNav;
