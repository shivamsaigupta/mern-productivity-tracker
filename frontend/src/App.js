import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import TasksList from "./components/tasks-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CreateProject from "./components/create-project.component";

function App() {
  return (
    <Router>
      <div className="container container-top">
        <Navbar />
        <br />
        <div className="container">
          <Route path="/" exact component={TasksList} />
          <Route path="/edit/:id" component={EditTask} />
          <Route path="/create" component={CreateTask} />
          <Route path="/project" component={CreateProject} />
        </div>
      </div>
    </Router>
  );
}

export default App;
