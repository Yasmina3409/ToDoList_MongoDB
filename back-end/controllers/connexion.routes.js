const mysql = require(`mysql-await`);
require("dotenv").config();
const bcrypt = require('bcrypt');
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}


module.exports.setLogin = async (req, res) => {
    var username = req.body.user_name;
    var user_password = req.body.pwd;
    const sql = `SELECT * FROM user where user_name="${username}"`;
    if (username != '' && user_password != '') {
        var result = await db.awaitQuery(sql)
        var user = result[0]
        var blnOk = await comparePassword(user_password, user.pwd)
        if (blnOk) {
            delete user.pwd;
            res.status(200).json({ "user": username });
            return
        } else
            res.status(200).json({ error: "mot de passe incorrecte" })
        return
    }
    else
        res.status(200).json({ error: "Veuillez ajouter le mot de passe et l'adresse éamil SVP" });
}
