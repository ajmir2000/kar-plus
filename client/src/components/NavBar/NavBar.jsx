import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function NavBar() {
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  // console.log(pathname);
  // console.log(currentUser.role);
  const linkClass = ({ isActive }) =>
    isActive
      ? "nav-link text-dark rounded-2  ms-5 bg-white"
      : "nav-link text-light  ms-3 ";

  return (
    <>
      {currentUser?.role === "Employer" ? (
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
                <NavDropdown
                  title={<span style={{ color: "white" }}>Work Menu</span>}
                  id="basic-nav-dropdown">
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/create-job"
                      className="text-dark text-decoration-none">
                      Create Job
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/my-job"
                      className="text-dark text-decoration-none">
                      My Jobs
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/my-application"
                      className="text-dark text-decoration-none">
                      My Application
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavLink to="/gigs" className={linkClass}>
                  Find Talents
                </NavLink>
                <NavDropdown
                  title={<span style={{ color: "white" }}>Talent Menu</span>}
                  id="basic-nav-dropdown">
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/add-gig"
                      className="text-dark text-decoration-none">
                      Create Talent
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/my-gigs"
                      className="text-dark text-decoration-none">
                      My Talents
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/orders"
                      className="text-dark text-decoration-none">
                      Orders
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/messages"
                      className="text-dark text-decoration-none">
                      Messages
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavLink to="/about-us" className={linkClass}>
                  About us
                </NavLink>
              </Nav>
              {currentUser ? (
                <Link to="/profile">
                  <img
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
      ) : (
        <Navbar expand="lg" className="bg-transparent p-5">
          <Container >
            <Link to="/" className="navbar-brand  text-white me-4">
              <h1>Kar+</h1>
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0 nav-container" navbarScroll>
                <NavLink to="/find-work" className={linkClass}>
                  Find Work
                </NavLink>
                <NavDropdown
                  title={<span style={{ color: "white" }}>Work Menu</span>}
                  id="basic-nav-dropdown">
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/my-application"
                      className="text-dark text-decoration-none">
                      My Application
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavLink to="/gigs" className={linkClass} >
                  Find Talents
                </NavLink>
                <NavDropdown
                  title={<span style={{ color: "white" }}>Talent Menu</span>}
                  id="basic-nav-dropdown">
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/add-gig"
                      className="text-dark text-decoration-none">
                      Create Talent
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/my-gigs"
                      className="text-dark text-decoration-none">
                      My Talents
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/orders"
                      className="text-dark text-decoration-none">
                      Orders
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-dropdown-item">
                    <NavLink
                      to="/messages"
                      className="text-dark text-decoration-none">
                      Messages
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavLink to="/about-us" className={linkClass}>
                  About us
                </NavLink>
              </Nav>
              {currentUser ? (
                <Link to="/profile">
                  <img
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
      )}
    </>
  );
}

export default NavBar;
