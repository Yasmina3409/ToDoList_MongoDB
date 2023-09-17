
// //const mysql = require(`mysql-await`);
// // const { MongoClient } = require(`mongodb`)
// const mongoose = require("mongoose");
// require('dotenv').config();
// const connectDB = async () => {
//     try {
//         mongoose.set("strictQuery", false);
//         mongoose.connect(mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }), () =>
//             console.log("Mongo connecté")
//         );
//     } catch (err) {
//         console.log(err);
//         process.exit();
//     }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Connecté à la base de données MongoDB!");
        })
        .catch((err) => {
            console.error("Erreur de connexion à la base de données MongoDB:", err);
            throw err;
        });
};

module.exports = connectDB;
