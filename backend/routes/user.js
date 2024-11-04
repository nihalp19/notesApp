const express = require("express")
const { register, login, checkauth } = require("../controllers/user")
const { verifyUser } = require("../middleware/verifyUser")
const router = express.Router()

router.get("/checkauth", verifyUser, checkauth)

router.post("/register", register)
router.post("/login", login)

module.exports = router