import React, { useEffect, useRef, useState } from "react";
import GigCard from "../../../components/TalentComponents/gigCard/GigCard.jsx";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";
import { useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  // search part
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          setGigs(res.data);
          setFilteredGigs(res.data);
          return res.data;
        }),
  });
  console.log(gigs);
  console.log(filteredGigs);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  // search part
  useEffect(() => {
    const filter = gigs.filter((gig) =>
      gig.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredGigs(filter);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchText, gigs]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGigs = filteredGigs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredGigs.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="gigs bg-white">
      <div className="container py-3 py-md-5">
        <nav aria-label="breadcrumb" className="d-none d-md-block">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Karplus Talent Part</li>
          </ol>
        </nav>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4 order-2  ">
            <div className="input-group">
              <input
                ref={minRef}
                type="number"
                className="form-control py-2"
                placeholder="Min budget"
              />
              <input
                ref={maxRef}
                type="number"
                className="form-control"
                placeholder="Max budget"
              />
              <button className="btn btn-primary" onClick={apply}>
                Apply
              </button>
            </div>
          </div>
          <div className="col-12 col-md-4 order-3  mb-3">
            <div className="dropdown d-flex justify-content-center justify-content-md-end">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                onClick={() => setOpen(!open)}>
                Sort by: {sort === "sales" ? "Best Selling" : "Newest"}
              </button>
              {open && (
                <ul className="dropdown-menu dropdown-menu-end show">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        reSort(sort === "sales" ? "createdAt" : "sales")
                      }>
                      {sort === "sales" ? "Newest" : "Best Selling"}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => reSort("sales")}>
                      Popular
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="text-center col-12 col-md-4 mb-3 order-1  ">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              className="form-control mb-2 mb-md-0 me-md-3 p-2 "
              placeholder="Search Talents"
            />
          </div>
        </div>
      </div>
      <Container>
        <Row>
          {isLoading ? (
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="col-12 text-center">
              <div className="alert alert-danger" role="alert">
                Something went wrong!
              </div>
            </div>
          ) : (
            // data.map((gig) => (
            //   <div
            //     className="col-12 col-md-6 col-lg-4 py-lg-1 px-lg-1 p-xl-2   d-flex justify-content-center m-auto"
            //     key={gig._id}>
            //     <GigCard item={gig} />
            //   </div>
            // ))
            currentGigs.map((gig) => (
              <div
                className="col-12 col-md-6 col-lg-4 py-lg-1 px-lg-1 p-xl-2   d-flex justify-content-center m-auto"
                key={gig._id}>
                <GigCard item={gig} />
              </div>
            ))
          )}
        </Row>
        <div className="d-flex justify-content-center mt-4">
          {currentPage > 1 && (
            <button onClick={prevPage} className="btn btn-secondary mx-2">
              Previous
            </button>
          )}
          {indexOfLastItem < filteredGigs.length && (
            <button onClick={nextPage} className="btn btn-secondary mx-2">
              Next
            </button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Gigs;
