import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { Link, useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import { VscGitStashApply } from "react-icons/vsc";
import "bootstrap/dist/css/bootstrap.min.css";

const JobDetails = () => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/job/all-job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobData(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const {
    companyName,
    aboutCompany,
    jobTitle,
    companyLogo,
    jobLocation,
    salaryFrom,
    salaryTo,
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
  } = jobData;

  return (
    <div className="container">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />
      <div className="mt-4 p-4 bg-light rounded">
        <h6 className="font-weight-bold mb-3">Job ID: {id}</h6>
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="img-fluid mb-3"
            />
            <h4 className="font-weight-bold">{companyName}</h4>
            <p className="text-muted">{jobLocation}</p>
            <p className="text-muted">
              Posted on:{" "}
              {new Date(postingDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <p></p>
            </p>
          </div>
          <div className="col-md-8">
            <h4 className="font-weight-bold">{jobTitle}</h4>
            <p className="text-muted">{aboutCompany}</p>
            <p>
              <strong>Location:</strong> {location}, {province}, {country}
            </p>
            <p>
              <strong>Salary: </strong>
              {salaryType === "Fixed" ? (
                <span>
                  &#1547; {salaryFrom} - &#1547; {salaryTo}
                </span>
              ) : (
                <span>{salaryType}</span>
              )}
            </p>
            <p>
              <strong>Employment Type:</strong> {employmentType}
            </p>
            <p>
              <strong>Closing Date:</strong>{" "}
              {new Date(closingDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-weight-bold">Job Summary</h4>
          <p className="text-wrap w-100 text-break">{jobSummary}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-weight-bold">Duties and Responsibilities</h4>
          <p className="text-wrap w-100 text-break">{dutiesResponsibilities}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-weight-bold">Job Requirements</h4>
          <p className="text-wrap w-100 text-break">{jobRequirements}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-weight-bold">Skills</h4>
          <ul className="list-unstyled">
            {skills.map((skill, index) => (
              <li key={index}>{skill.label}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-weight-bold">Additional Information</h4>
          <p>
            <strong>Vacancies:</strong> {vacancies}
          </p>
          <p>
            <strong>Years of Experience:</strong> {yearsOfExperience}
          </p>
          <p>
            <strong>Probation Period:</strong> {probationPeriod}
          </p>
          <p>
            <strong>Contract Duration:</strong> {contractDuration}
          </p>
          <p>
            <strong>Contract Type:</strong> {contractType}
          </p>
          <p>
            <strong>Contract Extensible: </strong> 
            {contractExtensible}
          </p>
          <p>
            <strong>Minimum Education:</strong> {minimumEducation}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
          <p className="text-wrap w-100 text-break">
            <strong>Physical Requirements:</strong>{" "}
            {physicalRequirements === "" ? (
              <span>Not Specify </span>
            ) : (
              <span> {physicalRequirements}</span>
            )}
          </p>
          <p className="text-wrap w-100 text-break">
            <strong>Working Conditions: </strong>

            {workingConditions === "" ? (
              <span>Not Specify </span>
            ) : (
              <span> {workingConditions}</span>
            )}
          </p>
        </div>

        <div className="mt-4 d-flex justify-content-center">
          <Link
            to={`/apply-job/${id}`}
            className="btn btn-primary d-flex align-items-center btn btn-success border-0">
            <VscGitStashApply className="fs-4 me-2 " />
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
