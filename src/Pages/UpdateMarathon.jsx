import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../Routes/AuthProvider';
import { useNavigate, useParams } from 'react-router';

function UpdateMarathon({ isUpdate }) {
  const { user } = useAuth();
  const date = new Date();
  const [registrationSt, setRegistrationSt] = useState(date);
  const [registrationEnd, setRegistrationEnd] = useState(date);
  const [selectedDate, setSelectedDate] = useState(date);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [marathon, setMarathon] = useState([]);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    if (user === undefined) {
      navigate('/login');
      return;
    }
    if (!isUpdate) {
      setLoading(false);
    }
  }, [user]);

  if (isUpdate) {
    useEffect(() => {
      axios.get(`http://localhost:3000/api/marathons?id=${id}`).then((res) => {
        setMarathon(res.data[0]);
        setLoading(false);
      });
      //   setRegistrationSt(marathon)
    }, [user, loading]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const imageURL = e.target.imageURL.value;
    const distance = e.target.distance.value;
    const location = e.target.location.value;
    const registrationStart = registrationSt.toISOString().slice(0, 10);
    const registrationEnding = registrationEnd.toISOString().slice(0, 10);
    const eventDay = selectedDate.toISOString().slice(0, 10);
    const created_at = date.toISOString().slice(0, 10);
    if (distance === 'Select Distance') {
      return;
    }
    const data = {
      title,
      description,
      imageURL,
      distance,
      location,
      registrationStart,
      registrationEnding,
      eventDay,
      created_at,
      created_by: user.email,
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
        if (isUpdate) {
          axios.patch(`http://localhost:3000/api/marathons/${id}`, data);
          navigate('/myMarathons');
          return;
        }
        axios
          .post('http://localhost:3000/api/marathons', data)
          .then((res) => {});
        navigate('/myMarathons');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32'></div>
      </div>
    );
  }
  return (
    <>
      <div className='min-h-screen'>
        <div className='container py-16 px-4 md:px-20'>
          <div>
            <h1 className='text-5xl font-extrabold'>
              {isUpdate ? 'Update' : 'Create'} Marathon
            </h1>
            <p>Update Marathon Details here, if you want to </p>
          </div>
          <div className='py-10'>
            <p className='text-red-500 font-bold'>{error} </p>
            <div>
              <form
                action=''
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'>
                <div className='form-controls flex flex-col gap-1'>
                  <label htmlFor='title'>Enter Title:</label>
                  <input
                    type='text'
                    placeholder='Enter Title'
                    name='title'
                    defaultValue={marathon?.title}
                    required
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <div className='form-controls flex flex-col gap-1'>
                  <label>Registration Start:</label>
                  <DatePicker
                    className='input input-bordered w-full max-w-xs'
                    toggleCalendarOnIconClick
                    selected={registrationSt}
                    onChange={(date) => setRegistrationSt(date)}
                  />
                </div>
                <div className='form-controls flex flex-col gap-1'>
                  <label>Registration End:</label>
                  <DatePicker
                    className='input input-bordered w-full max-w-xs'
                    toggleCalendarOnIconClick
                    selected={registrationEnd}
                    onChange={(date) => setRegistrationEnd(date)}
                  />
                </div>
                <div className='form-controls flex flex-col gap-1'>
                  <label>Registration End:</label>
                  <select
                    className='select select-bordered w-full max-w-xs'
                    name='distance'
                    defaultValue={marathon?.distance || 'Select Distance'}>
                    <option value={'Select Distance'} disabled>
                      Select Distance
                    </option>
                    <option value={'15km or less'}>15km or less</option>
                    <option value={'16km-20km'}>16km-20km</option>
                    <option value={'21km-30km'}>21km-30km</option>
                    <option value={'31km-40km'}>31km-40km</option>
                    <option value={'42km or more'}>42km or more</option>
                  </select>
                </div>
                <div className='form-controls flex flex-col gap-1'>
                  <label>Event day:</label>
                  <DatePicker
                    className='input input-bordered w-full max-w-xs'
                    toggleCalendarOnIconClick
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </div>
                <div className='form-controls flex flex-col gap-1'>
                  <label htmlFor='imageURL'>Enter imageURL:</label>
                  <input
                    type='text'
                    placeholder='Enter imageURL'
                    name='imageURL'
                    defaultValue={marathon?.imageURL}
                    required
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <div className='form-controls flex flex-col gap-1'>
                  <label htmlFor='location'>Enter Location:</label>
                  <input
                    type='text'
                    placeholder='Enter Location'
                    name='location'
                    defaultValue={marathon?.location}
                    required
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <div className='form-controls flex flex-col gap-1'>
                  <label htmlFor='description'>Enter Description:</label>
                  <input
                    type='text'
                    placeholder='Enter Description'
                    name='description'
                    defaultValue={marathon?.description}
                    required
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>

                <div className='form-controls flex flex-col gap-1'>
                  <button className='btn bg-primary-lime hover:bg-lime-500 border-black text-black rounded-full text-lg my-5 font-bold px-5 max-w-xs'>
                    {isUpdate ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateMarathon;
