import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";
import { Link,NavLink } from "react-router-dom";
import "./NavBar.css";
import { useSelector } from "react-redux";
function NavBar() {
  const { currentUser } = useSelector((state) => state.user);

const linkClass = ({ isActive }) =>
  isActive
    ? "nav-link text-dark rounded-2  ms-3 bg-white"
    : "nav-link text-light  ms-3 ";




  return (
    <Navbar expand="lg" className="bg-transparent p-5">
      <Container>
        <Link to="/" className="navbar-brand  text-white me-4">
          <h1>Kar+</h1>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 nav-container" navbarScroll>
            <NavLink to="/find-work" className={linkClass}>
              Find Work
            </NavLink>
            <NavLink to="/find-talent" className={linkClass}>
              Find Talent
            </NavLink>

            <NavLink to="/companies" className={linkClass}>
              Companies
            </NavLink>
            <NavLink to="/my-application" className={linkClass}>
              My Application
            </NavLink>
            <NavLink to="/about-us" className={linkClass}>
              About us
            </NavLink>
          </Nav>
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-5  w-50 "
                src={currentUser.avatar}
                alt="profile"
                className="custom-image rounded-circle"
              />
            </Link>
          ) : (
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
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
