import React, { Component } from "react";
import axios from "axios";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: ""
    };
  }
  onChangeProjectname = e => {
    this.setState({
      projectname: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const project = {
      projectname: this.state.projectname
    };

    console.log(project);

    axios
      .post("http://localhost:5000/projects/add", project)
      .then(res => console.log(res.data));
    this.setState({
      projectname: ""
    });
  };

  render() {
    return (
      <div>
        <h3>Create New Project</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Project: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.projectname}
              onChange={this.onChangeProjectname}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Project"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProject;
