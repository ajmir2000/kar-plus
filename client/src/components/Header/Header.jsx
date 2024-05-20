import React from "react";
import "./Header.css";
import SearchBar from "../searchBar/searchBar.jsx";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Container>
        <div className="row align-items-center">
          <div className="col-1 d-none d-md-block"></div>
          <div className="col-12 col-md-6 ms-md-5 text-center text-md-start mb-4 mb-md-0">
            <h3 className="text-white">
              Find your dream job, Build your network or Hire the best talents!
            </h3>
          </div>
        </div>
      </Container>

      <SearchBar />

      {/* this is popular  component and it has custom-padding class these styles are on Header.css flie */}

      <Container className="d-felx justify-content-center ">
        <div className="row d-felx justify-content-center">
          <div className="col-12 col-md-1"></div>
          <div className="col-12 col-md-10 d-flex justify-content-center my-2">
            <Nav
              className="me-auto my-2 my-lg-0 nav-container d-flex flex-wrap justify-content-center"
              navbarScroll>
              <Link
                to="#"
                className="nav-link text-light custom-padding d-none d-md-inline">
                Popular :
              </Link>
              <Link to="#" className="nav-link text-light custom-padding">
                Graphic Designer
              </Link>
              <Link to="#" className="nav-link text-light custom-padding">
                Web Developer
              </Link>
              <Link to="#" className="nav-link text-light custom-padding">
                IT Manager
              </Link>
              <Link to="#" className="nav-link text-light custom-padding">
                Digital Markter
              </Link>
            </Nav>
          </div>
        </div>
      </Container>
    </>
  );
}
