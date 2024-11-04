const express = require("express")
const {verifyUser} = require("../middleware/verifyUser")
const { getNote, addNote, deleteNote, updateNote,fetchNote,updatePin } = require("../controllers/note")

const router = express.Router()

router.get("/getnote", verifyUser, getNote)
router.get("/fetchnote", verifyUser, fetchNote)
router.post("/addnote", verifyUser, addNote)
router.delete("/deletenote", verifyUser, deleteNote)
router.put("/updatenote", verifyUser, updateNote)
router.put("/updatepin", verifyUser, updatePin)


module.exports = router
