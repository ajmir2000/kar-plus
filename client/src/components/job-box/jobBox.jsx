import React from "react";
import "./jobBox.css";
import { FaBookmark } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { GoDiscussionOutdated } from "react-icons/go";
import { TbCurrencyAfghani } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function JobBox({

  _id, companyName,
  aboutCompany,
  jobTitle,
  companyLogo,
  jobLocation,
  salaryFrom,
  salaryTo,
  companySalary,
  salaryType,
  postingDate,
  employmentType,
  jobSummary,
  dutiesResponsibilities,
  jobRequirements,
  skills,
  country,
  province,
  location,
  closingDate,
  vacancies,
  yearsOfExperience,
  probationPeriod,
  contractDuration,
  contractType,
  contractExtensible,
  minimumEducation,
  gender,
  physicalRequirements,
  workingConditions,
  minPrice,
  maxPrice,
  employerId,

}) {
  const formattedPostingDate = postingDate ? postingDate.slice(0, 10) : "N/A";
  

  const jobData = {
   
  _id, companyName,
  aboutCompany,
  jobTitle,
  companyLogo,
  jobLocation,
  salaryFrom,
  salaryTo,
  companySalary,
  salaryType,
  postingDate,
  employmentType,
  jobSummary,
  dutiesResponsibilities,
  jobRequirements,
  skills,
  country,
  province,
  location,
  closingDate,
  vacancies,
  yearsOfExperience,
  probationPeriod,
  contractDuration,
  contractType,
  contractExtensible,
  minimumEducation,
  gender,
  physicalRequirements,
  workingConditions,
  minPrice,
  maxPrice,
  employerId,
  };

  return (
    <div className="col-md-9 mb-4">
      <Link
        to={`/job-detail/${_id}`}
        state={{ jobData }}
        className="text-decoration-none">
        <div className="card shadow-sm border-0">
          <div className="row g-0">
            <div className="col-md-2 d-flex align-items-center justify-content-center">
              <img
                src={jobData.companyLogo}
                alt="Company Logo"
                className="img-fluid p-3"
              />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title mb-1">{jobTitle}</h5>
                  <FaBookmark className="fs-4 text-success" />
                </div>
                <p className="text-muted mb-1">{jobData.companyName}</p>
                <div className="d-flex flex-wrap gap-2 my-2">
                  <span className="badge bg-light text-dark d-flex align-items-center">
                    <CiLocationOn className="text-success fs-5 me-1" />{" "}
                    {location}
                  </span>
                  <span className="badge bg-light text-dark d-flex align-items-center">
                    <FaRegClock className="text-success fs-5 me-1" />{" "}
                    {employmentType}
                  </span>
                  <span className="badge bg-light text-dark d-flex align-items-center">
                    <TbCurrencyAfghani className="text-success fs-5 me-1" />{" "}
                    {minPrice}-{maxPrice}k
                  </span>
                  <span className="badge bg-light text-dark d-flex align-items-center">
                    <GoDiscussionOutdated className="text-success fs-5 me-1" />{" "}
                    {formattedPostingDate}
                  </span>
                </div>
                <p className="card-text mt-3 text-muted">
                  {jobData.jobSummary}
                </p>
                <button className="btn btn-outline-success btn-sm mt-2">
                  <FiInfo className="me-1" /> Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
