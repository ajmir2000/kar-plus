import React from 'react'
import { LuSearch } from "react-icons/lu";
import './searchBox.css'

export default function SearchBox({ placeholder, searchValue, inputHandleChange }) {
  return (
    <div className="custom-search-box-container w-50 rounded-5 d-flex p-2 align-center ">
      <input type="text"
       placeholder={placeholder} 
       defaultValue={searchValue} 
        onChange={inputHandleChange}
        />
        
      <LuSearch className="fs-3 me-2" />
    </div>
  );
}
