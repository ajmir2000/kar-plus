import React, { useState } from "react";
import "./searchBar.css";
import jobData from "../cards/jobCards/jobList";
import JobCard from "../cards/jobCards/jobCard";
import { Container, Row, Col } from "react-bootstrap";

export default function SearchBar() {
  return (
    <div>
      <p className="first-content">
        Find your dream job, Build your network or Hire the best talents!
      </p>
      <div className="box-container">
        <div className="searchBox">
          <input type="text" placeholder="search..." />
          <span>
            |
            <select name="select">
              <option value="talent">talent</option>
              <option value="job">job</option>
            </select>
          </span>
        </div>

        <button>Search</button>
      </div>
      <Container>
        <Row>
          {jobData.map((data) => (
            <Col className="col-4">
              <JobCard {...data} key={data.id} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
