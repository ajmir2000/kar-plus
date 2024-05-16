import React from "react";
import "./Footer.css";
import { Button, Container, Nav, Form } from "react-bootstrap";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Container className="py-5 ">
        <div className="d-flex pb-5">
          <Link to="/" className="navbar-brand  text-white">
            <h4>Kar+</h4>
          </Link>
          <Nav className="m-auto" navbarScroll>
            <Link to="#" className="nav-link text-light ">
              Overview
            </Link>

            <Link to="#" className="nav-link text-light">
              Features
            </Link>

            <Link to="#" className="nav-link  text-light">
              Pricing
            </Link>

            <Link to="#" className="nav-link  text-light">
              Careers
            </Link>

            <Link to="#" className="nav-link  text-light">
              Help
            </Link>

            <Link to="#" className="nav-link  text-light">
              Privacy Policy
            </Link>
          </Nav>
          <div className="custom-social-media-icons text-danger d-flex align-items-center  ">
            <Link to="www.linkedin.com/" className="ms-3 text-white">
              <FaLinkedinIn />
            </Link>
            <Link to="www.github.com/" className="ms-3 text-white">
              <FaGithub />
            </Link>
            <Link to="www.x.com" className="ms-3 text-white">
              <FaXTwitter />
            </Link>
            <Link to="www.facebook.com" className="ms-3 text-white">
              <FaFacebook />
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-between ">
          <div className="custom-mail-icon">
            <div className="d-flex align-items-center">
              <span className="bg-white  px-3 py-1 rounded me-3">
                <IoMdMail />
              </span>
              <div>
                <p className="custom-title-news"> Subscribe Our Newslater</p>
                <p className="custom-spam ">
                  we'll Send you a nice letter once per week. No Spam
                </p>
              </div>
            </div>
          </div>

          <Form className="d-flex">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className=" me-2 bg-transparent rounded-3 custom-placeholder my-2 px-3 me-3"
              aria-label="Search"
            />
            <Button className="bg-white border-0 custom-button-color my-2 px-4 rounded-3 ">
              Subscribe
            </Button>
          </Form>
        </div>
        <div className="custom-footer-line bg-white w-100 mt-4 "></div>
        <div className="d-flex justify-content-center text-white mt-3">
          <span className="px-3">
            &copy; {new Date().getFullYear()} KarPlus
          </span>
          <span className="px-3 ">Term</span>
          <span className="px-3">Privacy</span>
          <span className="px-3">Cookies</span>
        </div>
      </Container>
    </>
  );
}
