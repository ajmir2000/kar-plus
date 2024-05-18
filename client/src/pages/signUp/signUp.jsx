import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import "./signUp.css";

export default function SignUp() {
  return (
    <Container className="px-5 py-4 text-center">
      <div className=" d-flex gap-2 bg-white text-align-center justify-content-center mx-auto custom-scale ">
        <div className=" custom-sublings-div justify-content-center">
          <div className="custom-div-style mx-auto mt-5 p-2">
            <h4 className="text-light my-5 mx-4">
              Unlock endless opportunities with just Signup
            </h4>
            <p className="text-light fs-0.1">
              step in to your gatway to freelancing success and career
              advancement!{" "}
            </p>
            <div className="images">
              <img
                src="./asset-folder/photos/icons8_man_with_money_480px.png"
                alt="photo"
              />
              <img
                src="./asset-folder/photos/icons8_woman_480px.png"
                alt="photo"
              />
            </div>
          </div>
        </div>
        <div className=" custom-sublings-div ">
          <div className="header mt-5 me-4 pe-3">
            <h4 className="fw-bold ">Create New Account</h4>
            <p className=" muted custom-paragraph">Register to Karplus</p>
          </div>
          <form className="mt-4">
            <div className="custom-input-field d-flex text-align-center outline-none m-2 m-2">
              <MdAlternateEmail className="fs-3 mt-1" />
              <input
                className="bg-transparent border-0"
                type="email"
                placeholder="Email address"
              />
            </div>

            <div className="custom-input-field d-flex text-align-center outline-none m-2">
              <RiLockPasswordLine className="fs-3 mt-1" />
              <input
                className="bg-transparent border-0"
                type="password"
                placeholder="password"
              />
            </div>

            <div className="custom-input-field d-flex text-align-center outline-none m-2">
              <RiLockPasswordLine className="fs-3 mt-1" />
              <input
                className="bg-transparent border-0"
                type="password"
                placeholder="Re-Type Password"
              />
            </div>

            <div className="custom-submit mt-3">
              <input
                className="border-0 bg-transparent text-light"
                type="submit"
                value="Register"
              />
            </div>
            <div className="d-flex text-align-left ms-2 custom-checkbox mt-3">
              <input type="checkbox" className="me-2" />i accept{" "}
              <span className="fw-bold text-decoration-underline ms-2">
                term of service and privacy policy
              </span>
            </div>

            <p className="mt-3">--- or login with ---</p>
            <div className="d-flex custom-buttons">
              <button className="btn btn-light">
                <FcGoogle /> Google
              </button>
              <button className="btn btn-light">
                <RiFacebookCircleFill className="text-primary" />
                facebook
              </button>
            </div>
            <p className="mt-2 lead custom-suggestion">
              Already have an acount?{" "}
              <Link to="/signin" className="text-success text-decoration-none">
                login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Container>
  );
}
