const mongoose = require("mongoose");
const { Schema } = mongoose;
const tasksSchema = Schema({
    taskName: {
        type: String,
        unique: true
    },

    completed: {
        type: Boolean,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },

})

const Task = mongoose.model('Task', tasksSchema);

module.exports = Task;