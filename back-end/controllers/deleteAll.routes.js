const mysql = require(`mysql-await`);

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
module.exports.DeleteAll = async (req, res) => {
    const table = 'tasks'; // Remplacez par le nom de votre table
    const sql = `DELETE FROM ${table} where task_username="${req.params.userName}"`
    var result = await db.awaitQuery(sql)
    res.send("suppression  totale avec succsée");
}