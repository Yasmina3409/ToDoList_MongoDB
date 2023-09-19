const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, getTasksComplted } = require("../controllers/task.controllers");



router.post("/addTask", createTask)
router.post("/displayList/:userName", getTasks);
router.put("/updateCompleted/:_id", updateTask);
router.delete("/deleteTask/:_id", deleteTask)
router.post("/displayListCompleted/:userName", getTasksComplted);
module.exports = router;