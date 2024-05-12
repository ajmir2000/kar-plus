import React from "react";
import "./talentCategory.css";
import { Card } from "react-bootstrap";
import { TiStarFullOutline } from "react-icons/ti";

export default function TalentCategory() {
  return (
    <div id="category-talent">
      <Card className="talent-card">
        <Card.Body>
          <Card.Title className="text-light">
            <h3>Sales & Marketing</h3>
          </Card.Title>
          <div className="icons-container">
            <span>
              <TiStarFullOutline />
              4.85/5
            </span>
            <span>200 skills</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
