import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";
import firebase from "../firebase";
import Signup from "./Signup";
import Login from "./Login";
import { useAuth } from "../auth";
import { useHistory } from "react-router-dom";

function NavBar(props) {
  const history = useHistory();
  const { logout } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loggedout, setLoggedout] = useState(true);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setEmail(user.email);
      setLoggedout(false);
    }
  });

  const handleCheckout = () => {
    sessionStorage.removeItem("custId");
    logout();
    setLoggedout(true);
    history.push("/");
  };

  return (
    <div className="entry">
      <Navbar className="color-bg fixed-top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            {!props.change ? (
              <Link to="/" style={{ textDecoration: "none" }}>
                Eat and Treat
              </Link>
            ) : (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                Admin Panel
              </Link>
            )}
          </Navbar.Brand>
          {!props.change ? (
            <Nav className="items">
              <Nav.Link>
                {/* Login */}
                {loggedout && <Login />}
              </Nav.Link>
              <Nav.Link>
                {/* Sign up */}
                {loggedout && <Signup />}
                {!loggedout && (
                  <button onClick={handleCheckout}>Log out</button>
                )}
                {!loggedout && <Link to="/customers/orders">Orders</Link>}
              </Nav.Link>
            </Nav>
          ) : (
            <></>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
