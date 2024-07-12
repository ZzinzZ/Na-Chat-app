import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chat/Notification";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4 position-fixed" style={{ height: "3.75rem", width:"100%", top:'0px', zIndex:3}}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            NA-SOCIAl
          </Link>
        </h2>
        {user && <span className="text-warning">Logged as {user?.name}</span>}
        <Nav>
          {user ? (
            <Stack direction="horizontal" gap={3}>
              <Notification/>
              <Link
              onClick={() => logoutUser()}
              to="/login"
              className="link-light text-decoration-none"
            >
              Logout
            </Link>
            </Stack>
          ) : (
            <Stack direction="horizontal" gap={3}>
              <Link to="/login" className="link-light text-decoration-none">
                Login
              </Link>
              <Link to="/register" className="link-light text-decoration-none">
                Register
              </Link>
            </Stack>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
