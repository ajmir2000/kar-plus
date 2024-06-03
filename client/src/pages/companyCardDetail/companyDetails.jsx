import React from 'react'
import { useParams } from 'react-router-dom'
import JobBox from "../../components/job-box/jobBox";
import './Company-details.css'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { companyData } from "../../components/cards/jobCards/jobList";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Link } from 'react-router-dom';




export default function CompanyDetails() {

    const params=useParams()
    console.log(params)
    const cardDetail=companyData.find(data=>data.id==params.id)
    
    


  return (
    <div className="bg-light p-1  ">
      <div className="custom-details-container mx-auto">
        <Link to="/companies">
          <button className=" custom-companyDetails-btn p-2">
            {" "}
            <span>
              <ArrowBackIcon />
            </span>
            Back to Companies
          </button>
        </Link>

        <div className="custom-company-ddetail-box mt-4 d-flex flex-column mx-auto">
          <div className="custom-company-detail-child-box"></div>
          <div className="d-flex">
            {" "}
            <img
              className="custom-detali-image"
              src={cardDetail.image}
              alt="image"
            />
            <div className="custom-company-detail-title-div mt-3">
              {" "}
              <h5>{cardDetail.title}</h5>
              <button className="border-0">
                <span>
                  <LocationOnOutlinedIcon />
                </span>
                {cardDetail.location}
              </button>
            </div>
          </div>
          <div className="custom-companyDetail-description d-flex">
            <div className="custom-companyDetails-text-div">
              <h3 className="fw-bold">About Company</h3>
              <p className='me-3'>{cardDetail.description}</p>
            </div>
            <div className="custom-company-detail-icons m-4">
              <p className="d-flex">
                <span className="me-3">
                  <BlurLinearIcon />
                </span>
                www.mtn.com.af
              </p>

              <p className="d-flex ms-3">
                <span className="me-3">
                  <ConnectWithoutContactIcon />
                </span>
                Telecommunication
              </p>

              <p className="d-flex ms-3">
                <span className="me-3">
                  <GroupAddIcon />
                </span>
                1000+
              </p>

              <p className="d-flex ms-3">
                <span className="me-3">
                  <LocationOnOutlinedIcon />
                </span>
                {cardDetail.location}
              </p>
            </div>
          </div>
        </div>
        <div className='custom-companyDetail-activeJob-box'>
          <h3>Active Jobs:</h3>
           <JobBox/>
           <JobBox/>
           <JobBox/>
        </div>
      </div>
    </div>
  );
}