import React from "react";
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

export default function FindTalent() {
  return (
    <Container fluid className="bg-white ">
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
                    <span className="text-secondary ">Experience level</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="Entry Level"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Intermediate"
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="checkbox"
                      className="text-secondary custom-accordion-checked "
                      label="Expert"
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
                      name="salaryRange"
                      label="Any Salary Range"
                      className="text-secondary custom-accordion-checked "
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      name="salaryRange"
                      label="$100 - $200"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="radio"
                      name="salaryRange"
                      label="$300 - $500"
                      className="text-secondary custom-accordion-checked "
                    />
                    <Form.Check
                      type="radio"
                      name="salaryRange"
                      label="$600 - $1000"
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
