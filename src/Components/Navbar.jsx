import React from 'react';

function Navbar() {
  function Menu() {
    return (
      <>
        <li>
          <a>Link 1</a>
        </li>
        <li>
          <a>Link 2</a>
        </li>
        <li>
          <a>Link 3</a>
        </li>
        <li>
          <a>Link 4</a>
        </li>
      </>
    );
  }
  return (
    <>
      <div className='navbar bg-base-100 shadow-md'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl font-bold flex flex-row bg-[#212121] text-white'>
            <img src='./medal.svg' className='w-8 h-8' alt='' />
            MedalTrack
          </a>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1 hidden md:flex'>
            <Menu></Menu>
          </ul>
          <div className='dropdown dropdown-left flex md:hidden'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
              <Menu></Menu>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
