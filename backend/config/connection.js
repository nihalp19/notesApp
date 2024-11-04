const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

async function connectDB(url){
    return await mongoose.connect(url)
}

module.exports = {
    connectDB
}