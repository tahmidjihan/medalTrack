import React, { useEffect } from 'react';
import { useAuth } from '../Routes/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

function MyApplications() {
  const { user } = useAuth();
  //   const [loading, setLoading] = React.useState(true);
  const [applications, setApplications] = React.useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/applications?email=${user?.email}`)
      .then((res) => {
        setApplications(res.data);
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
  return (
    <>
      <div className='min-h-screen '>
        <div className='container py-16 px-4 mx-auto md:px-20'>
          <div className='text-center'>
            <h1 className='text-5xl font-extrabold'>My Applications</h1>
            <h2 className='text-2xl font-bold'>Details</h2>
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
