import React, { useEffect, useState } from 'react';
import { useAuth } from '../Routes/AuthProvider';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

function MyMarathons() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [marathons, setMarathons] = useState([]);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if (user === undefined) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [user]);
  useEffect(() => {
    if (!loading) {
      axios
        .get(`http://localhost:3000/api/marathons?email=${user?.email}`)
        .then((res) => {
          setMarathons(res.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
        });
    }
  }, [loading, user, updated]);
  function handleDelete(id) {
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
        axios
          .delete(`http://localhost:3000/api/marathons/${id}`)
          .then((res) => {
            setUpdated(!updated);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
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
        <title>My Marathons | MedalTrack</title>
      </Helmet>
      <div className='min-h-screen bg-base-200 rounded-md border-t-[20px] border-primary-lime my-10 mx-auto overflow-x-hidden'>
        <div className='container py-16 mx-auto md:px-20'>
          <div className='text-center'>
            <h1 className='text-3xl sm:text-5xl font-extrabold'>
              My Marathons
            </h1>
            <h2 className='text-2xl font-bold'>Details</h2>
            <div className='mx-auto'>
              <div className='overflow-x-auto'>
                <table className='table table-zebra'>
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {marathons.length === 0 && (
                      <tr>
                        <td colSpan='4'>
                          <div className='alert alert-info shadow-lg'>
                            <div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                className='stroke-current flex-shrink-0 w-6 h-6'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                              </svg>
                              <span>There are no marathons</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                    {marathons.map((marathon, index) => (
                      <tr key={marathon._id}>
                        <th>{index + 1}</th>
                        <td>
                          <Link to={`/marathons/${marathon._id}`}>
                            {marathon.title}
                          </Link>
                        </td>
                        <td>{marathon.eventDay}</td>
                        <td>{marathon.location}</td>
                        <td>
                          <Link
                            to={`/updateMarathon/${marathon._id}`}
                            className='btn bg-primary-lime hover:bg-lime-500 border-black btn-sm'>
                            Update
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(marathon._id);
                            }}
                            className='btn btn-error border-black btn-sm'>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyMarathons;
