import React from "react";
import "./Footer.css";
import { Button, Container, Row, Col, Nav, Form } from "react-bootstrap";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Container className="py-5 d-block">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 ">
            <div className="custom-mail-icon">
              <div className="d-flex align-items-center">
                <span className="bg-white px-3 py-1 rounded me-3">
                  <IoMdMail />
                </span>
                <div>
                  <p className="custom-title-news mb-1">
                    Subscribe Our Newsletter
                  </p>
                  <p className="custom-spam mb-0">
                    We'll send you a nice letter once per week. No spam.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <form className="d-flex justify-content-center justify-content-md-end">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control me-2 bg-transparent rounded-3 custom-placeholder my-2 px-3 me-3"
                aria-label="Search"
              />
              <button className="btn bg-white border-0 custom-button-color my-2 px-4 rounded-3">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="custom-footer-line bg-white w-100 mt-4"></div>
        <div className="d-flex justify-content-center text-white mt-3">
          <span className="px-3">
            &copy; {new Date().getFullYear()} KarPlus
          </span>
          <span className="px-3">Term</span>
          <span className="px-3">Privacy</span>
          <span className="px-3">Cookies</span>
        </div>
      </Container>
    </>
  );
}
