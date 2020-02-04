const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const tasksRouter = require("./routes/tasks");
const projectsRouter = require("./routes/projects");

app.use("/tasks", tasksRouter);
app.use("/projects", projectsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
