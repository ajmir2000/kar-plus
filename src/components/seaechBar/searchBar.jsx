import React, { useState } from 'react'
import './searchBar.css'
import { Container,Col,Row } from 'react-bootstrap'
import jobData from '../cards/jobCards/jobList'
import JobCard from '../cards/jobCards/jobCard'

export default function SearchBar() {
  const [selectState,setSelectState]=useState('talebt')

  const handleSelectChange=(event)=>{
     setSelectState(event.target.value)

     console.log(selectState)
  }

  return (
    <div>
      <p className='first-content'>Find your dream job, Build your 
           network or Hire the best talents!</p>
           <div className='box-container'>
           <div className='searchBox'>
            <input type="text" placeholder='search...' />
            <span>|
            <select name="select" onChange={(event)=>handleSelectChange(event)}>
                <option value="talent">talent</option>
                <option value="job">job</option>
            </select>
            </span>
            
           </div>
           
              <button>Search</button>
                </div>
                {selectState==="job" ? (
                  <Container>
                  <Row>
                  {jobData.map(data=>(
                    <Col className='col-3 mt-5'>
                     <JobCard {...data} key={data.id}/>
                     </Col>
                  ))}
                </Row>
                
                </Container>

                ): null}
                


    </div>
  )
}
