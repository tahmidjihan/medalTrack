import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  FaCalendarDays,
  FaBuildingUser,
  FaLocationDot,
  FaSackDollar,
  FaTag,
  FaUser,
  FaC,
} from 'react-icons/fa6';

function Marathon() {
  const { id } = useParams();
  const [marathon, setMarathon] = React.useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    axios(`http://localhost:3000/api/marathons?id=${id}`).then((res) => {
      setMarathon(res.data[0]);
    });
  }, []);
  //   console.log(`http://localhost:3000/api/marathons?id=${id}`);
  return (
    <>
      <div className='min-h-screen'>
        <div className='container py-16 px-4 md:px-20'>
          <div>
            <h1 className='text-5xl font-extrabold'>Marathon Details</h1>
            <h2 className='text-2xl font-bold'>Details</h2>
            <div className='py-10'>
              <h1 className='text-4xl font-extrabold pt-2'>
                {marathon?.title}
              </h1>
              <p className='text-md text-gray-500 font-medium flex gap-2 items-center'>
                <FaCalendarDays />
                {marathon?.date}
              </p>
              <p className='text-lg font-medium py-2'>{marathon?.subject}</p>
              <p>{marathon?.description}</p>

              <span className='text-xl font-medium py-2 flex items-center gap-2'>
                <FaSackDollar />
                <span className='font-bold'>Prize:</span> {marathon?.prize}
              </span>
              <span className='text-lg font-medium py-2 flex items-center gap-2'>
                <FaLocationDot />
                <span className='font-bold'>Location:</span>{' '}
                {marathon?.location}
              </span>
              <span className='text-lg font-medium py-2 flex items-center gap-2'>
                <FaBuildingUser />
                <span className='font-bold'>Organizer:</span>{' '}
                {marathon?.organizer}
              </span>
              <span className='text-lg font-medium py-2 flex items-center gap-2'>
                <FaUser />
                <span className='font-bold'>Contact:</span> {marathon?.contact}
              </span>
              <span className='flex gap-2 items-center'>
                <FaTag />
                <span className='font-bold'>Tags:</span>
                {marathon.races &&
                  marathon.races.map((race) => {
                    return (
                      <div className='badge badge-accent' key={race}>
                        {race}
                      </div>
                    );
                  })}
              </span>
              <button className='btn bg-primary-lime hover:bg-lime-500 border-black text-black rounded-full text-lg my-5 font-bold px-5'>
                Apply Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Marathon;
