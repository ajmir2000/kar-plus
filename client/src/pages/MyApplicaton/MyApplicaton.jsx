import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [ResumeUrl, setResumeUrl] = useState("");
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // console.log(currentUser);

  // const { user } = useContext(Context);
  // const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint =
          currentUser && currentUser.role === "Employer"
            ? "/api/application/employer/getall"
            : "/api/application//jobseeker/getall";

        const response = await fetch(endpoint, {
          credentials: "include",
        });
        const data = await response.json();
        setApplications(data.applications);
        console.log(applications);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

    fetchApplications();
  }, [currentUser]);

  if (!currentUser) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      const response = await fetch(`application/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my-applications page container">
      {currentUser && currentUser.role === "Job Seeker" ? (
        <>
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </>
      ) : (
        <>
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </>
      )}
      {modalOpen && <ResumeModal imageUrl={ResumeUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="detail">
            <p>
              <strong>Name:</strong> {element.username}
            </p>
            <p>
              <strong>Email:</strong> {element.jobSeekerID.email}
            </p>
            <p>
              <strong>Phone:</strong> {element.phone}
            </p>
            <p>
              <strong>Address:</strong> {element.address}
            </p>
            <p>
              <strong>Cover Letter:</strong> {element.coverLetter}
            </p>
          </div>
          <div className="resume">
            <img
              src={element.resume.url}
              alt="resume"
              className="img-thumbnail"
              onClick={() => openModal(element.resume.url)}
              style={{ cursor: "pointer", width: "150px" }}
            />
          </div>
        </div>
        <div className="text-end">
          <button
            className="btn btn-danger"
            onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="detail">
            <h3 className="text-info">Job Seeker Details</h3>
            <p>
              <strong>Name:</strong> {element.username}
            </p>
            <p>
              <strong>Email:</strong> {element.jobSeekerID.email}
            </p>
            <h3 className="text-danger">Job Details</h3>
            {/*  vacancies: 2,
      closingDate: '2024-06-27T00:00:00.000Z',
      location: 'khir khana1234',
      country: 'Afghanistan',
      province: 'asdda',
      jobTitle: 'HTC Rebrand',
      companyName: 'HTC', */}
            <p>
              <strong>Job Title:</strong> {element.jobTitle}
            </p>
            <p>
              <strong>Address:</strong> {element.location}
            </p>
            <p>
              <strong>Cover Letter:</strong> {element.coverLetter}
            </p>
          </div>
          <div className="resume">
            <img
              src={element.resume.url}
              alt="resume"
              className="img-thumbnail"
              onClick={() => openModal(element.resume.url)}
              style={{ cursor: "pointer", width: "150px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Resume</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={imageUrl} alt="resume" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
