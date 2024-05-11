import React from "react";
import "./Header.css";
import SearchBar from "../searchBar/searchBar";

export default function Header() {
  return (
    <>
      <p className="first-content container">
        Find your dream job, Build your network or Hire the best talents!
      </p>
      <SearchBar />
    </>
  );
}
