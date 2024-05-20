import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import "./signIn.css";

export default function SignIn() {
  return (
    <>
      <Container className="px-5 py-4 text-center">
        <div className=" d-flex gap-2 bg-white text-align-center justify-content-center mx-auto custom-signin-scale ">
          <div className=" custom-sublings-div justify-content-center d-none d-md-block  ">
            <div className="custom-div-style mx-auto mt-5 p-2">
              <h4 className="text-light my-5 mx-4">
                Unlock endless opportunities with just one login
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
            <div className="header mt-5">
              <h2 className="text-success fw-bold">kar+</h2>
              <h4 className="fw-bold">Welcome Back!</h4>
              <p className=" muted custom-paragraph">
                please log in to your acount
              </p>
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
              <div className="text-end text-success me-5 custom-forget-password">
                {" "}
                forgot password?
              </div>
              <div className="custom-submit mt-3">
                <input
                  className="border-0 bg-transparent text-light"
                  type="submit"
                  value="login"
                />
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
                don't have an acount?{" "}
                <Link
                  to="/signup"
                  className="text-success text-decoration-none">
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
