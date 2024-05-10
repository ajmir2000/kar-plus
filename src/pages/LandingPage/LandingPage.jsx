import React from 'react'
import "./LandingPage.css"
import SearchBar from '../../components/seaechBar/searchBar'
import AvailableJob from '../../components/available-job/availableJob'

export default function LandingPage() {
  return (
    <div className='landing-page-container'>
     <SearchBar/>
     <AvailableJob/>


    </div>
  )
}
