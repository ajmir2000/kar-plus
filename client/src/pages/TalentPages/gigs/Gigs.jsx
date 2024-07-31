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

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(search);
  console.log(data);

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

  return (
    <div className="gigs bg-white">
      <div className="container py-3 py-md-5">
        <nav aria-label="breadcrumb" className="d-none d-md-block">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Karplus Graphics & Design</li>
          </ol>
        </nav>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6 order-2 order-md-1">
            <div className="input-group">
              <input
                ref={minRef}
                type="number"
                className="form-control"
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
          <div className="col-12 col-md-6 order-1 order-md-2 mb-3 mb-md-0">
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
            data.map((gig) => (
              <div
                className="col-12 col-md-6 col-lg-4 py-lg-1 px-lg-1 p-xl-2   d-flex justify-content-center m-auto"
                key={gig._id}>
                <GigCard item={gig} />
              </div>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Gigs;
