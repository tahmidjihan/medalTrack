import React, { useEffect, useState } from 'react';
import { Carousel } from 'flowbite-react';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  function HeroCarousel() {
    const slideInfo = [
      {
        title: 'Effortless Marathon Management',
        description:
          'Simplify the entire marathon management process with our intuitive platform. From participant registration to organizing race-day logistics, MedalTrack is designed to handle it all. Our user-friendly tools make it easy to track registrations, manage participants, and oversee event updates in real-time, allowing you to focus on creating an unforgettable experience for everyone involved.',
        image: './marathon.jpg',
      },
      {
        title: 'Track Progress, Celebrate Achievement',
        description:
          'Give every runner a memorable experience with MedalTrack’s live tracking and instant result features. Participants can track their progress in real-time, making each milestone feel special. Our system ensures accurate results are delivered instantly, letting runners celebrate their achievements and share their success stories effortlessly.',
        image: './finish.jpg',
      },
      {
        title: 'Sponsors & Community First',
        description:
          'MedalTrack connects sponsors to their target audience while fostering a sense of community among participants and supporters. Showcase your brand seamlessly on participant interfaces, race materials, and event banners. Our platform provides detailed analytics to measure engagement and help sponsors create meaningful connections with the running community.',
        image: './marathon-large.jpg',
      },
    ];

    return (
      <>
        <div className='min-h-screen sm:h-64 xl:h-80 2xl:h-96'>
          <Carousel>
            {slideInfo.map((slide) => (
              <div
                key={slide.title}
                className='h-full w-full relative flex items-center justify-center'>
                <img
                  className='h-full min-h-screen cover w-full object-cover'
                  src={slide.image}
                  alt={slide.title}
                />
                <div className='absolute inset-0 bg-black bg-opacity-50'></div>{' '}
                <div className='absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                  <h1 className='text-4xl md:text-6xl uppercase font-bold text-white mb-4'>
                    {slide.title}
                  </h1>
                  <p className='text-lg text-white'>{slide.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </>
    );
  }
  const upcomingEvents = [
    {
      title: 'Desert Oasis Run',
      location: 'Dubai, UAE',
      shortDescription:
        'Run through the stunning dunes and breathtaking oases in this unique desert marathon.',
      date: '2025-04-15',
      distance: '21km-30km',
    },
    {
      title: 'Golden Gate Gallop',
      location: 'San Francisco, USA',
      shortDescription:
        'Experience the iconic Golden Gate Bridge and scenic bay views on this incredible race.',
      date: '2025-05-20',
      distance: '31km-40km',
    },
    {
      title: 'Highland Trails Challenge',
      location: 'Edinburgh, Scotland',
      shortDescription:
        'Conquer the rolling hills and historic landscapes of the Scottish Highlands.',
      date: '2025-06-10',
      distance: '41km-50km',
    },
    {
      title: 'Rainforest Adventure Marathon',
      location: 'Manaus, Brazil',
      shortDescription:
        "Run through lush Amazon rainforests and immerse yourself in nature's raw beauty.",
      date: '2025-07-05',
      distance: '16km-20km',
    },
    {
      title: 'Polar Circle Dash',
      location: 'Nuuk, Greenland',
      shortDescription:
        "Race under the Arctic skies in one of the world's coolest marathon experiences.",
      date: '2025-08-12',
      distance: '10km-15km',
    },
    {
      title: 'Cultural Crossroads Marathon',
      location: 'Istanbul, Turkey',
      shortDescription:
        'Traverse between continents in this marathon linking Asia and Europe.',
      date: '2025-09-18',
      distance: '21km-30km',
    },
  ];

  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .get('https://backend-11.vercel.app/api/marathons?size=6')
      .then((result) => {
        setCards(result.data);
        setIsLoading(false);
      });
  }, []);
  function limitText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
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
    <>
      <Helmet>
        <title>Home | MedalTrack</title>
      </Helmet>
      <HeroCarousel />
      <section>
        <div className='container mx-auto px-4 py-16'>
          <div className='section-header text-center '>
            <h1 className='text-4xl font-bold mb-4'>
              About Some Running Marathons
            </h1>
            <p>
              Explore the world of running marathons. Discover the thrill and
              excitement of these iconic events.Here is out top marathons
            </p>
          </div>
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
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {limitText(card.description, 90)}
                  </p>
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
      </section>
      <section>
        <div className='container mx-auto px-4 py-16'>
          <div className='section-header text-center '>
            <h1 className='text-4xl font-bold mb-4'>
              About Some Future Campaigns
            </h1>
            <p>
              Explore the world of running marathons. Discover the thrill and
              excitement of these iconic events.Here is out top marathons
            </p>
          </div>
          <div className='cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-9'>
            {upcomingEvents.map((card) => {
              return (
                <div
                  className='max-w-sm min-w-sm justify-between  mx-auto border border-gray-300 flex flex-col gap-3 max-h-md min-h-md rounded-lg card px-4 py-6 shadow-md '
                  key={card.title}>
                  <h2 className='text-2xl font-bold tracking-tight'>
                    {card.title}
                  </h2>
                  <span className='text-sm text-gray-500'>{card.date}</span>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {card.shortDescription}
                  </p>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {card.location}
                  </p>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {card.distance}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-9xl font-bold'>👋</h1>
            <h1 className='text-5xl font-bold'>Hello there Runner!</h1>
            <p className='py-6'>
              Welcome to MedalTrack, your ultimate destination for discovering
              and managing marathons across the globe. Explore our diverse
              lineup of races, from scenic coastal runs to challenging highland
              trails. Whether you're a seasoned marathoner or a first-time
              runner, MedalTrack connects you to events that inspire, challenge,
              and celebrate your passion for running. Track your progress,
              choose the perfect race, and take the first step toward earning
              your next medal with us. Let the journey begin!
            </p>
            <button className='btn bg-primary-lime rounded-full border-black hover:bg-lime-500 '>
              Get Started
            </button>
          </div>
        </div>
      </div>
      <section>
        <div className='flex h-full justify-center items-center dark:bg-gray-800'>
          <div className='p-6'>
            <div className='flex flex-wrap items-center w-full max-w-5xl p-5 mx-auto text-left border border-gray-200 rounded lg:flex-nowrap md:p-8 dark:border-gray-700'>
              <div className='flex-1 w-full mb-5 md:mb-0 md:pr-5 lg:pr-10 md:w-1/2'>
                <h3 className='mb-2 text-2xl font-bold text-gray-700 dark:text-gray-200'>
                  Subscribe to Newsletter
                </h3>
                <p className='text-gray-500 dark:text-gray-400 '>
                  Provide your email to get email notification when we launch
                  new products or publish new articles
                </p>
              </div>
              <div className='w-full px-1 flex-0 md:w-auto lg:w-1/2'>
                <form noValidate=''>
                  <input type='hidden' name='tags' defaultValue='earlyaccess' />
                  <div className='flex flex-col sm:flex-row'>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Enter your email address'
                      className='flex-1 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md sm:mr-5 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                    />
                    <button
                      type='button'
                      onClick={() => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Success',
                          text: 'You have successfully subscribed to our newsletter!',
                          showConfirmButton: false,
                          timer: 3000,
                        });
                      }}
                      className='btn bg-primary-lime rounded-full border-black hover:bg-lime-500 '>
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=''>
        <div className='min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12'>
          <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-r from-primary-lime to-lime-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
            <div className='text-white relative px-4 py-10 bg-lime-600 shadow-lg sm:rounded-3xl sm:p-20'>
              <div className='text-center pb-6'>
                <h1 className='text-3xl'>Contact Us!</h1>
                <p className='text-gray-300'>
                  Fill up the form below to send us a message.
                </p>
              </div>
              <form>
                <input
                  className='shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  placeholder='Name'
                  name='name'
                />
                <input
                  className='shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='email'
                  placeholder='Email'
                  name='email'
                />
                <input
                  className='shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  placeholder='Subject'
                  name='_subject'
                />
                <textarea
                  className='shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  placeholder='Type your message here...'
                  name='message'
                  style={{ height: 121 }}
                  defaultValue={''}
                />
                <div className='flex justify-between'>
                  <input
                    className='shadow bg-primary-lime  hover:bg-lime-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='button'
                    onClick={() => {
                      Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'You have successfully submitted your message!',
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    }}
                    defaultValue='Send ➤'
                  />
                  <input
                    className='shadow bg-primary-lime  hover:bg-lime-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='reset'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
