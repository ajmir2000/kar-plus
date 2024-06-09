import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";
import { useSelector } from "react-redux";
import "./MyJobs.css";

const MyJobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.email)
  //   const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/job/my-job/${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText, currentUser]);
//   console.log(jobs)

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  // search functionality
  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setJobs(filter);
    setIsLoading(false);
  };

  // pagination previous and next
  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // delete a job
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/job/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          alert("Job Deleted Successfully!!");
          setJobs(jobs.filter((job) => job._id !== id));
        }
      });
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-jobs-container">
        <h1 className="text-center p-4">ALL My Jobs</h1>
        <div className="text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="form-control mb-2"
            placeholder="Search jobs"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>

        {/* table */}
        <section>
          <div className="mx-auto mt-5">
            <div className="card shadow-lg">
              <div className="card-header d-flex justify-content-between">
                <h3 className="card-title">All Jobs</h3>
                <Link
                  to="/create-job"
                  className="btn btn-dark text-white text-xs font-bold">
                  Post A New Job
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Company Name</th>
                      <th>Salary</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center h-20">
                      <p>loading......</p>
                    </div>
                  ) : (
                    <tbody>
                      {currentJobs.map((job, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{job.jobTitle}</td>
                          <td>{job.companyName}</td>
                          <td>
                            ${job.minPrice} - ${job.maxPrice}k
                          </td>
                          <td>
                            <Link to={`/edit-job/${job?._id}`}>Edit</Link>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(job._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>

          {/* pagination */}
          <div className="d-flex justify-content-center mt-3">
            {currentPage > 1 && (
              <button onClick={prevPage} className="btn btn-secondary mx-2">
                Previous
              </button>
            )}
            {indexOfLastItem < jobs.length && (
              <button onClick={nextPage} className="btn btn-secondary mx-2">
                Next
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyJobs;
