import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFilePdf, FaFileWord } from "react-icons/fa";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [ResumeUrl, setResumeUrl] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

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
      const response = await fetch(`/api/application/delete/${id}`, {
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
      console.log(error.message);
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
    <section>
      {currentUser && currentUser.role === "Job Seeker" ? (
        <>
          <h1 className="text-light ms-5 mb-3">My Applications</h1>
          <div className="row">
            {" "}
            {applications?.length <= 0 ? (
              <h4>No Applications Found</h4>
            ) : (
              applications?.map((element) => (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white text-center mb-5 ">
            Applications From Job Seekers
          </h1>
          <div className="row gx-0 m-5">
            {applications && applications.length <= 0 ? (
              <h4>No Applications Found</h4>
            ) : (
              applications &&
              applications.map((element) => (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              ))
            )}
          </div>
        </>
      )}
      {modalOpen && <ResumeModal imageUrl={ResumeUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const getFileType = (url) => {
    const extension = url.split("?")[0].split(".").pop();
    return extension.toLowerCase();
  };

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  const fileType = getFileType(element.resume);

  return (
    <div className="d-flex justify-content-center col-md-6 col-lg-4 p-lg-0  m-lg-auto">
      <div className=" card mb-3 shadow-sm rounded rounded-5 p-0 ">
        <div className="card-body">
          <div className="d-flex  flex-md-row justify-content-between">
            <div className="detail mb-3">
              <h3 className="text-info">Job Seeker Details</h3>
              <p>{element.username}</p>
              <p>
                <strong>Name:</strong> {element.username}
              </p>
              <p>
                <strong>Email:</strong> {element.jobSeekerID.email}
              </p>
              <h3 className="text-danger">Job Details</h3>
              <p>
                <strong>Job Title:</strong> {element.jobTitle}
              </p>
              <p>
                <strong>Company Name:</strong> {element.companyName}
              </p>
              <p>
                <strong>Vacancies:</strong> {element.vacancies}
              </p>
              <p>
                <strong>Address:</strong> {element.country}, {element.province},
                {element.location}
              </p>
              <p>
                <strong>Closing Date:</strong>{" "}
                {new Date(element.closingDate).toISOString().split("T")[0]}
              </p>
            </div>
            <div className="resume">
              {fileType === "jpg" ||
              fileType === "jpeg" ||
              fileType === "png" ? (
                <img
                  src={element.resume}
                  alt="resume"
                  className="img-thumbnail"
                  onClick={() => openModal(element.resume)}
                  style={{ cursor: "pointer", width: "150px" }}
                />
              ) : fileType === "pdf" ? (
                <div
                  onClick={() => downloadFile(element.resume)}
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{
                    cursor: "pointer",
                    width: "100px",
                    height: "100px",
                  }}>
                  <FaFilePdf size={48} color="red" />
                  <span className="text-center">Download PDF File</span>
                </div>
              ) : fileType === "doc" || fileType === "docx" ? (
                <div
                  onClick={() => downloadFile(element.resume)}
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{
                    cursor: "pointer",
                    width: "100px",
                    height: "100px",
                  }}>
                  <FaFileWord size={48} color="blue" />
                  <span className="text-center">Download Word File</span>
                </div>
              ) : (
                <span>Unsupported file type</span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-danger"
              onClick={() => deleteApplication(element._id)}>
              Delete Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const rejectHandler = async (data) => {
    const jobSeekerEmail = data.jobSeekerID.email;
    const jobTitle = data.jobTitle;
    const companyName = data.companyName;
    const applicationID = data._id;

    try {
      const res = await fetch("/api/application/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobSeekerEmail,
          jobTitle,
          companyName,
          applicationID,
        }),
      });
      const responseData = await res.json();
      if (responseData.success === false) {
        setError(responseData.message);
        alert(responseData.message);
        return;
      }
      setSuccess(responseData.message);
      alert(responseData.message);
    } catch (error) {
      setError(error.message);
    }
  };

  const getFileType = (url) => {
    const extension = url.split("?")[0].split(".").pop();
    return extension.toLowerCase();
  };

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  const fileType = getFileType(element.resume);

  return (
    <div className="col-12 col-lg-8 col-xl-6 mx-auto p-5 mb-5">
      {!element.accept && !element.reject ? (
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 mb-3 mb-md-0">
                <h3 className="text-info">Job Seeker Details</h3>
                <p><strong>Name:</strong> {element.username}</p>
                <p><strong>Email:</strong> {element.jobSeekerID.email}</p>
                <h3 className="text-danger">Job Details</h3>
                <p><strong>Job Title:</strong> {element.jobTitle}</p>
                <p><strong>Company Name:</strong> {element.companyName}</p>
                <p><strong>Vacancies:</strong> {element.vacancies}</p>
                <p><strong>Address:</strong> {element.country}, {element.province}, {element.location}</p>
                <p><strong>Closing Date:</strong> {new Date(element.closingDate).toISOString().split("T")[0]}</p>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-start">
                {fileType === "jpg" || fileType === "jpeg" || fileType === "png" ? (
                  <img
                    src={element.resume}
                    alt="resume"
                    className="img-thumbnail"
                    onClick={() => openModal(element.resume)}
                    style={{ cursor: "pointer", maxWidth: "150px" }}
                  />
                ) : fileType === "pdf" ? (
                  <div
                    onClick={() => downloadFile(element.resume)}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ cursor: "pointer", width: "100px", height: "100px" }}
                  >
                    <FaFilePdf size={48} color="red" />
                    <span className="text-center">Download PDF</span>
                  </div>
                ) : fileType === "doc" || fileType === "docx" ? (
                  <div
                    onClick={() => downloadFile(element.resume)}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ cursor: "pointer", width: "100px", height: "100px" }}
                  >
                    <FaFileWord size={48} color="blue" />
                    <span className="text-center">Download Word</span>
                  </div>
                ) : (
                  <span>Unsupported file type</span>
                )}
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-around">
            <Link to={`/accept-application/${element._id}`} state={{ element }}>
              <button className="btn btn-success">Accept</button>
            </Link>
            <button className="btn btn-danger" onClick={() => rejectHandler(element)}>
              Reject
            </button>
          </div>
        </div>
      ) : element.accept ? (
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 mb-3 mb-md-0">
                <h3 className="text-info">Job Seeker Details</h3>
                <p><strong>Name:</strong> {element.username}</p>
                <p><strong>Email:</strong> {element.jobSeekerID.email}</p>
                <h3 className="text-danger">Job Details</h3>
                <p><strong>Job Title:</strong> {element.jobTitle}</p>
                <p><strong>Company Name:</strong> {element.companyName}</p>
                <p><strong>Vacancies:</strong> {element.vacancies}</p>
                <p><strong>Address:</strong> {element.country}, {element.province}, {element.location}</p>
                <p><strong>Closing Date:</strong> {new Date(element.closingDate).toISOString().split("T")[0]}</p>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-start">
                {/* Resume display logic (same as above) */}
                <div className="col-md-4 d-flex justify-content-center align-items-start">
                {fileType === "jpg" || fileType === "jpeg" || fileType === "png" ? (
                  <img
                    src={element.resume}
                    alt="resume"
                    className="img-thumbnail"
                    onClick={() => openModal(element.resume)}
                    style={{ cursor: "pointer", maxWidth: "150px" }}
                  />
                ) : fileType === "pdf" ? (
                  <div
                    onClick={() => downloadFile(element.resume)}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ cursor: "pointer", width: "100px", height: "100px" }}
                  >
                    <FaFilePdf size={48} color="red" />
                    <span className="text-center">Download PDF</span>
                  </div>
                ) : fileType === "doc" || fileType === "docx" ? (
                  <div
                    onClick={() => downloadFile(element.resume)}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ cursor: "pointer", width: "100px", height: "100px" }}
                  >
                    <FaFileWord size={48} color="blue" />
                    <span className="text-center">Download Word</span>
                  </div>
                ) : (
                  <span>Unsupported file type</span>
                )}
              </div>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button className="btn btn-success">Sent Accept Email</button>
          </div>
        </div>
      ) : null}
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
