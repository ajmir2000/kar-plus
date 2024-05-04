import React from 'react'
import './searchBar.css'

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

                <div className="card-container"></div>

    </div>
  )
}
