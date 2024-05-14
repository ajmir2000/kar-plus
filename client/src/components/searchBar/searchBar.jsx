import React, { useState } from "react";
import "./searchBar.css";
import { Container, Button} from "react-bootstrap";
import jobData from "../cards/jobCards/jobList";
import JobCard from "../cards/jobCards/jobCard";

export default function SearchBar() {
  const [selectState, setSelectState] = useState("talebt");

  const handleSelectChange = (event) => {
    setSelectState(event.target.value);
  };

  return (
    <Container className="px-5">
      <div className="d-flex align-items-center mx-5 row">
        <div className="d-flex ms-5 p-2  w-75  border-1 rounded-5  custom-background-color  col-11 ">
          <input
            type="text"
            className="form-control bg-transparent border-0 text-light w-75 mx-3 custom-focus-outline custom-placeholder-color"
            placeholder="search..."
          />
          <span className=" d-flex ps-4 ">
            <span className="d-flex align-items-center  text-light ">|</span>

            <select
              className="form-select-lg d-flex align-items-center  text-light  bg-transparent border-0  custom-focus-outline"
              name="select"
              onChange={(event) => handleSelectChange(event)}>
              <option value="talent" className="text-dark bg-transparent ">
                talent
              </option>
              <option value="job" className="text-dark bg-transparent">
                job
              </option>
            </select>
          </span>
        </div>

        <Button className="rounded-5 bg-white text-dark border-0 ms-4 py-3  col-2">
         <h4 className="d-flex align-items-center  justify-content-center  m-auto "> Search</h4>
        </Button>
      </div>
      <div>
        {selectState === "job" ? (
          <div class="container">
            <div class="row">
              {jobData
                .filter((data) => data.id <= 3)
                .map((data) => (
                  <div class="col-3 my-5 ">
                    <JobCard {...data} key={data.id} />
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
