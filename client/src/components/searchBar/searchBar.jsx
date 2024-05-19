import React, { useState } from "react";
import "./searchBar.css";
import { Container, Button } from "react-bootstrap";
import jobData from "../cards/jobCards/jobList";
import JobCard from "../cards/jobCards/jobCard";

export default function SearchBar() {
  const [selectState, setSelectState] = useState("talebt");

  const handleSelectChange = (event) => {
    setSelectState(event.target.value);
  };

  return (
    <>
      <Container className="px-5">
        <div className="row mx-5 align-items-center">
          <div className="col-12 col-md-9">
            <div className="d-flex flex-md-row align-items-center ms-md-5 p-2 border-1 rounded-5 custom-background-color">
              <input
                type="text"
                className="form-control bg-transparent border-0 text-light w-100 w-md-75 mx-3 custom-focus-outline custom-placeholder-color"
                placeholder="search..."
              />
              <span className="d-flex ps-4">
                <span className="d-flex align-items-center text-light">|</span>
                <select
                  className="form-select-lg d-flex align-items-center text-light bg-transparent border-0 custom-focus-outline"
                  name="select"
                  onChange={(event) => handleSelectChange(event)}>
                  <option value="talent" className="text-dark bg-transparent">
                    talent
                  </option>
                  <option value="job" className="text-dark bg-transparent">
                    job
                  </option>
                </select>
              </span>
            </div>
          </div>
          <div className="col-12 col-md-3  mt-3 mt-md-0 d-flex justify-content-center">
            <Button className="rounded-5 bg-white text-dark border-0 py-3 w-100">
              <h5 className="d-flex align-items-center justify-content-center m-auto">
                Search
              </h5>
            </Button>
          </div>
        </div>
        <div>
          {selectState === "job" ? (
            <div className="container">
              <div className="row">
                {jobData
                  .filter((data) => data.id <= 3)
                  .map((data) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3 my-5 mx-4"
                      key={data.id}>
                      <JobCard {...data} />
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
}
