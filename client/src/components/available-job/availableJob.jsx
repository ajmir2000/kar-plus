import React from "react";
import "./availableJob.css";
import JobCard from "../cards/jobCards/jobCard";
import jobData from "../cards/jobCards/jobList";
import { Container, Row, Col } from "react-bootstrap";
import TalentCategory from "../talentCategory/talentCategory";
import Pagination from "../PaginationPart/PaginationPart.jsx";
export default function AvailableJob() {
  return (
    <div className="vailable-job-container ">
      <div className="job-list-container rounded-5 m-auto ">
        <h2 className="custom-avaliable-jobs">Avaliable Jobs:</h2>
        <Container className="px-5 mx-5">
          <Row className="d-flex justify-content-center ">
            {jobData.map((data) => (
              <div className="col-4" key={data.id}>
                <JobCard {...data} />
              </div>
            ))}
            <Pagination />
          </Row>
        </Container>
      </div>

      <div className=" talent-category-container">
        <h2 className="m-4 text-success pt-5 ">Our talents by category:</h2>
        <Container className="pb-5 mb-5">
          <Row>
            <div className="col-3">
              <TalentCategory />
            </div>
            <div className="col-3">
              <TalentCategory />
            </div>
            <div className="col-3">
              <TalentCategory />
            </div>
            <div className="col-3">
              <TalentCategory />
            </div>
            <div className="col-3">
              <TalentCategory />
            </div>
            <div className="col-3">
              <TalentCategory />
            </div>
            <div className="col-3">
              <TalentCategory />
            </div>
            <div className="col-3">
              <TalentCategory />
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}
