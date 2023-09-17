const mysql = require(`mysql-await`);

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports.getDataComplted = async (req, res) => {
    const sql = 'SELECT * FROM tasks WHERE task_username = ? AND completed = 1';

    var result = await db.awaitQuery(sql, [req.params.userName])
    var list_task = result

    res.send(list_task)
}
