import React from "react";
import JobTalentSwitch from "../../components/JobTalentSwitch/JobTalentSwitch";
import { Container } from "react-bootstrap";
export default function FindWork() {
  return (
    <Container fluid className="bg-white ">
      <div className="container pt-5">
        <JobTalentSwitch />
      </div>
    </Container>
  );
}
