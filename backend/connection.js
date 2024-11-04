const mongoose = require('mongoose')


async function connectDb(url) {
    try{
    return await mongoose.connect(url)
    }
    catch(err)
    {
        console.log("err",err);
        
    }
}


module.exports = connectDb