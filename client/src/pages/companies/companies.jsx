import React from "react";
import "./companies.css";
import SearchBox from '../../components/searchBox/searchBox'
import CompanyCard from "../../components/cards/company-card/companyCard";
import {companyData} from "../../components/cards/jobCards/jobList"
import Footer from "../../components/Footer/Footer";
import PaginationPart from "../../components/PaginationPart/PaginationPart";
import { Link } from "react-router-dom";
export default function Companies() {
  return (
    <>
      <div className="p-5 bg-light">
        <SearchBox placeholder="Afghan wireless" />

        <div className=" custom-company-card-holder d-flex flex-wrap m-5 p-4 mx-auto">
          {companyData.map((data) => (
            
              <div
                className="col-12 col-md-6 col-lg-4 py-lg-1 px-lg-1 p-xl-2   d-flex justify-content-center m-auto"
                key={data.id}
              >
                <CompanyCard {...data} />
              </div>
            
          ))}
        </div>
        <PaginationPart />
      </div>
      <Footer className="proBackground" />
    </>
  );
}
