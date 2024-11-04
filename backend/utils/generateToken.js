const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
function generateToken(userId,res) {
    try {
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
            expiresIn: "7d"
        })

        return token
    }
    catch (err) {
        console.log("err", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}

module.exports = {
    generateToken
}

