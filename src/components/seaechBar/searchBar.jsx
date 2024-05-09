import React, { useState } from 'react'
import './searchBar.css'
import jobData from '../cards/jobCards/jobList'
import JobCard from '../cards/jobCards/jobCard'

export default function SearchBar() {
  return (
    <div>
      <p className='first-content'>Find your dream job, Build your 
           network or Hire the best talents!</p>
           <div className='box-container'>
           <div className='searchBox'>
            <input type="text" placeholder='search...' />
            <span>|
            <select name="select">
                <option value="talent">talent</option>
                <option value="job">job</option>
            </select>
            </span>
            
           </div>
           
              <button>Search</button>
                </div>
                <div className='card-container'>
                  {jobData.map(data=>(
                     <JobCard {...data} key={data.id}/>
                  ))}
                
                </div>

                <div className="card-container"></div>

    </div>
  )
}
