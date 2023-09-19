const express = require("express");
// const { Logout } = require("../controllers/logout.routes");
const router = express.Router();
const { createUser, connectUser } = require("../controllers/user.controllers");
const { authenticateToken } = require("../authJWT");
router.use(authenticateToken);
router.post("/login", connectUser);
// router.post("/logout", Logout)
router.post("/inscription", createUser)
module.exports = router;