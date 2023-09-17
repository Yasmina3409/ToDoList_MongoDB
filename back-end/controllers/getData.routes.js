const mysql = require(`mysql-await`);
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports.getData = async (req, res) => {
    const sql = `SELECT * FROM tasks where task_username="${req.params.userName}"`;
    var result = await db.awaitQuery(sql)
    var list_task = result
    res.send(list_task)
}
