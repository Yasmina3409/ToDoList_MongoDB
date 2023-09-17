const mysql = require(`mysql-await`);

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
module.exports.UpdateData = async (req, res) => {
    const { task_id } = req.params;
    const { newCompletedValue } = req.body;
    const sql = `UPDATE tasks SET  completed =?  WHERE task_id ="${task_id}"`;
    const sql2 = `SELECT * FROM tasks`;
    var result = await db.awaitQuery(sql, newCompletedValue)
    var result2 = await db.awaitQuery(sql2)
    res.status(200).json(result2);
}