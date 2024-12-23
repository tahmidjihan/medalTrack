import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <>
      <footer
        className='footer footer-center bg-[#212121] p-10 text-white'
        data-theme='dark'>
        <aside className='flex flex-col items-center max-w-4xl text-[#ddddddbb]'>
          <a className='btn btn-ghost text-3xl font-bold flex flex-row bg-[#212121] text-white'>
            <img src='./medal.svg' className='w-10 h-10' alt='' />
            MedalTrack
          </a>
          <p className='pt-5'>
            Your go-to resource for navigating the process of studying abroad in
            Australia is Top Catalyst Consulting. We enable students to realize
            their educational goals by providing them with individualized
            support, professional supervision, and access to prestigious
            schools. Our staff guarantees a smooth process that is customized to
            your objectives, from course selection to visa assistance. With the
            support of Top Catalyst Consulting, you may confidently embark on
            your future.
          </p>
          <ul className='flex gap-6 pt-5 flex-col lg:flex-row font-medium text-white text-xl'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Services</li>
            <li>Courses</li>
          </ul>
          <button className='btn bg-primary-lime hover:bg-lime-500 text-black rounded-full text-lg my-5 font-bold px-5'>
            Run First Marathon
          </button>
        </aside>
        <hr className='border-t-4 border-[#dddddd88] pt-2 mx-5 rounded  w-full' />

        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </footer>
    </>
  );
}

export default Footer;
