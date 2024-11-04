const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

function verifyUser(req, res, next) {
    const token = req.cookies.token

    try {
        if (!token) {
            console.log("Token not found");
            return res.status(401).json({ success: false, message: "Token not found, please login" });
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY)
        if (!verified) {
            return res.status(400).json({ succcess: false, message: "token is expired" })
        }

        req.userId = verified.userId
        next()
    }
    catch (err) {
        console.log("err while verifying user", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}

module.exports = {
    verifyUser
}