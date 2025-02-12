import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  FaCalendarDays,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaUser,
} from 'react-icons/fa6';
import { Button, Modal } from 'flowbite-react';
import Swal from 'sweetalert2';
import { useAuth } from '../Routes/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function Marathon() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [marathon, setMarathon] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios(`http://localhost:3000/api/marathons?id=${id}`).then((res) => {
      setMarathon(res.data[0]);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const data = {
      name: name,
      phone: phone,
      user_email: user?.email,
      marathon_title: marathon?.title,
      marathon_start: marathon?.eventDay,
      marathon_id: id,
    };
    Swal.fire({
      title: 'Do you want to submit the application?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        axios.post('http://localhost:3000/api/applications', data);
        axios.patch(`http://localhost:3000/api/marathons/${id}`, {
          reg_count: marathon.reg_count + 1,
        });
        navigate('/myApplications');
        setOpenModal(false);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  const [isDisabled, setIsDisabled] = React.useState(false);
  useEffect(() => {
    if (!loading) {
      const EDate = new Date();
      const date = Date.parse(EDate);
      const start = Date.parse(marathon.eventDay);
      const end = Date.parse(marathon.registrationEnd);
      if (date > end) {
        setIsDisabled(false);
      }
      if (date > start || date < end) {
        setIsDisabled(true);
      }
    }
  }, [loading]);

  const [remainingTime, setRemainingTime] = React.useState(0);
  useEffect(() => {
    if (!loading) {
      const EDate = new Date(marathon.eventDay);

      const date = Date.parse(EDate);

      const remaining = (date - Date.parse(new Date())) / 1000;
      setRemainingTime(remaining);
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        <div className='min-h-screen flex justify-center mx-auto items-center'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Marathon | MedalTrack</title>
      </Helmet>
      <div className='min-h-screen'>
        <div className='container py-16 px-4 md:px-20'>
          <div>
            <h1 className='text-5xl font-extrabold'>Marathon Details</h1>
            <h2 className='text-2xl font-bold'>Details</h2>
            <div className='flex container mx-auto flex-col xl:flex-row gap-10 '>
              <div className='py-10'>
                <figure>
                  <img
                    className=' w-full object-cover rounded-xl'
                    src={marathon?.imageURL}
                    alt={marathon?.title}
                  />
                </figure>
              </div>
              <div className='py-10 max-w-lg'>
                <h1 className='text-4xl font-extrabold pt-2'>
                  {marathon?.title}
                </h1>
                <div className='py-5'>
                  <CountdownCircleTimer
                    isPlaying
                    size={110}
                    duration={parseInt(remainingTime)}
                    colors={[
                      '#a8e063',
                      '#a8e063',
                      '#a8e063',
                      '#fdffcb',
                      '#ff1e1e',
                    ]}
                    colorsTime={[7, 5, 2, 0]}>
                    {({ remainingTime }) =>
                      `${(remainingTime / 86400).toFixed(0)} days`
                    }
                  </CountdownCircleTimer>
                </div>
                <p className='text-md text-gray-500 font-medium flex gap-2 items-center'>
                  <FaCalendarDays />
                  {marathon?.eventDay}
                </p>
                <p className='text-md text-gray-500 font-medium flex gap-2 items-center py-2'>
                  <span className='font-bold'>Registration:</span>
                  <span>
                    {' '}
                    {marathon?.registrationStart} to{' '}
                    {marathon?.registrationEnding}
                  </span>
                </p>
                <p className='text-lg font-medium py-2'>{marathon?.subject}</p>
                <p>{marathon?.description}</p>

                <span className='text-lg font-medium py-2 flex items-center gap-2'>
                  <FaLocationDot />
                  <span className='font-bold'>Location:</span>{' '}
                  {marathon?.location}
                </span>

                <button
                  onClick={() => {
                    if (isDisabled) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Registration Closed',
                      });
                    } else {
                      setOpenModal(true);
                    }
                  }}
                  className='btn bg-primary-lime hover:bg-lime-500 border-black text-black rounded-full text-lg my-5 font-bold px-5'>
                  Apply Now!
                </button>
                <Modal
                  dismissible
                  show={openModal}
                  onClose={() => setOpenModal(false)}>
                  <Modal.Header>Apply Now</Modal.Header>
                  <Modal.Body>
                    <div className='space-y-6'>
                      <form
                        action=''
                        onSubmit={handleSubmit}
                        className='space-y-6'>
                        <span className='input input-bordered flex items-center gap-2'>
                          <span className='font-bold'>Name:</span>
                          <input
                            type='text'
                            className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
                            name='title'
                            value={marathon?.title}
                            readOnly
                            required
                            placeholder='Enter Your Email'
                          />
                        </span>
                        <span className='input input-bordered flex items-center gap-2'>
                          <span className='font-bold'>Starts:</span>
                          <input
                            type='text'
                            className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
                            name='starts'
                            value={marathon?.eventDay}
                            readOnly
                            required
                            placeholder='Enter Your Email'
                          />
                        </span>
                        <span className='input input-bordered flex items-center gap-2'>
                          <FaEnvelope />
                          <input
                            type='text'
                            className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
                            name='email'
                            value={user?.email}
                            required
                            placeholder='Enter Your Email'
                          />
                        </span>
                        <span className='input input-bordered flex items-center gap-2'>
                          <FaUser />
                          <input
                            type='text'
                            className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
                            name='name'
                            required
                            placeholder='Enter Your Name'
                          />
                        </span>
                        <span className='input input-bordered flex items-center gap-2'>
                          <FaPhone />

                          <input
                            type='text'
                            className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
                            name='phone'
                            required
                            placeholder='Enter Your Phone Number'
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                            }}
                          />
                        </span>
                        <button className='btn grow bg-primary-lime hover:bg-lime-500 border-black text-black rounded-full text-lg w-full my-5 font-bold px-5'>
                          Submit
                        </button>
                      </form>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Marathon;
