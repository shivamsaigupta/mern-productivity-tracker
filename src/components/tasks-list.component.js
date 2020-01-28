import React, { Component } from "react";
import { Link } from "react-router-dom";
import Task from "./task.component";
import axios from "axios";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tasks/")
      .then(res => {
        this.setState({ tasks: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteTask(id) {
    axios
      .delete("http://localhost:5000/tasks/" + id)
      .then(res => console.log(res.data));

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    });
  }

  taskList() {
    return this.state.tasks.map(currentTask => {
      return (
        <Task
          task={currentTask}
          deleteTask={this.deleteTask}
          key={currentTask._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Tasks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Project</th>
              <th>Task</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.taskList()}</tbody>
        </table>
      </div>
    );
  }
}

export default TasksList;
