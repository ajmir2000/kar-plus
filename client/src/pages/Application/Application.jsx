import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { Context } from "../../main";
import { useSelector } from "react-redux";
import "./Application.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Application = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { id } = useParams();
  // console.log(currentUser);
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
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
      setFileUploadError(false); // Reset the error state if any
    } else {
      setFile(null);
      setFileUploadError(true); // Set error state if file is not valid
      console.log(
        "Please upload a valid image file (PDF, Word, PNG, or JPEG)."
      );
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `jobSeekerApplicationFiles/${fileName}`);
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
          setFormData((prev) => ({ ...prev, resume: downloadURL }));
          setIsFileUploaded(true);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFileUploaded) {
      alert("File is still uploading. Please wait.");
      return;
    }

    try {
      const res = await fetch("/api/application/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        alert(data.message);
        return;
      }
      setSuccess(data.message);
      navigateTo("/find-work");
      alert(data.message);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!currentUser || (currentUser && currentUser.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              style={{
                textAlign: "start",
                display: "block",
                fontSize: "20px",
              }}>
              Select Resume
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              className="form-control"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              required
            />
            {`upload ${filePerc}% `}
            {fileUploadError && (
              <p className="text-danger">
                Please upload a valid File or image file (PDF, Word, PNG, or
                JPEG).
              </p>
            )}
          </div>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={currentUser.email}
            readOnly
          />

          <button type="submit" disabled={filePerc !== 100 && file}>
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
