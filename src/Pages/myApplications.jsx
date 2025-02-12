import React, { useEffect } from 'react';
import { useAuth } from '../Routes/AuthProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

function MyApplications() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [applications, setApplications] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === undefined) {
      navigate('/login');
      return;
    }
  }, [user]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/applications?email=${user?.email}`)
      .then((res) => {
        setApplications(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      });
  }, [user]);
  function handleDelete(id) {
    Swal.fire({
      title: 'Do you want to Delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        axios
          .delete(`http://localhost:3000/api/applications/${id}`)
          .then((res) => {
            const newApplications = applications.filter(
              (application) => application._id !== id
            );
            setApplications(newApplications);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  function searchDb(e) {
    e.preventDefault();

    const search = e.target.search.value;

    axios
      .get(
        `http://localhost:3000/api/applications?email=${user?.email}&search=${search}`
      )
      .then((res) => {
        setApplications(res.data);
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
        <title>My Applications | MedalTrack</title>
      </Helmet>
      <div className='min-h-screen bg-base-200 rounded-md border-t-[20px] border-primary-lime my-10 mx-auto overflow-x-hidden'>
        <div className='container py-16 mx-auto md:px-20'>
          <div className='text-center'>
            <h1 className='text-3xl sm:text-5xl font-extrabold'>
              My Applications
            </h1>
            <h2 className='text-2xl font-bold'>Details</h2>
          </div>
          <form
            action=''
            className='input input-bordered rounded-full my-3 flex items-center gap-2'
            onSubmit={searchDb}>
            <input
              type='text'
              className='grow focus:outline-none focus:ring-0 ring-0 focus:bg-transparent focus:border-0 border-0'
              placeholder='Search'
              name='search'
            />
            <button className='btn bg-primary-lime border-black hover:bg-lime-500 text-black rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='0000'
                className='h-4 w-4 opacity-70'>
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </form>
          <div className='mt-8'>
            <div className='mx-auto'>
              <div className='overflow-x-auto'>
                <table className='table table-zebra'>
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {applications.length === 0 && (
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
                              <span>There are no applications</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                    {applications.map((application, index) => (
                      <tr key={application._id}>
                        <th>{index + 1}</th>
                        <td>
                          <Link to={`/marathon/${application._id}`}>
                            {application.marathon_title}
                          </Link>
                        </td>

                        <td>
                          <Link
                            to={`/updateApplication/${application._id}`}
                            className='btn bg-primary-lime hover:bg-lime-500 border-black btn-sm'>
                            Update
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(application._id);
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

export default MyApplications;
