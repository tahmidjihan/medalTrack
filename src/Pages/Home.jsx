import React, { useEffect, useState } from 'react';
import { Carousel } from 'flowbite-react';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import { Link } from 'react-router';
function Home() {
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
                  className='h-full w-full object-cover'
                  src={slide.image}
                  alt={slide.title}
                />
                <div className='absolute inset-0 bg-black bg-opacity-50'></div>{' '}
                <div className='absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                  <h1 className='text-6xl uppercase font-bold text-white mb-4'>
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
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/marathons?size=6').then((result) => {
      setCards(result.data);
    });
  }, []);
  return (
    <>
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
          <div className='cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-9'>
            {cards.map((card) => {
              return (
                <Card className='max-w-sm' key={card._id}>
                  <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {card.title}
                  </h2>
                  <span className='text-sm text-gray-500'>{card.date}</span>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {card.subject}
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
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
