import React from 'react';
import Lottie from 'lottie-react';
import loginLottie from '../assets/login.json';
import registerLottie from '../assets/register.json';
import { useAuth } from '../Routes/AuthProvider';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

function Authenticate({ login }) {
  const { signUp, loginWithGoogle, signIn, user } = useAuth();
  const [passError, setPassError] = React.useState('');
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (passError !== '') {
      if (login) {
        signIn(email, password);
      } else {
        const name = e.target.name.value;
        const image = e.target.image.value;
        signUp(email, password, name, image);
      }
    } else {
      setPassError('Passwords cannot be empty');
    }
  }
  if (user) {
    navigate('/');
    return null;
  }
  return (
    <>
      <Helmet>
        <title>{login ? 'Login' : 'Register'} | MedalTrack</title>
      </Helmet>
      <>
        <div className='flex h-screen'>
          {/* Left Pane */}
          <div className='hidden lg:flex items-center justify-center flex-1 text-black'>
            <div className='absolute'>
              <Lottie
                animationData={login ? loginLottie : registerLottie}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          {/* Right Pane */}
          <div className='w-full lg:w-1/2 flex items-center justify-center'>
            <div className='max-w-md w-full p-6'>
              <h1 className='text-4xl font-bold mb-6 text-center'>
                {login ? 'Login Now!' : 'Register Now!'}
              </h1>
              <h1 className='text-sm font-semibold mb-6 text-gray-500 text-center'>
                Join to Our Community with all time access and free features to
                manage your marathon.
              </h1>
              <div className='mt-4 flex flex-col lg:flex-row items-center justify-between'>
                <div className='w-full mb-2 lg:mb-0'>
                  <span
                    onClick={loginWithGoogle}
                    type='button'
                    className='w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                      className='w-4'
                      id='google'>
                      <path
                        fill='#fbbb00'
                        d='M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z'
                      />
                      <path
                        fill='#518ef8'
                        d='M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z'
                      />
                      <path
                        fill='#28b446'
                        d='m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z'
                      />
                      <path
                        fill='#f14336'
                        d='m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z'
                      />
                    </svg>{' '}
                    Sign In with Google{' '}
                  </span>
                </div>
              </div>
              <div className='mt-4 text-sm text-gray-400 text-center'>
                <p>or with email</p>
              </div>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Your form elements go here */}
                {!login && (
                  <>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700'>
                        Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        required
                        className='mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='image'
                        className='block text-sm font-medium text-gray-700'>
                        Profile Image
                      </label>
                      <input
                        type='text'
                        id='image'
                        name='Image'
                        required
                        className='mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
                      />
                    </div>
                  </>
                )}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='text'
                    id='email'
                    name='email'
                    required
                    className='mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value.length < 6) {
                        setPassError(
                          'Password must be at least 6 characters long'
                        );
                      } else if (
                        !e.target.value.contains(
                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
                        )
                      ) {
                        setPassError(
                          'Password must contain at least one letter and one number'
                        );
                      } else {
                        setPassError('');
                      }
                    }}
                    required
                    className='mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300'
                  />
                  <span className='text-sm text-red-500'>{passError}</span>
                </div>
                <div>
                  <button className='w-full btn border border-black bg-primary-lime text-black p-2 rounded-md hover:bg-lime-500 focus:outline-none focus:bg-lime-600 focus:ring-2 focus:ring-offset-2 '>
                    {login ? 'Login' : 'Sign Up'}
                  </button>
                </div>
              </form>
              <div className='mt-4 text-sm text-gray-400 text-center'>
                <p>
                  {login
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <button
                    type='button'
                    onClick={() =>
                      login ? navigate('/register') : navigate('/login')
                    }
                    className='btn btn-sm rounded-full text-black border-1 border-gray-300 bg-primary-lime hover:bg-lime-500'>
                    {login ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Authenticate;
