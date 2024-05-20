import React from "react";
import "./availableJob.css";
import JobCard from "../cards/jobCards/jobCard";
import jobData from "../cards/jobCards/jobList";
import { Container, Row, Col } from "react-bootstrap";
import TalentCategory from "../talentCategory/talentCategory";
import Pagination from "../PaginationPart/PaginationPart.jsx";
export default function AvailableJob() {
  return (
    <>
      <div className="vailable-job-container ">
        <div className="job-list-container rounded-5 m-auto d-flex flex-column  justify-content-center ">
          <h2 className="custom-avaliable-jobs">Available Jobs:</h2>
          <Container>
            <Row>
              {jobData.map((data) => (
                <div
                  className="col-12 col-md-6 col-lg-4 py-lg-1 px-lg-1 p-xl-2   d-flex justify-content-center m-auto  "
                  key={data.id}>
                  <JobCard {...data} />
                </div>
              ))}
              <Pagination />
            </Row>
          </Container>
        </div>

        {/* <div className=" talent-category-container">
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
        </div> */}
        <div className="talent-category-container">
          <h2 className="m-4 text-success py-5">Our talents by category:</h2>
          <Container className="pb-5 mb-5">
            <Row>
              {Array.from({ length: 8 }).map((_, index) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4 d-flex justify-content-center "
                  key={index}>
                  <TalentCategory />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
