import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      description: "",
      duration: 0,
      date: new Date(),
      projects: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/projects").then(res => {
      if (res.data.length > 0) {
        this.setState({
          projects: res.data.map(project => project.projectname),
          projectname: res.data[0].projectname
        });
      }
    });
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

  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    });
  };

  onChangeDate = date => {
    this.setState({
      date: date
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const task = {
      projectname: this.state.projectname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(task);

    axios
      .post("http://localhost:5000/tasks/add", task)
      .then(res => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Create New Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Project: </label>
            <select
              ref="projectInput"
              required
              className="form-control"
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
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTask;
