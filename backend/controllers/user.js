const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")


async function register(req, res) {
    const { name, email, password } = req.body

    try {
        if (!name || !email || !password) {
            throw new Error("enter the every feild")
        }

        const hashedPassword = (await bcryptjs.hash(password, 10)).toString()

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        return res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            },
            message: "user registred successfully"
        })

    } catch (error) {
        console.log("err while email register", error)
        return res.status(400).json({ success: false, message: error.message })
    }
}


async function login(req, res) {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            throw new Error("Enter The Details")
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email" })
        }

        const passwordMatched = await bcryptjs.compare(password, user.password)

        if (!passwordMatched) {
            return res.status(400).json({ success: false, message: "Password Wrong" })
        }

        const token = generateToken(user._id,res)

        return res.status(200).json({
            success: true,
            token : token,
            user: {
                ...user._doc,
                password: undefined
            },
            message: "login successfully"
        })

    } catch (err) {
        console.log("err while logging in", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}

async function checkauth(req, res) {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            throw new Error("something goes wrong checking auth")
        }

        return res.status(200).json({
            succes: true, user
        })
    } catch (err) {
        console.log("Error while checking auth", err);
        return res.status(400).status({ success: false, message: err.message })
    }
}

async function logout(req, res) {
    res.clearCookie("token")

    return res.status(200).json({ success: true, message: "logout successfully" })
}


module.exports = {
    login,
    register,
    checkauth
}