import React, { useState } from "react";
import "./JobTalentSwitch.css";
import { Link, useLocation } from "react-router-dom";

export default function JobTalentSwitch() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    location.pathname === "/find-work" ? "jobs" : "talent"
  );

  return (
    <>
      <div className="d-flex border-bottom position-relative">
        <Link
          to="/find-work"
          className={`nav-link ${
            activeLink === "jobs" ? "position-absolute active-line-switch" : ""
          }`}
          onClick={() => setActiveLink("jobs")}
        >
          Jobs
        </Link>
        <Link
          to="/find-talent"
          className={`nav-link custom-margin-link-job-talent-switch ${
            activeLink === "talent"
              ? "position-absolute active-line-switch"
              : ""
          }`}
          onClick={() => setActiveLink("talent")}
        >
          Talent
        </Link>
      </div>
    </>
  );
}
