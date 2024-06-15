import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import JobTalentSwitch from "../../components/JobTalentSwitch/JobTalentSwitch";
import JobBox from "../../components/job-box/jobBox";

import {
  Accordion,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import SearchBox from "../../components/searchBox/searchBox";

export default function FindWork() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedIption] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    //fetch("job.json").then((res) => res.json());
    fetch("/api/job/all-job")
      .then((res) => res.json())
      .then((data) => {
        setJobData(data);
        setLoading(false);
      });
  }, []);

  const inputHandleChange = (event) => {
    setSearchValue(event.target.value);
  };
  //-------checkbox based filtering----------
  const handleChange = (event) => {
    setSelectedIption(event.target.value);
  };

  const filteredJob = jobData.filter(
    (job) =>
      job.jobTitle.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1
  );

  // Function to calculate the index range for the current page
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJob.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //---main function---

  const filteredData = (jobData, selectedOption, searchValue, salaryType) => {
    let filteredJobs = jobData;

    if (searchValue) {
      filteredJobs = filteredJob;
    }

    if (selectedOption) {
      filteredJobs = filteredJobs.filter(
        ({ jobLocation, category, salaryRange,salaryType, experienceLevel }) => {
          return (
            (jobLocation &&
              jobLocation.toLowerCase() === selectedOption.toLowerCase()) ||
            (category &&
              category.toLowerCase() === selectedOption.toLowerCase()) ||
            (salaryRange &&
              salaryRange.toLowerCase() === selectedOption.toLowerCase()) ||
            (salaryType &&
              salaryType.toLowerCase() === selectedOption.toLowerCase()) ||
             ( experienceLevel && experienceLevel.toLowerCase()===selectedOption.toLowerCase()
          )
        )
        }
      );
    }

    return filteredJobs;
  };
  let result = filteredData(jobData, selectedOption, searchValue);
  console.log(result);

  console.log(selectedOption);

  const { startIndex, endIndex } = calculatePageRange();
result = result.slice(startIndex, endIndex);


  return (
    <Container fluid className="bg-white ">
      <SearchBox
        placeholder="Search job..."
        className="custom-findWork-searchBox"
        searchValue={searchValue}
        inputHandleChange={inputHandleChange}
      />
      <div className="container pt-5">
        <JobTalentSwitch />
        <Row className="d-flex  ">
          <div className="col-3">
            <div className="mt-5  border-end pe-3">
              <Accordion>
                <Accordion.Item
                  eventKey="0"
                  className="border-0 bg-transparent "
                >
                  <Accordion.Header className="custom-accordion-header bg-white ">
                    <span className="text-secondary ">Category</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      className="text-secondary custom-accordion-checked "
                      label="All categories"
                      defaultValue=""
                      name="category"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      className="text-secondary custom-accordion-checked "
                      label="Accounting"
                      defaultValue="Accounting"
                      name="category"
                      onChange={handleChange}
                    />
                    =
                    <Form.Check
                      type="radio"
                      label="Banking"
                      defaultValue="Banking"
                      name="category"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      defaultValue="AI speacialist"
                      name="category"
                      className="text-secondary custom-accordion-checked "
                      label="AI speacialist"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      className="text-secondary custom-accordion-checked "
                      label="Writer"
                      defaultValue="Writer"
                      name="category"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      className="text-secondary custom-accordion-checked "
                      label="Product Designer"
                      name="category"
                      defaultValue="Product Designer"
                      onChange={handleChange}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion>
                <Accordion.Item
                  eventKey="1"
                  className="border-0 bg-transparent  "
                >
                  <Accordion.Header className="custom-accordion-header bg-white ">
                    {" "}
                    <span className="text-secondary custom-accordion-header">
                      Location
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <InputGroup className="mb-3">
                      <FormControl placeholder="Location" />
                      <Button variant="outline-secondary">Search</Button>
                    </InputGroup>

                    <Form.Check
                      type="radio"
                      label="ALl"
                      className="text-secondary custom-accordion-checked "
                      defaultValue=""
                      name="location"
                      onChange={handleChange}
                    />

                    <Form.Check
                      type="radio"
                      label="San Francisco"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="San Francisco"
                      name="location"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Brussels"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Brussels"
                      name="location"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Kapisa"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Kapisa"
                      name="location"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Parwan"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Parwan"
                      name="location"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Jalalabad"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Jalalabad"
                      name="location"
                      onChange={handleChange}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion>
                <Accordion.Item
                  eventKey="2"
                  className="border-0 bg-transparent "
                >
                  <Accordion.Header className="custom-accordion-header bg-white ">
                    {" "}
                    <span className="text-secondary custom-accordion-header">
                      Salary Range
                    </span>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="Any"
                      defaultValue=""
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="$0 - $20"
                      defaultValue="$0-$20"
                      className="text-secondary custom-accordion-checked "
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="$20 - $40"
                      defaultValue="$20 - $40"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="$50 - $100"
                      defaultValue="$50 - $100"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Accordion>
                <Accordion.Item
                  eventKey="2"
                  className="border-0 bg-transparent "
                >
                  <Accordion.Header className="custom-accordion-header bg-white ">
                    {" "}
                    <span className="text-secondary custom-accordion-header">
                      SalaryType
                    </span>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      name="SalaryType"
                      label="Hourly"
                      defaultValue="hourly"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      name="SalaryType"
                      label="Monthly"
                      defaultValue="monthly"
                      className="text-secondary custom-accordion-checked "
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name="SalaryType"
                      label="Yearly"
                      defaultValue="yearly"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Accordion>
                <Accordion.Item
                  eventKey="2"
                  className="border-0 bg-transparent "
                >
                  <Accordion.Header className="custom-accordion-header bg-white ">
                    {" "}
                    <span className="text-secondary custom-accordion-header">
                      Experience level
                    </span>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      name="experienceLevel"
                      label="No experience"
                      defaultValue="Any experience"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      name="experienceLevel"
                      label="Internship"
                      defaultValue="Internship"
                      className="text-secondary custom-accordion-checked "
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      name="experienceLevel"
                      label="Work remotely"
                      defaultValue="Work remotely"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="col-9">
            <h2 className="mx-auto mt-3">{result.length} Jobs</h2>

            {result.length > 0 ? (
              result.map((job) => <JobBox key={job._id} {...job} />)
            ) : (
              <p> no job found</p>
            )}

            {result.length > 0 ? (
              <div className="d-flex justify-content-center mt-4 p-5 ">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className=" btn btn-success text-light p-2 me-2"
                >
                  Previous
                </button>
                <span className="nt-2 fw-bold">
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredJob.length / itemsPerPage)}
                </span>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage === Math.ceil(filteredJob.length / itemsPerPage)
                  }
                  className=" btn btn-success text-light p-2 ms-2"
                >
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </Row>
      </div>
    </Container>
  );
}
