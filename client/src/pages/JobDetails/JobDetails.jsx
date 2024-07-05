import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { Link, useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import { VscGitStashApply } from "react-icons/vsc";
// import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const location = useLocation();
  const { jobData } = location.state || {};

  if (!jobData) {
    return <div>No job data available</div>;
  }

  const {
    jobTitle,
    jobLocation,
    companyLogo,
    companyName,
    employmentType,
    minPrice,
    maxPrice,
    postingDate,
    description,
    salaryType,
    skills,
    postedBy,
  } = jobData;



  //   const [job, setJob] = useState([]);
  //   useEffect(() => {
  //     // fetch(`http://localhost:5000/all-jobs/${id}`)
  //     //   .then((res) => res.json())
  //     //   .then((data) => setJob(data));
  //   }, []);

  //   const handleJobApply = async () => {
  //     // console.log("btn clicked")
  //     const { value: url } = await Swal.fire({
  //       input: "url",
  //       inputLabel: "CV or Resume URL address",
  //       inputPlaceholder: "Enter the URL",
  //     });
  //     if (url) {
  //       Swal.fire(`Entered URL: ${url}`).then((result) => {
  //         /* Read more about isConfirmed, isDenied below */
  //         if (result.isConfirmed) {
  //           Swal.fire("Application Submitted Successfully!", "", "success");
  //         } else if (result.isDenied) {
  //           Swal.fire("Changes are not saved", "", "info");
  //         }
  //       });
  //     }
  //   };

  return (
    <div className="container-fluid">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />

      <div className="mt-4 p-5">
        <h3 className="font-weight-bold mb-2 text-light">
          Job ID: {parseInt(id)}
        </h3>

        <div className="my-4 ">
          <h2 className="h2 text-light">Job details</h2>
          <p className="my-1 text-light">
            Here is how the job details align with your job preferences. Manage
            job preferences anytime in your profile.
          </p>
        </div>

        <div className="my-4 d-flex gap-3 flex-column ">
          <div className="d-flex align-items-center gap-2 text-light ">
            <FaBriefcase />
            <p className="h4 font-weight-medium ">Job type:</p>
            <span className="h4 font-weight-medium">{employmentType}</span>
          </div>
          {/* <button className="btn btn-info ms-2" onClick={handleJobApply}>
            Apply Now
          </button> */}
          <button type="button" className="btn btn-primary rounded-5  gap-5">
            {" "}
            <Link className="link" to={`/apply-job/${id}`}>
              <VscGitStashApply className="fs-4" />
              Apply Now
            </Link>
          </button>
          +
        </div>

        {/* job details */}
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4 ">
          <div className="col-md-4 ">
            <h4 className="h4 font-weight-medium mb-3">Benefits</h4>
            <p className="text-muted mb-2">
              Pulled from the full job description
            </p>
            <ul className="list-unstyled text-muted mb-2">
              <li>
                1. ${minPrice}-{maxPrice}k
              </li>
              <li>2. Disability insurance</li>
              <li>3. Employee discount</li>
              <li>4. Flexible spending account</li>
              <li>5. Health insurance</li>
              <li>6. Paid time off</li>
              <li>7. Vision insurance</li>
              <li>8. Volunteer time off</li>
              <li>9. Dental insurance</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4 className="h4 font-weight-medium mb-3">Outline</h4>
            <p className="text-muted">
              Grand Canyon Education (GCE) is a rapidly growing educational
              service company that has long been an industry leader in providing
              educational, operational and technological support services to the
              post-secondary education sector. We put people first, drive
              innovation, and do good in the community that we live and work in.
              <br /> <br />
              This position entails joining a web design and development team
              called Academic Web Services within Grand Canyon Education to
              build custom web apps. Academic Web Services is a close-knit team
              that constructs and maintains a wide variety of applications using
              the latest web technologies.
            </p>
          </div>

          <div className="col-md-4">
            <h4 className="h4 font-weight-medium mb-3">Future Growth</h4>
            <p className="text-muted">
              An industry leader in providing educational, operational and
              technological support services to the post-secondary education
              sector. We put people first, drive innovation, and do good in the
              community that we live and work in.
              <br />
              <br />
              We’re passionate about web design and development and are focused
              on delivering quality products to our customers in a team setting
              driven by strong culture and a good working atmosphere. We are
              hiring web developers at all levels of experience. Requirements
              below reflect the minimum experience level.
            </p>
          </div>
        </div>

        <div className="text-muted my-5">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            tempore alias dolores. Maxime id quas, asperiores dolor illo
            veritatis quibusdam sint possimus quod hic nulla officiis
            necessitatibus laudantium expedita commodi?Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Nulla, cum nostrum.
            Exercitationem, dolores, tenetur culpa quas perspiciatis, libero
            iste voluptate totam mollitia facere fugiat fugit veritatis
            accusantium quae aliquam. Labore?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            tempore alias dolores. Maxime id quas, asperiores dolor illo
            veritatis quibusdam sint possimus quod hic nulla officiis
            necessitatibus laudantium expedita commodi?Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Nulla, cum nostrum.
            Exercitationem, dolores, tenetur culpa quas perspiciatis, libero
            iste voluptate totam mollitia facere fugiat fugit veritatis
            accusantium quae aliquam. Labore?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            tempore alias dolores. Maxime id quas, asperiores dolor illo
            veritatis quibusdam sint possimus quod hic nulla officiis
            necessitatibus laudantium expedita commodi?Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Nulla, cum nostrum.
            Exercitationem, dolores, tenetur culpa quas perspiciatis, libero
            iste voluptate totam mollitia facere fugiat fugit veritatis
            accusantium quae aliquam. Labore?
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
