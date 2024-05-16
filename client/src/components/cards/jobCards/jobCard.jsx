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

export default function JobCard({ Image, title, person, vocanceNum }) {
  return (
    <>
      <Card className="custom-item bg-white rounded-5 p-2 m-3 border-0 ">
        <div className="d-flex">
          <div className="d-flex">
            <div className="d-flex">
              <div className="custom-img-container bg-white mt-3 rounded-3 d-flex  justify-content-center align-items-center  ">
                <img src={Image} alt="" className="img-thumbnail border-0 " />
              </div>
              <Card.Title className="custom-job-text mt-3">{title}</Card.Title>
            </div>
            <span className="bookmark me-5">
              <FaBookmark />
              {/* this icon for unbookmark use on logic of this project */}
              {/* <IoBookmarkOutline /> */}
            </span>
          </div>
        </div>
        <div className="custom-company-name d-flex justify-content-center ">
          {person}
        </div>

        <div className="icons-job d-flex mt-4 pt-3 px-3 ms-3 justify-content-between align-items-center ">
          <IoPersonOutline />
          <span className="p-1">{vocanceNum} Vacancies</span>
          <IoCalendarOutline />
          <span className="p-1">2022-01-01</span>
          <IoInformationCircleOutline className="" />
        </div>
      </Card>
    </>
  );
}
