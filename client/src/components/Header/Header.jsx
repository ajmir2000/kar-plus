import React from "react";
import "./Header.css";
import SearchBar from "../searchBar/searchBar.jsx";
import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <>
<Container >
<span className="row">
  <p className="col-1"></p>
        <h3 className=" d-flex justify-content-center col-6 ms-5 text-white mb-4 ">Find your dream job, Build your network or Hire the best talents!</h3>
      </span>
</Container>

      <SearchBar />
    </>
  );
}
