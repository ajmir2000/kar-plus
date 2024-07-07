import React, { useEffect, useState } from "react";

// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
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
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="detail">
            <h3 className="text-info">Job Seeker Details</h3> {element.username}
            <p></p>
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
              <strong>Closing Date:</strong> {element.closingDate}
            </p>
          </div>
          <div className="resume">
            {fileType === "jpg" || fileType === "jpeg" || fileType === "png" ? (
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
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <FaFilePdf size={48} color="red" />
                <span>Download PDF File</span>
              </div>
            ) : fileType === "doc" || fileType === "docx" ? (
              <div
                onClick={() => downloadFile(element.resume)}
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <FaFileWord size={48} color="blue" />
                <span>Download Word File</span>
              </div>
            ) : (
              <span>Unsupported file type</span>
            )}
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

//     const extension = url.split("?")[0].split(".").pop();
//     return extension.toLowerCase();
//   };
//   console.log(element.resume);
//   const fileType = getFileType(element.resume);
//   console.log(fileType);

//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         <div className="d-flex justify-content-between">
//           <div className="detail">
//             <h3 className="text-info">Job Seeker Details</h3>
//             <p>
//               <strong>Name:</strong> {element.username}
//             </p>
//             <p>
//               <strong>Email:</strong> {element.jobSeekerID.email}
//             </p>
//             <h3 className="text-danger">Job Details</h3>

//             <p>
//               <strong>Job Title:</strong> {element.jobTitle}
//             </p>
//             <p>
//               <strong>Company Name:</strong> {element.companyName}
//             </p>
//             <p>
//               <strong>Vacancies:</strong> {element.vacancies}
//             </p>
//             <p>
//               <strong>Address:</strong> {element.country}, {element.province},
//               {element.location}
//             </p>
//             <p>
//               <strong>Closing Date:</strong> {element.closingDate}
//             </p>
//           </div>
//           <div className="resume">
//             {fileType === "jpg" || fileType === "jpeg" || fileType === "png" ? (
//               <img
//                 src={element.resume}
//                 alt="resume"
//                 className="img-thumbnail"
//                 onClick={() => openModal(element.resume)}
//                 style={{ cursor: "pointer", width: "150px" }}
//               />
//             ) : fileType === "pdf" ? (
//               <div
//                 onClick={() => openModal(element.resume)}
//                 style={{
//                   cursor: "pointer",
//                   width: "150px",
//                   height: "150px",
//                   border: "1px solid #ccc",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}>
//                 <Document file={element.resume}>
//                   <Page pageNumber={1} width={150} />
//                 </Document>
//               </div>
//             ) : fileType === "doc" || fileType === "docx" ? (
//               <div
//                 onClick={() => openModal(element.resume)}
//                 style={{
//                   cursor: "pointer",
//                   width: "150px",
//                   height: "150px",
//                   border: "1px solid #ccc",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}>
//                 <span>Word Document</span>
//               </div>
//             ) : (
//               <span>Unsupported file type</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const EmployerCard = ({ element, openModal }) => {
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
              <strong>Closing Date:</strong> {element.closingDate}
            </p>
          </div>
          <div className="resume">
            {fileType === "jpg" || fileType === "jpeg" || fileType === "png" ? (
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
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <FaFilePdf size={48} color="red" />
                <span>Download PDF File</span>
              </div>
            ) : fileType === "doc" || fileType === "docx" ? (
              <div
                onClick={() => downloadFile(element.resume)}
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <FaFileWord size={48} color="blue" />
                <span>Download Word File</span>
              </div>
            ) : (
              <span>Unsupported file type</span>
            )}
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
