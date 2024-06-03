import React from 'react'
import './companyCard.css'
import { FaBookmark } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function CompanyCard({title,image,location,id}) {
  return (
    <Link to={`/companies/${id}`}>
      <div className="custom-cmpanyCard-container d-flex align-items-center p-4">
        <img src={image} alt="picture" className="custom-companyCard-img" />
        <div className="custom-cardCompany-text-container text-align-center ms-3">
          <h5 className="mt-3 ">{title}</h5>
          <p className="text-muted ">{location}</p>
        </div>
        <FaBookmark className="ms-5 fs-4 text-success" />
      </div>
    </Link>
  );
}
