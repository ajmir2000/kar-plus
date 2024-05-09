import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
import { Margin } from "@mui/icons-material";

function NavBar() {
  return (
    <Navbar expand="lg" className="proBackground">
      <Container>
        <Navbar.Brand href="#" className="kar">
          Kar+
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 nav-container"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Link
              to="/find-talent"
              style={{ textDecoration: "none", margin: "0 1px" }}>
              Find Talent
            </Link>
            <Link
              to="/find-work"
              style={{ textDecoration: "none", margin: "0 10px" }}>
              Find Work
            </Link>
            <Link
              to="/companies"
              style={{ textDecoration: "none", margin: "0 10px" }}>
              Companies
            </Link>
            <Link
              to="/about-us"
              style={{ textDecoration: "none", margin: "0 10px" }}>
              About us
            </Link>
          </Nav>
          <Form className="d-flex">
            <Link to="signin">
              <Button variant="outline-success" className="mx-4">
                Sign in
              </Button>
            </Link>
            <Link to="signup">
              <Button variant="outline-success">Sign up</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
