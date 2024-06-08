/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
// import PageHeader from "../components/PageHeader";
// import { FaDollarSign } from "react-icons/fa";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    data.skills = selectedOption;
    fetch("http://localhost:5000/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if(result.acknowledged === true){
          alert("Job Posted Successfully!!")
        }
        reset(); // Reset the form
      });

    // console.log(data)
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 space-y-lg-4">
          {/* 1st row */}
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Job Title</label>
              <input
                defaultValue="Web Developer"
                {...register("jobTitle")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Company Name</label>
              <input
                placeholder="Ex: Microsoft"
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
                placeholder="$20k"
                {...register("minPrice")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Maximum Salary</label>
              <input
                placeholder="$100k"
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
              <label className="form-label mb-2">Job Location</label>
              <input
                placeholder="Ex: New York"
                {...register("jobLocation")}
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
              <select
                {...register("experienceLevel")}
                className="form-control"
              >
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
                type="url"
                placeholder="Paste your image url: https://weshare.com/img1.jpg"
                {...register("companyLogo")}
                className="form-control"
              />
            </div>

            <div className="col-lg-6">
              <label className="form-label mb-2">Employment Type</label>
              <select
                {...register("employmentType")}
                className="form-control"
              >
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
              defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}
            />
          </div>

          {/* last row */}
          <div className="w-100">
          <label className="form-label mb-2">Job Posted by</label>
          <input
          type="email"
              // value={user?.email}
              className="form-control p-3"
              {...register("postedBy")}
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