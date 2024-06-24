import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const CreateJob = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState(null);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  console.log(currentUser._id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ companyLogo: downloadURL })
        );
      }
    );
  };
  console.log(formData);
  const onSubmit = async (e) => {
    // e.preventDefault();
    e.skills = selectedOption;
    e.employerId = currentUser._id;
    e.companyLogo = formData.companyLogo;
    console.log(e.companyLogo);
    setLoading(true);
    try {
      const res = await fetch("/api/job/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      const data = await res.json();
      if (data.acknowledged === true) {
        alert("Job Posted Successfully!!");
        navigate("/find-work");
        reset(); // Reset the form
        selectedOption("");
      }

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        alert(data.message);
        // toast.error(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  // console.log(watch("example"));

  return (
    <div className="container-xxl mx-auto px-4 px-lg-5">
      {/* <PageHeader title={"Post A Job"} path={"Create Job"} /> */}

      {/* form */}
      <div className="bg-light py-3 py-lg-5 px-3 px-lg-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 space-y-lg-4">
          {/* 1st row */}
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Job Title</label>
              <input
                // defaultValue="Web Developer"
                placeholder="Web Developer"
                {...register("jobTitle")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Company Name</label>
              <input
                placeholder="Ex: Roshan"
                {...register("companyName")}
                className="form-control"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Minimum Salary</label>
              <input
                placeholder="20k"
                {...register("minPrice")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Maximum Salary</label>
              <input
                placeholder="100k"
                {...register("maxPrice")}
                className="form-control"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Salary Type</label>
              <select {...register("salaryType")} className="form-control">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">country</label>
              <input
                placeholder="Ex: Afghanistan"
                {...register("country")}
                className="form-control"
              />
            </div>{" "}
            <div className="col-lg-6">
              <label className="form-label mb-2">city</label>
              <input
                placeholder="Ex: Kabul"
                {...register("city")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Job Location</label>
              <input
                placeholder="Ex: Wazri Mohammad Akbar khan, street 17 "
                {...register("location")}
                className="form-control"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Job Posting Date</label>
              <input
                className="form-control"
                {...register("postingDate")}
                placeholder="Ex: 2023-11-03"
                type="date"
              />
            </div>

            <div className="col-lg-6">
              <label className="form-label mb-2">Experience Level</label>
              <select {...register("experienceLevel")} className="form-control">
                <option value="">Select Your Experience Level</option>
                <option value="NoExperience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="">
            <label className="form-label mb-2">Required Skill Sets:</label>
            <CreatableSelect
              className="form-control py-4"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Company Logo</label>

              <input
                //we use e.target.files[0] becuse if user select multi image file we choose the first one.
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                placeholder="Upload Your Campany Image  or Logo"
                // {...register("companyLogo")}
                className="form-control"
                accept="image/*"
              />
              {`upload ${filePerc}% `}
            </div>

            <div className="col-lg-6">
              <label className="form-label mb-2">Employment Type</label>
              <select {...register("employmentType")} className="form-control">
                <option value="">Select your job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-100">
            <label className="form-label mb-2">Job Description</label>
            <textarea
              className="form-control p-3"
              rows={6}
              {...register("description")}
              placeholder="job description"
              defaultValue={
                "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
              }
            />
          </div>

          {/* last row */}
          <div className="w-100">
            <label className="form-label mb-2">Job Posted by</label>
            <input
              type="email"
              value={currentUser.email}
              className="form-control p-3"
              {...register("employerEmail")}
              placeholder="your email"
            />
          </div>

          <input
            type="submit"
            className="btn btn-primary font-weight-bold px-4 py-2 rounded"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
