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
} from 'react-icons/fa6';
import { Button, Modal } from 'flowbite-react';

function Marathon() {
  const { id } = useParams();
  const [marathon, setMarathon] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
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
              <button
                onClick={() => setOpenModal(true)}
                className='btn bg-primary-lime hover:bg-lime-500 border-black text-black rounded-full text-lg my-5 font-bold px-5'>
                Apply Now!
              </button>
              <Modal
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                  <div className='space-y-6'>
                    <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                      With less than a month to go before the European Union
                      enacts new consumer privacy laws for its citizens,
                      companies around the world are updating their terms of
                      service agreements to comply.
                    </p>
                    <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                      The European Union’s General Data Protection Regulation
                      (G.D.P.R.) goes into effect on May 25 and is meant to
                      ensure a common set of data rights in the European Union.
                      It requires organizations to notify users as soon as
                      possible of high-risk data breaches that could personally
                      affect them.
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setOpenModal(false)}>I accept</Button>
                  <Button color='gray' onClick={() => setOpenModal(false)}>
                    Decline
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Marathon;
