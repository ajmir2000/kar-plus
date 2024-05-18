import React from "react";
import "./findTalent.css";
import { Container } from "react-bootstrap";
import JobTalentSwitch from "../../components/JobTalentSwitch/JobTalentSwitch";

export default function FindTalent() {
  return   <Container fluid className="bg-white ">
  <div className="container pt-5">
    <JobTalentSwitch />
  </div>
</Container>
}
