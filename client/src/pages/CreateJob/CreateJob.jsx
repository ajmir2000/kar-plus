import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg")
    ) {
      setFile(selectedFile);
      setFileUploadError(false); // Reset the error state if any
      handleFileUpload(selectedFile);
    } else {
      setFile(null);
      setFileUploadError(true); // Set error state if file is not an image
      console.log("Please upload a valid image file (PNG or JPEG).");
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `companyImages/${fileName}`);
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
    data.employerEmail = currentUser.email;

    if (salaryType === "As per Company Scale") {
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
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                className={`form-control ${
                  errors.companyName ? "is-invalid" : ""
                }`}
              />
              {errors.companyName && (
                <div className="invalid-feedback">
                  {errors.companyName.message}
                </div>
              )}
            </div>

            <div className="col-lg-6">
              <label className="form-label mb-2">Job Title</label>
              <input
                placeholder="Web Developer"
                {...register("jobTitle", { required: "Job Title is required" })}
                className={`form-control ${
                  errors.jobTitle ? "is-invalid" : ""
                }`}
              />
              {errors.jobTitle && (
                <div className="invalid-feedback">
                  {errors.jobTitle.message}
                </div>
              )}
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
            <div className="col-lg-6">
              <label className="form-label mb-2">Employer Email</label>
              <input
                type="email"
                value={currentUser.email}
                placeholder="E-mail"
                {...register("employerEmail", {
                  required: "Employer Email is required",
                })}
                className={`form-control ${
                  errors.employerEmail ? "is-invalid" : ""
                }`}
              />
              {errors.employerEmail && (
                <div className="invalid-feedback">
                  {errors.employerEmail.message}
                </div>
              )}
            </div>
          </div>

          {salaryType === "Fixed" && (
            <div className="row g-4">
              <div className="col-lg-6">
                <label className="form-label mb-2">Minimum Salary</label>
                <input
                  placeholder="20k"
                  {...register("minPrice", {
                    required: "Minimum Salary is required",
                  })}
                  className={`form-control ${
                    errors.minPrice ? "is-invalid" : ""
                  }`}
                />
                {errors.minPrice && (
                  <div className="invalid-feedback">
                    {errors.minPrice.message}
                  </div>
                )}
              </div>
              <div className="col-lg-6">
                <label className="form-label mb-2">Maximum Salary</label>
                <input
                  placeholder="100k"
                  {...register("maxPrice", {
                    required: "Maximum Salary is required",
                  })}
                  className={`form-control ${
                    errors.maxPrice ? "is-invalid" : ""
                  }`}
                />
                {errors.maxPrice && (
                  <div className="invalid-feedback">
                    {errors.maxPrice.message}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Country</label>
              <input
                placeholder="Ex: Afghanistan"
                {...register("country", { required: "Country is required" })}
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
              />
              {errors.country && (
                <div className="invalid-feedback">{errors.country.message}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Province</label>
              <input
                placeholder="Ex: Kabul"
                {...register("province", { required: "Province is required" })}
                className={`form-control ${
                  errors.province ? "is-invalid" : ""
                }`}
              />
              {errors.province && (
                <div className="invalid-feedback">
                  {errors.province.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Job Location</label>
              <input
                placeholder="Ex: Wazri Mohammad Akbar khan, street 17"
                {...register("location", {
                  required: "Job Location is required",
                })}
                className={`form-control ${
                  errors.location ? "is-invalid" : ""
                }`}
              />
              {errors.location && (
                <div className="invalid-feedback">
                  {errors.location.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Years of Experience</label>
              <input
                type="number"
                {...register("yearsOfExperience", {
                  required: "Years of Experience is required",
                })}
                className={`form-control ${
                  errors.yearsOfExperience ? "is-invalid" : ""
                }`}
              />
              {errors.yearsOfExperience && (
                <div className="invalid-feedback">
                  {errors.yearsOfExperience.message}
                </div>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Job Posting Date</label>
              <input
                className="form-control"
                {...register("postingDate", {
                  required: "Job Posting Date is required",
                })}
                placeholder="Ex: 2023-11-03"
                type="date"
              />
              {errors.postingDate && (
                <div className="invalid-feedback">
                  {errors.postingDate.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Closing Date</label>
              <input
                type="date"
                {...register("closingDate", {
                  required: "Closing Date is required",
                })}
                className={`form-control ${
                  errors.closingDate ? "is-invalid" : ""
                }`}
              />
              {errors.closingDate && (
                <div className="invalid-feedback">
                  {errors.closingDate.message}
                </div>
              )}
            </div>
          </div>

          <div className="row g-4">
            {/* <div className="col-lg-6">
              <label className="form-label mb-2">Company Logo</label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="form-control"
                // accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                accept=".png,.jpg,.jpeg"
                required
              />
              {`upload ${filePerc}% `}
            </div> */}
            <div className="col-lg-6">
              <label className="form-label mb-2">Company Logo</label>
              <input
                onChange={handleFileChange}
                type="file"
                className="form-control"
                // accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                accept=".png,.jpg,.jpeg"
                required
              />
              {`upload ${filePerc}% `}
              {fileUploadError && (
                <p className="text-danger">
                  Please upload a valid image file (PNG or JPEG).
                </p>
              )}
            </div>

            <div className="col-lg-6">
              <label className="form-label mb-2">Employment Type</label>
              <select
                {...register("employmentType", {
                  required: "Employment Type is required",
                })}
                className="form-control">
                <option value="">Select your job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
              {errors.employmentType && (
                <div className="invalid-feedback">
                  {errors.employmentType.message}
                </div>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Probation Period</label>
              <input
                type="text"
                {...register("probationPeriod", {
                  required: "Probation Period is required",
                })}
                className={`form-control ${
                  errors.probationPeriod ? "is-invalid" : ""
                }`}
              />
              {errors.probationPeriod && (
                <div className="invalid-feedback">
                  {errors.probationPeriod.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Contract Type</label>
              <select
                {...register("contractType", {
                  required: "Contract Type is required",
                })}
                className="form-control">
                <option value="">Select your contract type</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Fixed-term">Fixed-term</option>
              </select>
              {errors.contractType && (
                <div className="invalid-feedback">
                  {errors.contractType.message}
                </div>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Contract Duration</label>
              <input
                type="text"
                {...register("contractDuration", {
                  required: "Contract Duration is required",
                })}
                className={`form-control ${
                  errors.contractDuration ? "is-invalid" : ""
                }`}
              />
              {errors.contractDuration && (
                <div className="invalid-feedback">
                  {errors.contractDuration.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Contract Extensible</label>
              <select
                {...register("contractExtensible", {
                  required: "Contract Extensible is required",
                })}
                className="form-control">
                <option value="">Is contract extensible?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
              {errors.contractExtensible && (
                <div className="invalid-feedback">
                  {errors.contractExtensible.message}
                </div>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Minimum Education</label>
              <select
                {...register("minimumEducation", {
                  required: "Minimum Education is required",
                })}
                className="form-control">
                <option value="">Select Minimum Education</option>
                <option value="Graduated From High School">
                  Graduated From High School
                </option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD's Degree">PhD's Degree</option>
              </select>
              {errors.minimumEducation && (
                <div className="invalid-feedback">
                  {errors.minimumEducation.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="form-control">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">About Company</label>
              <textarea
                {...register("aboutCompany", {
                  required: "About Company is required",
                })}
                className={`form-control ${
                  errors.aboutCompany ? "is-invalid" : ""
                }`}
              />
              {errors.aboutCompany && (
                <div className="invalid-feedback">
                  {errors.aboutCompany.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Vacancies</label>
              <input
                type="number"
                {...register("vacancies", {
                  required: "Vacancies are required",
                })}
                className={`form-control ${
                  errors.vacancies ? "is-invalid" : ""
                }`}
              />
              {errors.vacancies && (
                <div className="invalid-feedback">
                  {errors.vacancies.message}
                </div>
              )}
            </div>
          </div>

          <div className="w-100">
            <label className="form-label mb-2">Job Summary</label>
            <textarea
              className={`form-control p-3 ${
                errors.jobSummary ? "is-invalid" : ""
              }`}
              rows={6}
              {...register("jobSummary", {
                required: "Job Summary is required",
              })}
              placeholder="Job summary"
            />
            {errors.jobSummary && (
              <div className="invalid-feedback">
                {errors.jobSummary.message}
              </div>
            )}
          </div>

          <div className="w-100">
            <label className="form-label mb-2">
              Duties and Responsibilities
            </label>
            <textarea
              className={`form-control p-3 ${
                errors.dutiesResponsibilities ? "is-invalid" : ""
              }`}
              rows={6}
              {...register("dutiesResponsibilities", {
                required: "Duties and Responsibilities are required",
              })}
              placeholder="Duties and responsibilities"
            />
            {errors.dutiesResponsibilities && (
              <div className="invalid-feedback">
                {errors.dutiesResponsibilities.message}
              </div>
            )}
          </div>

          <div className="w-100">
            <label className="form-label mb-2">Job Requirements</label>
            <textarea
              className={`form-control p-3 ${
                errors.jobRequirements ? "is-invalid" : ""
              }`}
              rows={6}
              {...register("jobRequirements", {
                required: "Job Requirements are required",
              })}
              placeholder="Job requirements"
            />
            {errors.jobRequirements && (
              <div className="invalid-feedback">
                {errors.jobRequirements.message}
              </div>
            )}
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

          <div className="row g-4">
            <div className="col-lg-6">
              <label className="form-label mb-2">Physical Requirements</label>
              <textarea
                {...register("physicalRequirements", {
                  required: "Physical Requirements are required",
                })}
                className={`form-control ${
                  errors.physicalRequirements ? "is-invalid" : ""
                }`}
              />
              {errors.physicalRequirements && (
                <div className="invalid-feedback">
                  {errors.physicalRequirements.message}
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label mb-2">Working Conditions</label>
              <textarea
                {...register("workingConditions", {
                  required: "Working Conditions are required",
                })}
                className={`form-control ${
                  errors.workingConditions ? "is-invalid" : ""
                }`}
              />
              {errors.workingConditions && (
                <div className="invalid-feedback">
                  {errors.workingConditions.message}
                </div>
              )}
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
