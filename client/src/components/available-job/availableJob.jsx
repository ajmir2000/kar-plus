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
      <div className="job-list-container rounded-5 m-auto mt-5 ">
        <h2 className="ms-5 mt-4 text-success">Available Jobs:</h2>
        <Container>
          <Row className="d-flex justify-content-center me-4  ">
            {jobData.map((data) => (
              <div className="col-4 me-5" key={data.id}>
                <JobCard {...data} />
              </div>
            ))}
            <Pagination />
          </Row>
        </Container>
      </div>
      

      <div className=" talent-category-container">
        <h2 className="m-5 text-success ">Our talents by category:</h2>
        <Container>
          <Row>
            <Col className="col-3">
              <TalentCategory />
              <TalentCategory />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
