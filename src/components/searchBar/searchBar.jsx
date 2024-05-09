import React from "react";
import "./searchBar.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";

export default function SearchBar() {
  return (
    <>
      <div>
        <div className="box-container">
          <div className="searchBox">
            <input type="text" placeholder="search..." />
            <span>
              |
              <select name="select">
                <option value="talent">talent</option>
                <option value="job">job</option>
              </select>
            </span>
          </div>

          <button>Search</button>
        </div>
      </div>
      {/* this need for updateing  */}
      {/* <Container>
        <Row>
          <Col>
            <InputGroup className="d-flex">
              <FormControl type="text" placeholder="search..." />
              <InputGroup >
                <InputGroup.Text>|</InputGroup.Text>
                <Dropdown >
                  <select name="select">
                    <option value="talent">talent</option>
                    <option value="job">job</option>
                  </select>
                </Dropdown>
              </InputGroup>
            </InputGroup>
          </Col>
          <Col>
            <Button variant="primary">Search</Button>
          </Col>
        </Row>
      </Container> */}
    </>
  );
}
