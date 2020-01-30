import React, { Component } from "react";
import { Link } from "react-router-dom";
import ms from "pretty-ms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faChevronCircleRight,
  faCheckCircle
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

  onChangeProjectname = e => {
    this.setState({
      projectname: e.target.value
    });
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { projectname, description, duration, date } = this.state;
    const newTask = {
      projectname,
      description,
      duration,
      date
    };

    axios.post("http://localhost:5000/tasks/add", newTask).then(res => {
      this.props.rerenderCallback();
      console.log(res);
    });
    this.resetTimer();
  };

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

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

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
              value={this.state.description}
              onChange={this.onChangeDescription}
              required
              className="form-control"
            />
          </div>
          <div className="col-4 d-flex justify-content-around">
            <select
              ref="projectInput"
              required
              className="form-control"
              style={{ flex: 4 }}
              value={this.state.projectname}
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
              value={ms(this.state.duration, { colonNotation: true })}
              className="form-control"
              style={{ flex: 2 }}
            />
            {this.state.timerOn ? (
              <FontAwesomeIcon
                className="btn-timer-ctrl"
                style={{ flex: 1 }}
                icon={faPauseCircle}
                size="2x"
                onClick={this.stopTimer}
              />
            ) : (
              <FontAwesomeIcon
                className="btn-timer-ctrl"
                style={{ flex: 1 }}
                icon={faPlayCircle}
                size="2x"
                onClick={this.startTimer}
              />
            )}
            {this.state.duration > 0 ? (
              <FontAwesomeIcon
                className="checkButton"
                icon={faCheckCircle}
                style={{ flex: 1 }}
                onClick={this.onSubmit}
                size="2x"
              />
            ) : null}
          </div>
        </div>
      </form>
    );
  }
}

export default TimerBar;
