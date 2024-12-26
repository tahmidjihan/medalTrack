import React, { useEffect } from 'react';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

function UpdateApplication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [application, setApplication] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    axios
      .get(`https://backend-11.vercel.app/api/applications?id=${id}`)
      .then((res) => {
        setApplication(res.data[0]);
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const data = {
      name: name,
      email: email,
      phone: phone,
      user_email: user?.email,
      marathon_title: application?.marathon_title,
      marathon_id: application?.marathon_id,
    };
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        axios.patch(
          `https://backend-11.vercel.app/api/applications/${id}`,
          data
        );
        setTimeout(() => {
          navigate('/myApplications');
        }, 1500);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };
  if (isLoading) {
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
        <title>Update Application | MedalTrack</title>
      </Helmet>
      <div className='space-y-6 mx-auto my-10'>
        <h1 className='text-3xl font-bold'>Update Application</h1>
        <p>Fill out the form below to update your application</p>
        <form action='' onSubmit={handleSubmit} className='space-y-6'>
          <span className='input input-bordered flex items-center gap-2'>
            <span className='font-bold'>Title:</span>
            <input
              type='text'
              className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
              defaultValue={application?.marathon_title}
              readOnly
              placeholder='Enter Your Email'
            />
          </span>
          <span className='input input-bordered flex items-center gap-2'>
            <span className='font-bold'>Start:</span>
            <input
              type='text'
              className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
              defaultValue={application?.marathon_start}
              readOnly
              placeholder='Enter Your Email'
            />
          </span>
          <span className='input input-bordered flex items-center gap-2'>
            <FaEnvelope />
            <input
              type='text'
              className='grow input focus:ring-0 ring-0 focus:outline-0 outline-0 border-0'
              name='email'
              defaultValue={application?.email}
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
              defaultValue={application?.name}
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
              defaultValue={application?.phone}
              required
              placeholder='Enter Your Phone Number'
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
            />
          </span>
          <button className='btn grow bg-primary-lime hover:bg-lime-500 border-black text-black rounded-full text-lg w-full my-5 font-bold px-5'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateApplication;
