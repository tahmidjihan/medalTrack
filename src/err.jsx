import React from 'react';
import { Link } from 'react-router';

function Err() {
  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <img
            src='https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?t=st=1739299083~exp=1739302683~hmac=9a64aad545c4ffb57c556a92616b35f28752b8ae5fc83c67459c458f91630fd1&w=740'
            alt='404'
            className='text-5xl font-extrabold'
          />
          <p className='mb-4 text-3xl tracking-tight font-bold '>
            Something's missing.
          </p>
          <p className='mb-4 text-lg font-light '>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{' '}
          </p>
          <Link
            to={'/'}
            className='btn bg-primary-lime rounded-full border-black hover:bg-lime-500 '>
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Err;
