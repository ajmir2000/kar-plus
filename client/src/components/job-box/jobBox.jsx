import React, { useState } from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap';
import './jobBox.css'
import { FaBookmark } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GoDiscussionOutdated } from "react-icons/go";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
export default function JobBox({
  jobTitle,
  jobLocation,
  companyLogo,
  companyName,
  
}) {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );

  return (
    <div className="col-9 d-flex custom-jobBox-container mt-5 w-100 p-4">
      <div className="custom-jobBox-pic-div">
        <img className="h-100 w-100" src={companyLogo} alt="picture" />
      </div>
      <div className="d-flex flex-column mx-5">
        <div className="custom-jobBox-title-div">
          {" "}
          <h3>
            {jobTitle} <FaBookmark className="fs-4 text-success ms-5" />
          </h3>
          <p className="text-muted  ">{companyName}</p>
        </div>

        <div className="d-flex gap-3 custom-jobBox-btn-container">
          <button className="btn btn-sm rounded-pill">
            <CiLocationOn className="text-success fs-5  me-2" />
            {jobLocation}
          </button>

          <button className="btn btn-sm rounded-pill">
            <IoPersonOutline className="text-success fs-5  me-2" />
            16 Vacancies
          </button>

          <button className="btn btn-sm rounded-pill">
            <GoDiscussionOutdated className="text-success fs-5  me-2" />
            {currentDate}
          </button>

          <button className="btn btn-sm rounded-pill">
            <RiMoneyDollarCircleLine className="text-success fs-5  me-2" />
            $200-$400
          </button>
        </div>
      </div>
    </div>
  );
}
