import React, { useEffect, useState } from "react";
import "./availableJob.css";
import JobCard from "../cards/jobCards/jobCard";
// import jobData from "../cards/jobCards/jobList";
import { Container, Row, Col } from "react-bootstrap";
import TalentCategory from "../talentCategory/talentCategory";
// import Pagination from "../PaginationPart/PaginationPart.jsx";
export default function AvailableJob() {
  const [jobData, setJobData] = useState([]);
  const [talentData, setTalentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //fetch("job.json").then((res) => res.json());
    fetch("/api/job/all-job")
      .then((res) => res.json())
      .then((data) => {
        setJobData(data);
        setLoading(false);
      });
    fetch("/api/gigs/")
      .then((res) => res.json())
      .then((data) => {
        setTalentData(data);
        setLoading(false);
      });
  }, []);
  console.log(talentData);
  return (
    <>
      <div className="vailable-job-container ">
        <div className="job-list-container rounded-5 m-auto d-flex flex-column  justify-content-center ">
          <h2 className="custom-avaliable-jobs">Available Jobs:</h2>
          <Container>
            <Row>
              {jobData.slice(0, 6).map((data) => (
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
