import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="nav navbar-brand">
              Productivity Tracker
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav ml-auto">
              <li className="navbar-item active">
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
        </div>
      </nav>
    );
  }
}

export default Navbar;
