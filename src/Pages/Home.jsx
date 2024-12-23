import React from 'react';
import { Carousel } from 'flowbite-react';
function Home() {
  function HeroCarousel() {
    const slideInfo = [
      {
        title: 'Effortless Marathon Management',
        description:
          'Streamline every step of your marathon event with tools for registration, participant tracking, and real-time updates.',
        image: './../assets/marathon.jpg',
      },
      {
        title: 'Track Progress, Celebrate Achievement',
        description:
          'Empower participants with live tracking and instant result notifications that make every milestone unforgettable.',
        image: './../assets/finish.jpg',
      },
      {
        title: 'Sponsors & Community First',
        description:
          'Connect with audiences and showcase your brand with integrated sponsorship opportunities and meaningful analytics.',
        image: './../assets/marathon-large.jpg',
      },
    ];
  }
  return (
    <>
      <h1>this is home</h1>
    </>
  );
}

export default Home;
