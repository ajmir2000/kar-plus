import React, { useState } from "react";
import "./searchBar.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import jobData from "../cards/jobCards/jobList";
import JobCard from "../cards/jobCards/jobCard";

export default function SearchBar() {
  const [selectState, setSelectState] = useState("talebt");

  const handleSelectChange = (event) => {
    setSelectState(event.target.value);

    console.log(selectState);
  };

  return (
    // <div>
    //   <div className="box-container">
    //     <div className="searchBox">
    //       <input type="text" placeholder="search..." />
    //       <span>
    //         |
    //         <select
    //           name="select"
    //           onChange={(event) => handleSelectChange(event)}>
    //           <option value="talent">talent</option>
    //           <option value="job">job</option>
    //         </select>
    //       </span>
    //     </div>

    //     <button>Search</button>
    //   </div>
    //   {selectState === "job" ? (
    //     <Container>
    //       <Row>
    //         {jobData
    //           .filter((data) => data.id <= 3)
    //           .map((data) => (
    //             <Col className="col-3 my-5 ">
    //               <JobCard {...data} key={data.id} />
    //             </Col>
    //           ))}
    //       </Row>
    //     </Container>
    //   ) : null}
    // </div>
    <div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex searchBox">
          <input type="text" class="form-control" placeholder="search..." />
          <span class="mx-2">
            |
            <select
              class="form-control"
              name="select"
              onChange={(event) => handleSelectChange(event)}>
              <option value="talent">talent</option>
              <option value="job">job</option>
            </select>
          </span>
        </div>

        <Button className="rounded-5 bg-white text-dark border-0">
          Search
        </Button>
      </div>
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
  );
}
