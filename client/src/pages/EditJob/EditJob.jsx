import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useSelector } from "react-redux";

const UpdateJob = () => {
  const { id } = useParams();
  const [singleJob, setSingleJob] = useState({});
  console.log(id);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`/api/job/all-job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleJob(data);
      });
  }, [currentUser]);
  console.log(singleJob);

  const {
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
    postedBy,
    skills,
  } = singleJob;


  const [selectedOption, setSelectedOption] = useState(null);

  // const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data)
    // update the book object
    fetch(`/api/job/edit-job/${id}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Job Updated Successfully!!");
        }
      });
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
    <div className="container mx-auto px-4 xl:px-24">
      <PageHeader title={"Update This Job"} path={"Edit Job"} />

      {/* form */}
      <div className="bg-light py-5 px-4 lg:px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 1st row */}
          <div className="row align-items-center justify-between g-4">
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Job Title</label>
              <input
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Company Name</label>
              <input
                placeholder="Ex: Microsoft"
                defaultValue={companyName}
                {...register("companyName")}
                className="form-control"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="row g-4">
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Minimum Salary</label>
              <input
                placeholder="$20k"
                defaultValue={minPrice}
                {...register("minPrice")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Maximum Salary</label>
              <input
                placeholder="$100k"
                defaultValue={maxPrice}
                {...register("maxPrice")}
                className="form-control"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="row g-4">
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Salary Type</label>
              <select {...register("salaryType")} className="form-control">
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Job Location</label>
              <input
                placeholder="Ex: New York"
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="form-control"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="row g-4">
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Job Posting Date</label>
              <input
                className="form-control"
                {...register("postingDate")}
                placeholder="Ex: 2024-11-03"
                type="date"
                defaultValue={postingDate}
              />
            </div>

            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Experience Level</label>
              <select {...register("experienceLevel")} className="form-control">
                <option value={experienceLevel}>{experienceLevel}</option>
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
              defaultValue={skills}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="row g-4">
            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your image url: https://weshare.com/img1.jpg"
                {...register("companyLogo")}
                className="form-control"
                defaultValue={companyLogo}
              />
            </div>

            <div className="col-lg-6 col-12">
              <label className="form-label mb-2">Employment Type</label>
              <select {...register("employmentType")} className="form-control">
                <option value={employmentType}>{employmentType}</option>
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
              className="form-control"
              rows={6}
              {...register("description")}
              placeholder="job description"
              defaultValue={description}
            />
          </div>

          {/* last row */}
          <div className="w-100">
            <label className="form-label mb-2">Job Posted by</label>
            <input
              type="email"
              // value={user?.email}

              className="form-control"
              {...register("postedBy")}
              placeholder="your email"
              defaultValue={postedBy}
            />
          </div>

          <input type="submit" className="btn btn-primary mt-3 px-4 py-2" />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
