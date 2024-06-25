import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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
  const [formData, setFormData] = useState({
    email: currentUser.email,
    jobId: useParams().id, // Set jobId from params initially
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { id } = useParams();

  // handle and upload image start
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prev) => ({ ...prev, resume: downloadURL }))
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      email: currentUser.email, // Ensure email is always set
      jobId: id, // Ensure jobId is always set
    });
  };
  console.log(currentUser)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure formData includes jobSeekerId and role before submitting
    const finalFormData = {
      ...formData,
      jobSeekerId: currentUser._id,
      role: currentUser.role,
    };

    console.log(finalFormData);

    try {
      const res = await fetch("/api/application/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        alert(data.message);
        return;
      }
      setSuccess(data.message);
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
          <input
            type="text"
            placeholder="Your Name"
            id="name"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={currentUser.email}
            readOnly
          />
          <input
            type="number"
            id="phone"
            placeholder="Your Phone Number"
            defaultValue={currentUser.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            placeholder="Your Address"
            onChange={handleChange}
          />
          <textarea
            placeholder="CoverLetter..."
            id="coverLetter"
            onChange={handleChange}
          />
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
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ width: "100%" }}
            />
            <p>resume upload {filePerc && filePerc}%</p>
          </div>
          <button type="submit" disabled={filePerc !== 100 && file}>
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
