import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "./VerifyCode.css";
import { Container, Row } from "react-bootstrap";

export default function VerifyCode() {
  const [otp, setOtp] = useState("");
  return (
    <>
      <Container>
        <Row>
          <div className="w-50 bg-white m-auto p-4 rounded-5  ">
            <div>
              <p className="d-flex justify-content-center fw-bold  h2">Kar+</p>
              <p className="d-flex justify-content-center h4">
                Verify Your Email
              </p>
              <p className="d-flex justify-content-center custom-font-size-send-email ">
                we send a 5-digit code to
                <span className="ps-1 fw-bold  ">{`<YourEmail>`}</span>
              </p>
            </div>

            <div className="d-flex justify-content-center py-5  h1  custom-verify-input  ">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={5}
                renderSeparator={<span className="px-2">-</span>}
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus={true}
              />
            </div>
            <div>
              <button className="custom-verify-btn w-50 text-white  border-0 rounded-3 py-2 d-flex  justify-content-center m-auto  ">
                Verify
              </button>
              <p className="text-muted  mt-3 d-flex  justify-content-center custom-resend-code ">
                Yet to receive code?{" "}
                <a href="#" className="px-1">
                  Resend Code in 30 sec
                </a>
              </p>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}
