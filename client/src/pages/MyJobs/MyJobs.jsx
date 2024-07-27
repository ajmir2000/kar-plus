import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MyJobs.css";

const MyJobs = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/job/my-job/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
        setIsLoading(false);
      });
  }, [currentUser]);
  console.log(jobs);
  console.log(currentUser);
  useEffect(() => {
    const filter = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJobs(filter);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchText, jobs]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredJobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = (id) => {
    fetch(`/api/job/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          alert("Job Deleted Successfully!!");
          const updatedJobs = jobs.filter((job) => job._id !== id);
          setJobs(updatedJobs);
          setFilteredJobs(updatedJobs);
        }
      });
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div class="container-fluid p-4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h1 class="text-center text-white py-4">All My Jobs</h1>
          <div class="text-center mb-3 d-flex flex-column flex-md-row justify-content-center align-items-center">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              class="form-control mb-2 mb-md-0 me-md-3 p-2"
              placeholder="Search jobs"
            />
            <button
              onClick={() => setSearchText("")}
              class="btn btn-outline-light py-2">
              Clear
            </button>
          </div>

          {isLoading ? (
            <div class="d-flex justify-content-center align-items-center min-vh-50">
              <p>Loading...</p>
            </div>
          ) : (
            <div class="card shadow-lg">
              <div class="card-header d-flex justify-content-between align-items-center flex-wrap">
                <h3 class="card-title mb-0">All Jobs</h3>
                <Link
                  to="/create-job"
                  class="btn btn-outline-dark mt-2 mt-md-0">
                  Post A New Job
                </Link>
              </div>

              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Company Name</th>
                      <th>Salary</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={job._id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{job.jobTitle}</td>
                        <td>{job.companyName}</td>
                        {job.salaryType === "As per Company Scale" ? (
                          <td>{job.companySalary}</td>
                        ) : (
                          <td>
                            {job.salaryFrom} - {job.salaryTo}
                          </td>
                        )}
                        <td>
                          <Link
                            to={`/edit-job/${job._id}`}
                            class="btn btn-outline-primary btn-sm">
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            class="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(job._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div class="d-flex justify-content-center mt-4">
        {currentPage > 1 && (
          <button onClick={prevPage} class="btn btn-secondary mx-2">
            Previous
          </button>
        )}
        {indexOfLastItem < filteredJobs.length && (
          <button onClick={nextPage} class="btn btn-secondary mx-2">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
