import React from "react";
import "./jobCard.css";
import { FaBookmark } from "react-icons/fa";
import { Card } from "react-bootstrap";
import {
  IoInformationCircleOutline,
  IoCalendarOutline,
  IoPersonOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export default function JobCard({ props }) {
  // Image, title, person, vocanceNum
  const {
    _id,
    companyLogo,
    jobTitle,
    vacancies,
    postingDate,
    companyName,
    closingDate,
  } = props;
  const formattedPostingDate = closingDate ? closingDate.slice(0, 10) : "N/A";
  console.log(props);

  return (
    <>
      <Link to={`/job-detail/${_id}`} className="text-decoration-none">
        <div className="custom-item bg-white rounded-4 p-2  m-3 border-0  ">
          <div className="d-flex ">
            <div className="d-flex">
              <div className="d-flex">
                <div className="custom-img-container bg-white mt-3 rounded-3 d-flex  justify-content-center align-items-center  ">
                  <img
                    src={companyLogo}
                    alt=""
                    className="img-thumbnail border-0 "
                  />
                </div>
                <Card.Title className="custom-job-text mt-3">
                  {jobTitle}
                </Card.Title>
              </div>
              <span className="bookmark">
                {/* <FaBookmark /> */}
                {/* this icon for unbookmark use on logic of this project */}
                {/* <IoBookmarkOutline /> */}
              </span>
            </div>
          </div>
          <div className="custom-company-name d-flex justify-content-center ps-lg-4  ">
            {companyName}
          </div>

          <div className="icons-job d-flex mt-4 pt-3 px-3 ms-3 justify-content-between align-items-center ">
            <IoPersonOutline />
            <span className="p-1">{vacancies} Vacancies</span>
            <IoCalendarOutline />
            <span className="p-1">{formattedPostingDate}</span>
            <IoInformationCircleOutline className="" />
          </div>
        </div>
      </Link>
    </>
  );
}
