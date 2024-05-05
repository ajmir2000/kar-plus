import React from 'react'
import './jobCard.css'
import { IoPersonOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";

export default function JobCard() {
  return (
    <div className='card-container'>
     
     <div className="img-tittle-card">
      <img src="./asset-folder/images/images.jpeg" alt="image" />
      <div className="card-title">
        <h2>web developer</h2>
        <p>Roshan co</p>
      </div>

     </div>


     <div className='icons-card'>

      <p><IoPersonOutline/>vacancies</p>  
      <p> <CgCalendarDates/>date</p>  
     </div>
    </div>
  )
}
