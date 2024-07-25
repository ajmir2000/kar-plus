import React from "react";
import "./findTalent.css";
import { Container, Row } from "react-bootstrap";

import {
  Accordion,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import JobTalentSwitch from "../../components/JobTalentSwitch/JobTalentSwitch";

import TalentBox from "../../components/talent-box/talentBox";
import SearchBox from "../../components/searchBox/searchBox";



export default function FindTalent() {
  return (
    <Container fluid className="bg-white ">
      <SearchBox placeholder="find talent..."/>
      <div className="container pt-5">
        {/* <JobTalentSwitch /> */}

        <Row className="d-flex  ">
          <div className="col-3">
            <div className="mt-5  border-end pe-3">
              <Accordion>
                <Accordion.Item
                  eventKey="0"
                  className="border-0 bg-transparent "
                >
                  <Accordion.Header className="custom-accordion-header bg-white ">
                    <span className="text-secondary ">Skills</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="Web Developer"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Graphic Designer"
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="Writer"
                    />
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="AI Engineer"
                    />
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="SEO Analysis"
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
                      Hourly Rate
                    </span>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      name="hourlyRate"
                      label="Any hourly rate"
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
            <TalentBox />
            <TalentBox />
            <TalentBox />
            <TalentBox />
            <TalentBox />
            <TalentBox />
          </div>
        </Row>
      </div>
    </Container>
  );
}
