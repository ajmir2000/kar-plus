import React from "react";
import "./Header.css";
import SearchBar from "../searchBar/searchBar.jsx";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Container>
        <span className="row">
          <p className="col-1"></p>
          <h3 className=" d-flex justify-content-center col-6 ms-5 text-white mb-4 ">
            Find your dream job, Build your network or Hire the best talents!
          </h3>
        </span>
      </Container>

      <SearchBar />

      {/* this is popular  component and it has custom-padding class these styles are on Header.css flie */}
      <Container>
        <div className="row ">
          <div className="col-1"></div>
          <div className="col-10 d-flex m-auto ps-4 my-2">
            <Nav className="me-auto my-2 my-lg-0 nav-container" navbarScroll>
              <Link to="#" className="nav-link text-light custom-padding">
                Popular :
              </Link>
              <Link to="#" className="nav-link   text-light custom-padding">
                Graphic Designer
              </Link>

              <Link to="#" className="nav-link  text-light custom-padding">
                Web Developer
              </Link>
              <Link to="#" className="nav-link  text-light custom-padding">
                IT Manager
              </Link>
              <Link to="#" className="nav-link  text-light custom-padding">
                Digital Markter
              </Link>
            </Nav>
          </div>
        </div>
      </Container>
    </>
  );
}
