import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg order-1">
        <Link to="/" className="navbar-brand">
          Productivity Tracker
        </Link>
        <div className="collpase navbar-collapse order-2">
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/project" className="nav-link">
                New Project
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
