import React from "react";
import JobTalentSwitch from "../../components/JobTalentSwitch/JobTalentSwitch";
import { Container } from "react-bootstrap";
import VerifyCode from "../../components/VerifyCode/VerifyCode";
export default function FindWork() {
  return (
    <Container fluid className="bg-white ">
      <div className="container pt-5">
        <JobTalentSwitch />
        <VerifyCode />
      </div>
    </Container>
  );
}
