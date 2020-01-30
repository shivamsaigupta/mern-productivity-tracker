import { Link } from "react-router-dom";
import ms from "pretty-ms";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Task = props => {
  return (
    <tr>
      <td>{props.task.projectname}</td>
      <td>{props.task.description}</td>
      <td>{ms(props.task.duration, { colonNotation: true })}</td>
      <td>{props.task.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.task._id}>
          <FontAwesomeIcon className="checkButton" icon={faEdit} size="2x" />
        </Link>
        &ensp;
        <a
          href="#"
          onClick={() => {
            props.deleteTask(props.task._id);
          }}
        >
          <FontAwesomeIcon
            className="checkButton"
            icon={faTrashAlt}
            size="2x"
          />
        </a>
      </td>
    </tr>
  );
};

export default Task;
