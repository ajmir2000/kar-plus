import React from 'react'
import './jobCard.css'
import { IoPersonOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function JobCard({Image,title,person,vocanceNum}) {
  return (
    <div className='card-container'>
     
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
    </div>
  )
}
