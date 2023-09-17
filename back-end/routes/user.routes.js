const express = require("express");
// const { setData } = require("../controllers/setData.routes");
// const { getData } = require("../controllers/getData.routes");
// const { UpdateData } = require("../controllers/updateData.routes");
// const { DeleteData } = require("../controllers/deleteData.routes");
// const { DeleteAll } = require("../controllers/deleteAll.routes");
const { Logout } = require("../controllers/logout.routes");
// const { getDataComplted } = require("../controllers/getDataCompleted.routes");
const { createUser, connectUser, } = require("../controllers/user.controllers");
const { authenticateToken } = require("../authJWT");
const router = express.Router();

router.post("/login", connectUser);
// router.post("/addTask", setData);
// router.post("/displayList/:userName", getData);
// router.post("/displayListCompleted/:userName", getDataComplted);
// router.put("/updateCompleted/:task_id", UpdateData);
// router.delete("/deleteTask/:task_id", DeleteData)
// router.delete("/deleteAll/:userName", DeleteAll)
router.post("/logout", Logout)
router.use(authenticateToken);
router.post("/inscription", createUser)
module.exports = router;