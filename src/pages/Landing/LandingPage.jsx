import React from "react";
import "./LandingPage.css";
import Header from "../../components/Header/Header";
import LastJobCarts from "../../components/LastJobCarts/LastJobCarts";
import AvailableJob from "../../components/available-job/availableJob";

export default function LandingPage() {
  return (
    <>
      <Header />
      <AvailableJob />
    </>
  );
}
