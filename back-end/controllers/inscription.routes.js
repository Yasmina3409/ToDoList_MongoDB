const mysql = require(`mysql-await`);
require("dotenv").config();
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


module.exports.setInscription = async (req, res) => {
    const hpwd = await hashPassword(req.body.pwd);
    const { user_name, pwd } = req.body
    const sql = `INSERT INTO user (user_name, pwd) VALUES (?,?)`;
    const sql2 = `SELECT * FROM user where user_name="${req.body.user_name}"`
    const values = [user_name, hpwd];
    var user = await db.awaitQuery(sql2);
    if (user.length != 0) {
        res.send("user_nameExist");
    }
    else {
        var newUser = await db.awaitQuery(sql, values);
        const username = req.body.user_name
        res.status(200).json({ "jtw": token, "user": username });
    }
};
