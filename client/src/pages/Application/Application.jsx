import axios from "axios";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const navigateTo = useNavigate();

  // const { isAuthorized, user } = useContext(Context);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  console.log(currentUser._id);
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
          setFormData({ ...formData, resume: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setFormData({
      ...formData,
      jobSeekerId: currentUser?._id,
      role: currentUser.role,
      jobId: id && id,
    });
    console.log(formData);
    e.preventDefault();
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
        console.log(error);
        return;
      }
      setSuccess(data.message);
    } catch (error) {
      setError(error.message);
    }
  };

  // image url for test
  //    'https://firebasestorage.googleapis.com/v0/b/karplus-b0704.appspot.com/o/1719128418045Web%201920%20%E2%80%93%207.jpg?alt=media&token=cec315a4-aee6-4c11-8a89-55984ba3c134'
  // handle and upload image end

  // const { id } = useParams();
  // console.log(id);

  // const handleApplication = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("phone", phone);
  //   formData.append("address", address);
  //   formData.append("coverLetter", coverLetter);
  //   formData.append("resume", resume);
  //   formData.append("jobId", id);
  //   console.log(formData);

  //   try {
  //     const { data } = await axios.post("/api/application/post", formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setName("");
  //     setEmail("");
  //     setCoverLetter("");
  //     setPhone("");
  //     setAddress("");
  //     setResume("");
  //     toast.success(data.message);
  //     // navigateTo("/job/getall");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // if (!isAuthorized || (user && user.role === "Employer")) {
  //   navigateTo("/");
  // }

  if (!currentUser || (currentUser && currentUser.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form
          // onSubmit={handleApplication}
          onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            // defaultValue={currentUser.username}
            id="name"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={currentUser.email}
            onChange={handleChange}
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
            // defaultValue={address}
            onChange={handleChange}
          />
          <textarea
            placeholder="CoverLetter..."
            id="coverLetter"
            // defaultValue={coverLetter}
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
              // accept=".pdf, .jpg, .png"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ width: "100%" }}
            />
            <p>resume upload {filePerc && filePerc}%</p>
          </div>
          <button
            type="submit"
            //  disabled={filePerc === "100" ? false : true}
          >
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
