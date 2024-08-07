import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import JobBox from "../../components/job-box/jobBox";
import { Accordion, Form } from "react-bootstrap";
import SearchBox from "../../components/searchBox/searchBox.jsx";

export default function FindWork() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
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
    setSelectedOption(event.target.value);
  };
  // console.log(jobData);
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
  // console.log(selectedOption);
  const filteredData = (jobData, selectedOption, searchValue, salaryType) => {
    let filteredJobs = jobData;
    
    // Filter out jobs with dates that have passed
    const currentDate = new Date();
    filteredJobs = filteredJobs.filter((job) => {
      const jobDate = new Date(job.closingDate); // Assuming there's a 'date' field in your job data
      return jobDate >= currentDate;
    });

    console.log(filteredJobs);
    if (searchValue) {
      filteredJobs = filteredJob;
    }

    if (selectedOption) {
      filteredJobs = filteredJobs.filter(
        ({ province, category, salaryRange, salaryType, experienceLevel }) => {
          return (
            (province &&
              province.toLowerCase() === selectedOption.toLowerCase()) ||
            (category &&
              category.toLowerCase() === selectedOption.toLowerCase()) ||
            (salaryRange &&
              salaryRange.toLowerCase() === selectedOption.toLowerCase()) ||
            (salaryType &&
              salaryType.toLowerCase() === selectedOption.toLowerCase()) ||
            (experienceLevel &&
              experienceLevel.toLowerCase() === selectedOption.toLowerCase())
          );
        }
      );
    }

    return filteredJobs;
  };
  let result = filteredData(jobData, selectedOption, searchValue);

  const jobsAmount = result.length;

  const { startIndex, endIndex } = calculatePageRange();
  result = result.slice(startIndex, endIndex);
  // console.log(result);

  return (
    <Container fluid className="bg-white ">
      <SearchBox
        placeholder="Search job..."
        searchValue={searchValue}
        inputHandleChange={inputHandleChange}
      />
      <div className="container pt-5">
        <Row className="d-flex">
          <div className="col-sm-12 col-md-3">
            <div className="mt-5  border-end pe-3">
              <Accordion>
                <Accordion.Item
                  eventKey="0"
                  className="border-0 bg-transparent "></Accordion.Item>
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
                    <Form.Check
                      type="radio"
                      label="All"
                      className="text-secondary custom-accordion-checked "
                      defaultValue=""
                      name="province"
                      onChange={handleChange}
                      defaultChecked
                    />

                    <Form.Check
                      type="radio"
                      label="Kabul"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Kabul"
                      name="province"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Jalalabad"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Jalalabad"
                      name="province"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Mazar-i-Sharif
"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Mazar-i-Sharif
"
                      name="province"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Kandahar"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Kandahar"
                      name="province"
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Herat"
                      className="text-secondary custom-accordion-checked "
                      defaultValue="Herat"
                      name="province"
                      onChange={handleChange}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Accordion>
                <Accordion.Item
                  eventKey="1"
                  className="border-0 bg-transparent ">
                  <Accordion.Header className="custom-accordion-header bg-white ">
                    {" "}
                    <span className="text-secondary custom-accordion-header">
                      SalaryType
                    </span>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      name="salaryType"
                      label="All"
                      defaultValue=""
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      name="salaryType"
                      label="Fixed"
                      defaultValue="Fixed"
                      onChange={handleChange}
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="radio"
                      name="salaryType"
                      label="Per Company Scale"
                      defaultValue="As per Company Scale"
                      className="text-secondary custom-accordion-checked "
                      onChange={handleChange}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="col-sm-12 col-md-9">
            <h2 className="mx-auto mt-3">{jobsAmount} Jobs</h2>

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
                  className=" btn btn-success text-light p-2 me-2">
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
                  className=" btn btn-success text-light p-2 ms-2">
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
