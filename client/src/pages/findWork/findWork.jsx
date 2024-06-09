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

  useEffect( () => {
    // fetch("job.json").then((res) => res.json());
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

  //---main function---

  const filteredData = (jobData, selectedOption, searchValue) => {
    let filteredJobs = jobData;

    if (searchValue) {
      filteredJobs = filteredJob;
    }

    if (selectedOption) {
      filteredJobs = filteredJobs.filter(
        ({ category, jobLocation, salaryRange }) => {
          return (
            
            jobLocation.toLowerCase() === selectedOption.toLowerCase() ||
            category.toLowerCase() === selectedOption.toLowerCase() ||
            salaryRange.toLowerCase() === selectedOption.toLowerCase()
          );
        }
      );
    }

    return filteredJobs;
  };
  const result = filteredData(jobData, selectedOption, searchValue);
  console.log(result);

  console.log(selectedOption);

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
                  className="border-0 bg-transparent ">
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
                  className="border-0 bg-transparent  ">
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
                      label="Kabul"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Kabul"
                      name="location"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Panishir"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Panjshir"
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
                  className="border-0 bg-transparent ">
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
            </div>
          </div>
          <div className="col-9">
            {result.map((job) => (
              <JobBox key={job._id} {...job} />
            ))}
          </div>
        </Row>
      </div>
    </Container>
  );
}
