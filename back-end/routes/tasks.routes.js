const express = require("express");

const { createTask } = require("../controllers/tasks.controllers");
const router = express.Router();


router.post("/tasks/addTask", createTask)


module.exports = router;