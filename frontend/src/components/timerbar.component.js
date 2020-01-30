import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faPlayCircle,
  faStopCircle
} from "@fortawesome/free-solid-svg-icons";
import "../style.css";
import axios from "axios";

class TimerBar extends Component {
  container = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectname: "",
      description: "",
      duration: "",
      date: new Date(),
      dropdownOpen: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    axios.get("http://localhost:5000/projects").then(res => {
      if (res.data.length > 0) {
        this.setState({
          projects: res.data.map(project => project.projectname),
          projectname: res.data[0].projectname
        });
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
    console.log(this.state.dropdownOpen);
  };

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false
      });
    }
  };

  render() {
    return (
      <form className="container" ref={this.container}>
        <div className="row align-items-center">
          <div className="form-group col-9">
            <input
              type="text"
              placeholder="What are you working on?"
              className="form-control"
            />
          </div>
          <div className="col-3 d-flex">
            <div className="position-relative d-inline-block">
              <button
                type="button"
                className="btn"
                onClick={this.handleDropdownButton}
              >
                <FontAwesomeIcon icon={faBriefcase} size="2x" />
              </button>
            </div>

            {this.state.dropdownOpen && (
              <div className="dropdownAbs">
                <ul className="dropdownUl">
                  <li className="dropdownLi">Test 1</li>
                  <li className="dropdownLi">Test 2</li>
                  <li className="dropdownLi">Test 3</li>
                </ul>
              </div>
            )}
            <input
              type="text"
              placeholder="00:00:00"
              className="form-control"
            />
            <button type="button" className="btn">
              <FontAwesomeIcon icon={faPlayCircle} size="2x" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default TimerBar;
