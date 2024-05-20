import React from "react";
import "./talentCategory.css";
import { Card } from "react-bootstrap";
import { TiStarFullOutline } from "react-icons/ti";

export default function TalentCategory() {
  return (
    <>
      <Card className="custom-talent-card p-2 rounded-4  ">
        <Card.Body>
          <Card.Title className="text-light">
            <h3>Sales & Marketing</h3>
          </Card.Title>
          <div className="custom-icons-container d-flex justify-content-between  my-4">
            <span>
              <TiStarFullOutline />
              4.85/5
            </span>
            <span>200 skills</span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
