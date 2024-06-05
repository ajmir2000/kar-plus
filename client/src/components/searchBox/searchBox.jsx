import React from 'react'
import { LuSearch } from "react-icons/lu";
import './searchBox.css'

export default function SearchBox({ placeholder, searcchValue, inputHamdleChange }) {
  return (
    <div className="custom-search-box-container d-flex p-2 align-center ">
      <input type="text"
       placeholder={placeholder} 
        value={searcchValue} 
        onChange={inputHamdleChange}
        />
        
      <LuSearch className="fs-3 me-2" />
    </div>
  );
}
