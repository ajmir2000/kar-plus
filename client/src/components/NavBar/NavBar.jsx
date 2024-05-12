import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Navbar, } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-transparent p-5">
      <Container>
        <Link to="/" className="navbar-brand  text-white me-4">
          <h1>Kar+</h1>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 nav-container" navbarScroll>
            <Link to="/find-work" className="nav-link text-light  ms-3 active">
              Find Work
            </Link>
            <Link to="/find-talent" className="nav-link  ms-3   text-light">
              Find Talent
            </Link>

            <Link to="/companies" className="nav-link ms-3  text-light">
              Companies
            </Link>
            <Link to="/about-us" className="nav-link ms-3  text-light">
              About us
            </Link>
          </Nav>
          <Form className="d-flex">
            <Link to="signin">
              <Button className="mx-3 bg-transparent border-0 text-light">
                Sign in
              </Button>
            </Link>
            <Link to="signup">
              <Button className="rounded-5 bg-white text-dark border-0">
                Sign up
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
