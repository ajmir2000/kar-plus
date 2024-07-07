// import React, { useState } from "react";
// import "./jobBox.css";
// import { FaBookmark } from "react-icons/fa";
// import { CiLocationOn } from "react-icons/ci";
// import { FaRegClock } from "react-icons/fa6";
// import { GoDiscussionOutdated } from "react-icons/go";
// import { TbCurrencyAfghani } from "react-icons/tb";
// import { FiInfo } from "react-icons/fi";
// import { Link } from "react-router-dom";

// export default function JobBox({
//   jobTitle,
//   jobLocation,
//   companyLogo,
//   companyName,
//   employmentType,
//   minPrice,
//   maxPrice,
//   postingDate,
//   description,
//   _id,
//   salaryType,skills,postedBy,
// }) {
//   const [currentDate, setCurrentDate] = useState(
//     new Date().toLocaleDateString()
//   );

//   const formattedPostingDate = postingDate ? postingDate.slice(0, 10) : "N/A";

//   return (
//     <div className="col-9 d-flex custom-jobBox-container mt-5 w-100 p-4">
//       <Link to={`/job-detail/${_id}`}>
//         <div>
//           <div className="custom-jobBox-pic-div">
//             <img src={companyLogo} alt="picture" />
//           </div>
//           <div className="d-flex flex-column mx-5">
//             <div className="custom-jobBox-title-div">
//               <h3>
//                 {jobTitle} <FaBookmark className="fs-4 text-success ms-5" />
//               </h3>
//               <p className="text-muted">{companyName}</p>
//             </div>

//             <div className="d-flex gap-3 custom-jobBox-btn-container">
//               <div className="btn btn-sm rounded-pill">
//                 <CiLocationOn className="text-success fs-5 me-2" />
//                 {jobLocation}
//               </div>

//               <div className="btn btn-sm rounded-pill">
//                 <FaRegClock className="text-success fs-5 me-2" />
//                 {employmentType}
//               </div>

//               <div className="btn btn-sm rounded-pill">
//                 <TbCurrencyAfghani className="text-success fs-5 me-2" />
//                 {minPrice}-{maxPrice}k
//               </div>

//               <div className="btn btn-sm rounded-pill">
//                 <GoDiscussionOutdated className="text-success fs-5 me-2" />
//                 {formattedPostingDate}
//               </div>

//               <button className="btn btn-sm rounded-pill">
//                 <FiInfo className="text-success fs-5 me-2" />
//                 Details
//               </button>
//             </div>

//             <div className="mt-4">
//               <p>{description}</p>
//             </div>
//           </div>
//         </div>
//       </Link>
//       <button className="btn-primary">Apply</button>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./jobBox.css";
import { FaBookmark } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { GoDiscussionOutdated } from "react-icons/go";
import { TbCurrencyAfghani } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function JobBox({
  jobTitle,
  jobLocation,
  companyLogo,
  companyName,
  employmentType,
  minPrice,
  maxPrice,
  postingDate,
  description,
  _id,
  salaryType,
  skills,
  postedBy,
}) {
  const formattedPostingDate = postingDate ? postingDate.slice(0, 10) : "N/A";

  const jobData = {
    jobTitle,
    jobLocation,
    companyLogo,
    companyName,
    employmentType,
    minPrice,
    maxPrice,
    postingDate,
    description,
    _id,
    salaryType,
    skills,
    postedBy,
  };

  return (
    <div className="col-9 d-flex custom-jobBox-container mt-5 w-100 p-4">
      <Link
        to={`/job-detail/${_id}`}
        state={{ jobData }}
        className="text-decoration-none"
      >
        <div>
          <div className="d-flex gap-3">
            {" "}
            <div className="custom-jobBox-pic-div">
              <img src={companyLogo} alt="company logo" />
            </div>
            <div className="custom-jobBox-title-div mt-3">
              <h3>
                {jobTitle} <FaBookmark className="fs-4 text-success ms-5" />
              </h3>
              <p className="text-muted">{companyName}</p>
            </div>
          </div>

          <div className="d-flex flex-column mx-5">
            <div className="d-flex gap-3 custom-jobBox-btn-container">
              <div className="btn btn-sm rounded-pill">
                <CiLocationOn className="text-success fs-5 me-2" />
                {jobLocation}
              </div>

              <div className="btn btn-sm rounded-pill">
                <FaRegClock className="text-success fs-5 me-2" />
                {employmentType}
              </div>

              <div className="btn btn-sm rounded-pill">
                <TbCurrencyAfghani className="text-success fs-5 me-2" />
                {minPrice}-{maxPrice}k
              </div>

              <div className="btn btn-sm rounded-pill">
                <GoDiscussionOutdated className="text-success fs-5 me-2" />
                {formattedPostingDate}
              </div>

              <button className="btn btn-sm rounded-pill">
                <FiInfo className="text-success fs-5 me-2" />
                Details
              </button>
            </div>

            <div className="mt-4">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
