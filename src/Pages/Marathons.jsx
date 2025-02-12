import axios from 'axios';
import { Card } from 'flowbite-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../Routes/AuthProvider';
function Marathons() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [cards, setCards] = React.useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === undefined) {
      navigate('/login');
      return;
    }
  }, [user]);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios('http://localhost:3000/api/marathons').then((res) => {
      setCards(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    });
  }, []);
  function sortCardsByDate() {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/marathons?sort=eventDay')
      .then((res) => {
        setCards(res.data);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Marathons</title>
        </Helmet>
        <div className='min-h-screen flex justify-center mx-auto items-center'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      </>
    );
  }
  return (
    <div className='container py-16 mx-auto px-4 md:px-20'>
      <Helmet>
        <title> Marathons | MedalTrack</title>
      </Helmet>
      <h1 className='text-4xl font-extrabold text-center '>Marathons</h1>
      <span
        onClick={sortCardsByDate}
        className='btn mx-auto text-center bg-primary-lime hover:bg-lime-500 border-black text-black rounded-full text-lg my-5 font-bold '>
        Sort by Date
      </span>
      <div className='cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-9'>
        {cards.map((card) => {
          return (
            <div
              className='max-w-sm min-w-sm justify-between  mx-auto border border-gray-300 flex flex-col gap-3 max-h-md min-h-md rounded-lg card px-4 py-6 shadow-md '
              key={card._id}>
              <figure>
                <img
                  className='h-56 w-full object-cover rounded-xl'
                  src={card.imageURL}
                  alt={card.title}
                />
              </figure>
              <h2 className='text-2xl font-bold tracking-tight'>
                {card.title}
              </h2>
              <span className='text-sm text-gray-500'>{card.eventDay}</span>
              <p className='font-normal '>{card.description}</p>
              <Link
                to={`/marathons/${card._id}`}
                className='btn w-full bg-primary-lime border-black text-black hover:bg-lime-500'>
                Read more
                <svg
                  className='-mr-1 ml-2 h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Marathons;
