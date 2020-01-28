const router = require("express").Router();
const Task = require("../models/task.model");

router.route("/").get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  //TODO sanitization and validation
  const projectname = req.body.projectname;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newTask = new Task({
    projectname,
    description,
    duration,
    date
  });

  newTask
    .save()
    .then(() => res.json("Task Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Task.findById(req.params.id)
    .then(taskDetails => res.json(taskDetails))
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/:id").delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task Deleted"))
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/update/:id").post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.projectname = req.body.projectname;
      task.description = req.body.description;
      task.duration = Number(req.body.duration);
      task.date = Date.parse(req.body.date);
      task
        .save()
        .then(() => res.json("Task updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
