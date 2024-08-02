import React from "react";
import "./talentCategory.css";
import { Card } from "react-bootstrap";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function TalentCategory({ props }) {
  const {
    _id,
    title,
    features,
    starNumber,
    totalStars,
    desc,
    cat,
    shortTitle,
  } = props;
  // console.log(props);
  return (
    <>
      <Link to={`/gig/${_id}`} className="text-decoration-none">
        <Card className="custom-talent-card p-2 rounded-4  ">
          <Card.Body className="d-flex flex-column justify-content-between">
            <Card.Title className="text-light">
              <h3>{title}</h3>
            </Card.Title>
            <div className="custom-icons-container d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center">
                <TiStarFullOutline className="me-2" />

                {!isNaN(totalStars / starNumber) &&
                  Math.round(totalStars / starNumber)}
              </span>
              <span>{features.length} skills</span>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}
