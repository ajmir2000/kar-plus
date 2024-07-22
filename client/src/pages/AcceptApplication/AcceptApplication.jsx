import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
// import { Context } from "../../main";
import { useSelector } from "react-redux";
import "./AcceptApplication.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useForm } from "react-hook-form";

import { useLocation } from "react-router-dom";

const AcceptApplication = () => {
  const location = useLocation();
  const { element } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    jobID: useParams().id, // Set jobId from params initially
    jobSeekerId: currentUser._id,
    emailJobSeeker: currentUser.email,
    username: currentUser.username,
    role: currentUser.role,
  });

  // handle and upload image start
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
      setFileUploadError(false); // Reset the error state if any
    } else {
      setFile(null);
      setFileUploadError(true); // Set error state if file is not valid
      console.log("Please upload a valid image file (PDF, Word).");
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `acceptApplicationFiles/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (snapshot.totalBytes > 0) {
          setFilePerc(Math.round(progress));
        } else {
          setFilePerc(0);
        }
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ attachment: downloadURL });
          setIsFileUploaded(true);
        });
      }
    );
  };

  const onSubmit = async (data) => {
    data.attachment = formData.attachment;
    data.applicationID = element._id;
    data.jobID = element.jobID;
    data.jobTitle = element.jobTitle;
    data.companyName = element.companyName;
    data.jobSeekerID = element.jobSeekerID.userID;
    data.jobSeekerEmail = element.jobSeekerID.email;
    data.employerID = element.employerID.userID;
    data.employerEmail = element.employerID.email;
    data.allDataApplication = element;

    console.log(data);

    if (!isFileUploaded) {
      alert("File is still uploading. Please wait.");
      return;
    }

    try {
      const res = await fetch("/api/application/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await res.json();
    console.log(responseData);
    if (responseData.success === false) {
        setError(responseData.message);
        console.log("here");
        alert(responseData.message);
        return;
    }
    setSuccess(responseData.message);
    alert(responseData.message);
    // navigateTo("/my-application");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
//   if (!currentUser || (currentUser && currentUser.role === "Employer")) {
//     navigateTo("/");
//   }

  return (
    <section className="application">
      <div className="container">
        <h3>Accept Application Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-lg-12 mb-3">
            <label className="form-label">Emploer Full Name</label>
            <input
              type="text"
              placeholder="Mohammad Karim Azad"
              {...register("hrName", { required: "Full Name is required" })}
              className={`form-control ${errors.hrName ? "is-invalid" : ""}`}
            />
            {errors.hrName && (
              <div className="invalid-feedback">{errors.hrName.message}</div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className={`form-control ${errors.desc ? "is-invalid" : ""}`}
              rows={6}
              {...register("desc", { required: "Description are required" })}
              placeholder="Provide Description for job seeker"
            />
            {errors.desc && (
              <div className="invalid-feedback">{errors.desc.message}</div>
            )}
          </div>
          <div>
            <label
              style={{
                textAlign: "start",
                display: "block",
                fontSize: "20px",
              }}>
              Select Attachment
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              className="form-control"
              accept=".pdf,.doc,.docx"
              required
            />
            {`upload ${filePerc}% `}
            {fileUploadError && (
              <p className="text-danger">
                Please upload a valid attachment (PDF, Word).
              </p>
            )}
          </div>

          <button type="submit" disabled={filePerc !== 100 && file}>
            Send Accept Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default AcceptApplication;
