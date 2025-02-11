import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';

function Navbar() {
  const { user, logOut } = useAuth();

  function Menu() {
    return (
      <>
        <li>
          <Link to='/'>Home</Link>
        </li>

        <li>
          <Link to='/marathons'>Marathons</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li className=' p-0'>
              <div>
                <img
                  src={user?.photoURL}
                  className='w-[50px] h-[50px] rounded-full'
                  alt=''
                />
              </div>
            </li>
            <li>
              <button onClick={logOut} className='bg-error font-bold'>
                Logout
              </button>
            </li>
          </>
        )}
      </>
    );
  }
  return (
    <>
      <div className='navbar bg-base-100 shadow-md px-10'>
        <div className='flex-1 container'>
          <Link
            to='/'
            className='btn btn-ghost text-xl font-bold flex flex-row bg-[#212121] text-white'>
            <img src='./../medal.svg' className='w-8 h-8' alt='Logo' />
            MedalTrack
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1 items-center hidden md:flex'>
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
