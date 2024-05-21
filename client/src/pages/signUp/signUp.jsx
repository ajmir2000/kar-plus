import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MdAlternateEmail,MdOutlinePerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaUser } from 'react-icons/fa';
import "./signUp.css";

export default function SignUp() {
  return (
    <>
      <Container className="px-3 px-md-5 py-4 text-center">
        <div className="d-flex  flex-md-row gap-3 bg-white text-align-center justify-content-center mx-auto custom-signup-scale  ">
          <div className="custom-signup-sublings-div justify-content-center d-none d-md-block d-lg-block">
            <div className="custom-signup-div-style mx-auto mt-5 p-2 ">
              <h4 className="text-light my-5 mx-4">
                Unlock endless opportunities with just Signup
              </h4>
              <p className="text-light fs-6 fs-md-5">
                step in to your gatway to freelancing success and career
                advancement!{" "}
              </p>
              <div className="custom-signup-images">
                <img
                  src="./asset-folder/photos/icons8_man_with_money_480px.png"
                  alt="photo"
                  className="d-none d-md-inline"
                />
                <img
                  src="./asset-folder/photos/icons8_woman_480px.png"
                  alt="photo"
                  className="d-none d-md-inline"
                />
              </div>
            </div>
          </div>
          <div className="custom-signup-sublings-div ">
            <div className="header mt-5 me-4 pe-3">
              <h4 className="fw-bold">Create New Account</h4>
              <p className="muted custom-paragraph">Register to Karplus</p>
            </div>
            <form className="mt-4">
            <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
                <MdOutlinePerson className="fs-3 mt-1" />
                <input
                  className="bg-transparent border-0"
                  type="text"
                  placeholder="username"
                />
              </div>
              <div className="custom-signup-input-field d-flex text-align-center outline-none m-2 m-2">
                <MdAlternateEmail className="fs-3 mt-1" />
                <input
                  className="bg-transparent border-0 "
                  type="email"
                  placeholder="Email address"
                />
              </div>

              <div className="custom-signup-input-field d-flex text-align-center outline-none m-2">
                <RiLockPasswordLine className="fs-3 mt-1" />
                <input
                  className="bg-transparent border-0 "
                  type="password"
                  placeholder="password"
                />
              </div>

              

              <div className="custom-signup-submit mt-3">
                <input
                  className="border-0 bg-transparent text-light btn btn-primary"
                  type="submit"
                  value="Register"
                />
              </div>
              <div className="d-flex text-align-left ms-2 custom-signup-checkbox mt-3">
                <input type="checkbox" className="me-2" />i accept{" "}
                <span className="fw-bold text-decoration-underline ms-2">
                  term of service and privacy policy
                </span>
              </div>

              <p className="mt-3">--- or login with ---</p>
              <div className="d-flex custom-signup-buttons">
                <button className="btn btn-light">
                  <FcGoogle /> Google
                </button>
                <button className="btn btn-light">
                  <RiFacebookCircleFill className="text-primary" />
                  facebook
                </button>
              </div>
              <p className="mt-2 lead custom-signup-suggestion">
                Already have an acount?{" "}
                <Link
                  to="/signin"
                  className="text-success text-decoration-none">
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
