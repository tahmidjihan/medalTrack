import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from './../Components/Footer';

function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
}

export default Layout;
