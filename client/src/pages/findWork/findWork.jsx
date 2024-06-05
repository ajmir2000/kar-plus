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
   const [searcchValue,setSearchValue]=useState("")
   const [selectedOption,setSelectedIption]=useState(null)
   const [jobData,setJobData]=useState([])

  useEffect(()=>{
    fetch("job.json").then(res=>res.json())
    .then(data=>setJobData(data))
  },[])
  
   const inputHamdleChange=(event)=>{
    setSearchValue(event.target.value)
   }
//-------checkbox based filtering----------
   const handleChange=(event)=>{
    setSelectedIption(event.target.value)
   }

   const filteredJob=jobData.filter((job)=>
    job.jobTitle.toLowerCase().indexOf(searcchValue.toLocaleLowerCase())!==-1 )






//---main function---

const filteredData=(jobData,selectedOption,searcchValue)=>{
  let filteredJobs=jobData

  if(searcchValue){
    filteredJobs=filteredJob;
  }
   
  if(selectedOption){
    filteredJobs = filteredJobs.filter(({ category, jobTitle, salaryRange })=>{
      jobTitle.toLowerCase()===selectedOption.toLowerCase() ||
      category.toLowerCase()===selectedOption.toLowerCase() ||
      salaryRange===selectedOption
    });

  
  }
 
    return filteredJobs;
 

}
 const result=filteredData(jobData,selectedOption,searcchValue)
console.log(result)









  return (
    <Container fluid className="bg-white ">
      <SearchBox
        placeholder="Search job..."
        className="custom-findWork-searchBox"
        searcchValue={searcchValue}
        inputHamdleChange={inputHamdleChange}  
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
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="Accounting"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Banking"
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="AI speacialist"
                    />
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="Writer"
                    />
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="Product Designer"
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
                      type="checkbox"
                      label="Kabul"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="checkbox"
                      label="Panishir"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="checkbox"
                      label="Kapisa"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="checkbox"
                      label="Parwan"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="checkbox"
                      label="Jalalabad"
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
                      Salary Range
                    </span>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="Any"
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="$0 - $20"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="$20 - $40"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="$50 - $100"
                      className="text-secondary custom-accordion-checked "
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="col-9">
            {result.map(job=>(
              <JobBox key={job.id} {...job}/>
            ))}
          </div>
        </Row>
      </div>
    </Container>
  );
}
