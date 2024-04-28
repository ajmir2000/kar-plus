import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#" className="kar">Kar+</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Nav.Link href="#action1">Find Talent</Nav.Link>
            <Nav.Link href="#action2">Companies</Nav.Link>
            <Nav.Link href="#action3">About us</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-success" className="mx-4">
              Sign in
            </Button>
            <Button variant="outline-success">Sign up</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
