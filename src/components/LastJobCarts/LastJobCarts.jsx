import React from "react";
import "./LastJobCarts.css";
import jobData from "../cards/jobCards/jobList";
import { Container, Row, Col } from "react-bootstrap";
import JobCard from "../cards/jobCards/jobCard";

export default function LastJobCarts() {
  return (
    <>
      <Container>
        <Row>
          {jobData.map((data) => (
            <Col className="col-4">
              <JobCard {...data} key={data.id} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
