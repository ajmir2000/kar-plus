// export default CreateJob;
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
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
  const [salaryType, setSalaryType] = useState(""); // New state for salary type
  const [salaryFrom, setSalaryFrom] = useState(null);
  const [salaryTo, setSalaryTo] = useState(null);
  const [companySalary, setCompanySalary] = useState("");
  const navigate = useNavigate();
  console.log(salaryType);
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

        // Check if totalBytes is greater than 0 to avoid NaN
        if (snapshot.totalBytes > 0) {
          setFilePerc(Math.round(progress));
        } else {
          setFilePerc(0);
        }
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

  const onSubmit = async (data) => {
    data.skills = selectedOption;
    data.employerId = currentUser._id;
    data.companyLogo = formData.companyLogo;
    data.salaryType = salaryType;

    if (salaryType === "Company Scale") {
      data.minPrice = "";
      data.maxPrice = "";
    }

    setLoading(true);
    try {
      const res = await fetch("/api/job/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.acknowledged) {
        alert("Job Posted Successfully!!");
        navigate("/find-work");
        reset();
        setSelectedOption(null);
      } else {
        setError(result.message);
        alert(result.message);
      }
      setLoading(false);
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

  return (
    <div className="container-xxl mx-auto px-4 px-lg-5">
      <div className="bg-light py-3 py-lg-5 px-3 px-lg-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 space-y-lg-4">
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Company Name</label>
              <input
                placeholder="Ex: Roshan"
                {...register("companyName")}
                className="form-control"
              />
            </div>

            <div className="col-lg-6">
              <label className="form-label mb-2">Job Title</label>
              <input
                placeholder="Web Developer"
                {...register("jobTitle")}
                className="form-control"
              />
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Salary Type</label>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="form-control">
                <option value="default">Select salary type</option>
                <option value="Fixed">Fixed Salary</option>
                <option value="As per Company Scale">
                  As per Company Scale
                </option>
              </select>
            </div>
            {/* <div>
              {salaryType === "default" ? (
                <p>Please provide Salary Type *</p>
              ) : salaryType === "Fixed" ? (
                <div className="ranged_salary">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                  />
                </div>
              ) : salaryType === "As per Company Scale" ? (
                <input
                  type="number"
                  placeholder="Salary To"
                  defaultValue="As per Company Scale"
                  // onChange={(e) => setSalaryTo(e.target.value)}
                />
              ) : null}
            </div> */}
          </div>

          {salaryType === "Fixed" && (
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
          )}

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Country</label>
              <input
                placeholder="Ex: Afghanistan"
                {...register("country")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">City</label>
              <input
                placeholder="Ex: Kabul"
                {...register("city")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Job Location</label>
              <input
                placeholder="Ex: Wazri Mohammad Akbar khan, street 17"
                {...register("location")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Years of Experience</label>
              <input
                type="number"
                {...register("yearsOfExperience")}
                className="form-control"
              />
            </div>
          </div>
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
              <label className="form-label mb-2">Closing Date</label>
              <input
                type="date"
                {...register("closingDate")}
                className="form-control"
              />
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Company Logo</label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
              {`upload ${filePerc}% `}
            </div>

            <div className="col-lg-6">
              <label className="form-label mb-2">Employment Type</label>
              <select {...register("employmentType")} className="form-control">
                <option value="">Select your job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Probation Period</label>
              <input
                type="text"
                {...register("probationPeriod")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Contract Type</label>
              <select {...register("contractType")} className="form-control">
                <option value="">Select your contract type</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Contract Duration</label>
              <input
                type="text"
                {...register("contractDuration")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Contract Extensible</label>
              <select
                {...register("contractExtensible")}
                className="form-control">
                <option value="">Is contract extensible?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Minimum Education</label>
              <input
                type="text"
                {...register("minimumEducation")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Gender</label>
              <select {...register("gender")} className="form-control">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">About Company</label>
              <textarea
                {...register("aboutCompany")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Vacancies</label>
              <input
                type="number"
                {...register("vacancies")}
                className="form-control"
              />
            </div>
          </div>

          <div className="w-100">
            <label className="form-label mb-2">Job Summary</label>
            <textarea
              className="form-control p-3"
              rows={6}
              {...register("jobSummary")}
              placeholder="Job summary"
            />
          </div>
          <div className="w-100">
            <label className="form-label mb-2">
              Duties and Responsibilities
            </label>
            <textarea
              className="form-control p-3"
              rows={6}
              {...register("dutiesResponsibilities")}
              placeholder="Duties and responsibilities"
            />
          </div>
          <div className="w-100">
            <label className="form-label mb-2">Job Requirements</label>
            <textarea
              className="form-control p-3"
              rows={6}
              {...register("jobRequirements")}
              placeholder="Job requirements"
            />
          </div>
          <div className="w-100">
            <label className="form-label mb-2">Required Skill Sets:</label>
            <CreatableSelect
              className="form-control py-4"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          <div className="w-100">
            <label className="form-label mb-2">Functional Area</label>
            <input
              type="text"
              {...register("functionalArea")}
              className="form-control"
            />
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Physical Requirements</label>
              <textarea
                {...register("physicalRequirements")}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Working Conditions</label>
              <textarea
                {...register("workingConditions")}
                className="form-control"
              />
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
