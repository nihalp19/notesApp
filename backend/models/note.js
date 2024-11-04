const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    content : {
        type : String,
        required : true,
    },
    tags : {
        type : [String],
        default : []
    },
    isPinned : {
        type : Boolean,
        default : false
    },
    createdBy : {
        type : String,
        required : true
    }
},{timestamps : true})


const Note = mongoose.model('Notes',noteSchema)

module.exports = Note