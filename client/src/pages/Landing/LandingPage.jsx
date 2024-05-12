import React from "react";
import "./LandingPage.css";
import Header from "../../components/Header/Header.jsx";
import AvailableJob from "../../components/available-job/availableJob.jsx";

export default function LandingPage() {
  return (
    <>
      <Header />
      <AvailableJob />
    </>
  );
}
