const Task = require("../models/tasks")





async function createTask(req, res) {
    const task = new Task(req.body);
    console.log(task)
    await task.validate();
    try {

        await Task.create(task);
        res.status(201).json(task);
    } catch (err) {
        res.status(404).json({ message: "createtask : " + err.message });
    }
}
module.exports = {
    createTask
}