import { Link } from "react-router-dom";
import ms from "pretty-ms";
import React from "react";

const Task = props => {
  return (
    <tr>
      <td>{props.task.projectname}</td>
      <td>{props.task.description}</td>
      <td>{ms(props.task.duration, { colonNotation: true })}</td>
      <td>{props.task.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.task._id}>Edit</Link> |
        <a
          href="#"
          onClick={() => {
            props.deleteTask(props.task._id);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Task;
