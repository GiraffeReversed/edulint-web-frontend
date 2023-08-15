import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SunFill, MoonFill, GearFill } from "react-bootstrap-icons";
import { Navbar as NB, Nav, Container } from "react-bootstrap";
import { ModeContext, toggleDarkmode } from "./utils/Mode"

export default function Navbar({ mode, onSettingsClick }) {
  let [current, setMode] = React.useContext(ModeContext);
  const modeSymbol = mode === "dark" ? <SunFill /> : <MoonFill />;

  return (
    <NB bg="light">
      <Container>
        <Link className="navbar-brand" to={`editor`}>EduLint</Link>
        <Nav className="me-auto">
          <NavLink className="nav-link" to={`editor`}>Editor</NavLink>
          <NavLink className="nav-link" to={`teachers`}>For teachers</NavLink>
          <NavLink className="nav-link" to={`faq`}>FAQ</NavLink>
          <NavLink className="nav-link" to={`about`}>About</NavLink>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => toggleDarkmode(current, setMode)}>{modeSymbol}</Nav.Link>
          <Nav.Link><GearFill onClick={onSettingsClick} /></Nav.Link>
        </Nav>
      </Container>
    </NB >
  );
}
