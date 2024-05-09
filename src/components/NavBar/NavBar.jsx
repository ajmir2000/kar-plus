import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar expand="lg" className="proBackground">
      <Container>
        <Link to="/" className="navbar-brand  text-white ">
          Kar+
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 nav-container" navbarScroll>
            <Link to="/find-talent" className="nav-link text-light">
              Find Talent
            </Link>
            <Link to="/find-work" className="nav-link text-light">
              Find Work
            </Link>
            <Link to="/companies" className="nav-link text-light">
              Companies
            </Link>
            <Link to="/about-us" className="nav-link text-light">
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
