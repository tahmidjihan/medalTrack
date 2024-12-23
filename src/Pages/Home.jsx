import React from 'react';
import { Carousel } from 'flowbite-react';
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

  return (
    <>
      <HeroCarousel />
      <h1>Home</h1>
    </>
  );
}

export default Home;
