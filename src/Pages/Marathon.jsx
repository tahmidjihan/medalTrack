import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
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

function Marathon() {
  const { id } = useParams();
  const { user } = useAuth();
  const [marathon, setMarathon] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios(`http://localhost:3000/api/marathons?id=${id}`).then((res) => {
      setMarathon(res.data[0]);
    });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const data = {
      name: name,
      email: email,
      phone: phone,
      user_email: user?.email,
      marathon_title: marathon?.title,
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
        setOpenModal(false);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });

    // setOpenModal(false);
  }
  return (
    <>
      <div className='min-h-screen'>
        <div className='container py-16 px-4 md:px-20'>
          <div>
            <h1 className='text-5xl font-extrabold'>Marathon Details</h1>
            <h2 className='text-2xl font-bold'>Details</h2>
            <div className='py-10'>
              <figure>
                <img
                  className='h-xl max-w-2xl w-full object-cover rounded-xl'
                  src={marathon?.imageURL}
                  alt={marathon?.title}
                />
              </figure>
              <h1 className='text-4xl font-extrabold pt-2'>
                {marathon?.title}
              </h1>
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
                onClick={() => setOpenModal(true)}
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
                        <FaEnvelope />
                        <input
                          type='text'
                          className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
                          name='email'
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
    </>
  );
}

export default Marathon;
