import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./PaginationPart.css";

export default function PaginationPart() {
  return (
    <Pagination className="d-flex justify-content-center mt-3">
      <Pagination.Prev   className="mx-1 custom-pagination-left-arrows"/>
      <Pagination.Item   className="mx-1 custom-pagination-numbers active ">{1}</Pagination.Item>
      <Pagination.Item  className="mx-1 custom-pagination-numbers">{2}</Pagination.Item>
      <Pagination.Item  className="mx-1 custom-pagination-numbers">{3}</Pagination.Item>
      <Pagination.Item  className="mx-1 custom-pagination-numbers">{4}</Pagination.Item>
      <Pagination.Item  className="mx-1 custom-pagination-numbers">{5}</Pagination.Item>
      <Pagination.Ellipsis  className="mx-1 custom-pagination-numbers" />
      <Pagination.Item  className="mx-1 custom-pagination-numbers">{20}</Pagination.Item>
      <Pagination.Next   className="mx-1 custom-pagination-right-arrows"/>
    </Pagination>
  );
}
