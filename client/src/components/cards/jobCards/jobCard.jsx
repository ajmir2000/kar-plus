import React from "react";
import "./jobCard.css";
import { IoPersonOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
  FaBookmark,
  FaUser,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";


export default function JobCard({ Image, title, person, vocanceNum }) {
  return (
    <>
      {/* <div className='card-container'>
     
     <div className="img-tittle-card">
      <img src={Image} alt="image" />
      <div className="card-title">
        <h1 style={{fontSize:"1rem",padding:"20px 20px 0 0"}}>{title}</h1>
        <p>{person}</p>
      </div>

     </div>


     <div className='icons-card'>

      <p><IoPersonOutline/>{vocanceNum}vacancies</p>  
      <p> <CgCalendarDates/>date</p>  
      <p><IoInformationCircleOutline /></p>
     </div>
    </div> */}

      {/* <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> */}

      <div className="custom-item bg-white rounded-4 p-2 m-3 ">
        <div className="d-flex">
          <div className="d-flex">
            <div className="d-flex">
              <div className="custom-img-container bg-white mt-3 rounded-3 d-flex  justify-content-center align-items-center  ">
                <img src={Image} alt="" className="  img-thumbnail" />
              </div>
              <div className="job-text mt-3">
                {title}
              </div>
            </div>
            <span className="bookmark me-5">
              <FaBookmark />
            </span>
          </div>
        </div>
          <div className="company-name d-flex justify-content-center ">ATRA.</div>

        <div className="icons-job d-flex mt-4 px-3 ms-3 justify-content-between align-items-center ">
          <FaUser />
         
          <span className="ps-1">15 Vacancy</span>
          <FaCalendarAlt />
          <span className="ps-1">2022-01-01</span>
          <FaInfoCircle  className="" />
        </div>
      </div>
    </>
  );
}
