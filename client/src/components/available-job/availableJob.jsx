import React, { useEffect, useState } from "react";
import "./availableJob.css";
import JobCard from "../cards/jobCards/jobCard";
// import jobData from "../cards/jobCards/jobList";
import { Container, Row, Col } from "react-bootstrap";
import TalentCategory from "../talentCategory/talentCategory";
// import Pagination from "../PaginationPart/PaginationPart.jsx";
export default function AvailableJob() {
  const [talentData, setTalentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    //fetch("job.json").then((res) => res.json());
    fetch("/api/job/all-job")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      });
    fetch("/api/gigs/")
      .then((res) => res.json())
      .then((data) => {
        setTalentData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filter = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJobs(filter);
  }, [searchText, jobs]);
  console.log(talentData);
  return (
    <>
      <div className="vailable-job-container ">
        <div className="custom-available-search-box-container w-50 rounded-5 d-flex p-2 align-center">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            className="form-control mb-2 mb-md-0 me-md-3 p-2 focus-ring-0 custom-no-outline"
            placeholder="Search jobs"
          />
        </div>
        <div className="job-list-container rounded-5 m-auto d-flex flex-column  justify-content-center ">
          <h2 className="custom-avaliable-jobs">Available Jobs:</h2>
          <Container>
            <Row>
              {filteredJobs.slice(0, 6).map((data) => (
                <div
                  className="col-12 col-md-6 col-lg-4 py-lg-1 px-lg-1 p-xl-2   d-flex justify-content-center m-auto  "
                  key={data._id}>
                  <JobCard props={data} />
                </div>
              ))}
              {/* <Pagination /> */}
            </Row>
          </Container>
        </div>

        <div className="talent-category-container">
          <h2 className="m-4 text-success py-5">Our Talents:</h2>
          <Container className="pb-5 mb-5">
            <Row>
              {talentData.slice(0, 6).map((data) => (
                <div
                  className="col-12 col-md-6 col-lg-4 py-lg-1 px-lg-1 p-xl-2   d-flex justify-content-center m-auto  my-2"
                  key={data._id}>
                  <TalentCategory props={data} />
                </div>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
