const mysql = require(`mysql-await`);

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
module.exports.DeleteData = async (req, res) => {
    const { task_id } = req.params;
    const sql = 'DELETE FROM tasks WHERE task_id = ?';
    var result = await db.awaitQuery(sql, task_id)
    res.send("suppression avec succsée");
}