const mysql = require(`mysql-await`);

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
module.exports.setData = async (req, res) => {
    const { taskName, completed, username } = req.body
    const sql = `INSERT INTO tasks (name,completed,task_username) VALUES (?,?,?)`;
    const sql2 = `SELECT * FROM tasks`
    const values = [taskName, completed, username];
    console.log(values)
    var result2 = await db.awaitQuery(sql2);
    var list_tasks = result2;
    if (list_tasks.length === 0) {
        var result = await db.awaitQuery(sql, values);
        res.send("tasklAjoute"); // Envoyez la réponse au client
        return;
    }
    for (let i = 0; i < list_tasks.length; i++) {
        if (req.body.taskName === list_tasks[i].name && req.body.username === list_tasks[i].task_username) {
            res.send("taskExist");
            return;
        }
    }
    var result = await db.awaitQuery(sql, values);
    res.send("taskAjoute");




};