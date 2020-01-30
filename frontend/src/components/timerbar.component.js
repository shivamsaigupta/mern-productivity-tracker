import React, { Component } from "react";
import { Link } from "react-router-dom";
import ms from "pretty-ms";
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
      duration: 0,
      timerOn: false,
      startTimeStamp: 0,
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

  startTimer = () => {
    this.setState({
      timerOn: true,
      startTimeStamp: Date.now() - this.state.duration
    });
    this.timer = setInterval(
      () =>
        this.setState({
          duration: Date.now() - this.state.startTimeStamp
        }),
      1
    );
  };

  stopTimer() {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({ timerOn: false, duration: 0 });
  }

  render() {
    return (
      <form>
        <div className="row no-gutters align-content-center">
          <div className="form-group col-8">
            <input
              type="text"
              placeholder="What are you working on?"
              className="form-control"
            />
          </div>
          <div className="col-4 d-flex justify-content-around">
            <select
              ref="projectInput"
              required
              className="form-control"
              style={{ flex: 4 }}
              value={ms(this.state.projectname)}
              onChange={this.onChangeProjectname}
            >
              {this.state.projects.map(project => {
                return (
                  <option key={project} value={project}>
                    {project}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="00:00:00"
              value={this.state.duration}
              className="form-control"
              style={{ flex: 2 }}
            />
            <FontAwesomeIcon
              className="playButton"
              style={{ flex: 1 }}
              icon={faPlayCircle}
              size="2x"
              onClick={this.startTimer}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default TimerBar;
