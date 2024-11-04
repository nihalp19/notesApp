const express = require("express")
const dotenv = require("dotenv").config()
const { connectDB } = require("./config/connection")
const userRoutes = require("./routes/user")
const noteRoutes = require("./routes/note")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const PORT = process.env.PORT || 3000

const app = express()
connectDB(process.env.MONGODB_CONNECT_URI).then(() => console.log("MONGODB CONNECTED")).catch((err) => console.log("err", err.message))

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5173/home"],  // Specify the frontend origin
    credentials: true                 // Enable credentials (cookies) with requests
}));
app.use(cookieParser())

app.use("/user", userRoutes)
app.use("/note",noteRoutes)


app.listen(PORT, () => console.log(`server started at the port ${PORT}`))
