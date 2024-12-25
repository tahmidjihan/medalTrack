import React, { useEffect, useState } from 'react';
import { useAuth } from '../Routes/AuthProvider';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

function MyMarathons() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [marathons, setMarathons] = useState([]);
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
        });
    }
  }, [loading, user]);

  return (
    <>
      <div className='min-h-screen'>
        <div className='container py-16 px-4 md:px-20'>
          <div className='text-center'>
            <h1 className='text-5xl font-extrabold'>My Marathons</h1>
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
                              // console.log(marathon._id);
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
