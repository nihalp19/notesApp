const NOTE = require("../models/note")


async function addNote(req, res) {
    const { title, content, tags, } = req.body
    const userId = req.userId

    try {
        if (!title) {
            throw new Error("title is missing")
        }
        if (!content) {
            throw new Error("content is missing")
        }
        if (!userId) {
            throw new Error("id is missing")
        }

        const note = new NOTE({
            title,
            content,
            tags,
            createdBy: userId,
        })

        await note.save()

        res.status(200).json({
            success: true,
            note: {
                ...note._doc,
                createdBy: undefined
            },
            message: "SuccessFully Created Note"
        })

    } catch (err) {
        console.log("err while adding note", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}

async function getNote(req, res) {
    try {
        const note = await NOTE.findOne({ createdBy: req.userId })

        if (!note) {
            return res.status(400).json({ success: false, message: "Empty..." })
        }

        return res.status(200).json({ success: true, note })
    } catch (err) {
        console.log("err while getting note", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}

async function deleteNote(req, res) {
    const userId = req.userId
    const { id } = req.body
    try {
        const note = await NOTE.deleteOne({ createdBy: userId, _id: id })
        if (note.deletedCount === 0) {
            return res.status(400).json({ success: false, message: "Not deleted err" })
        }

        return res.status(200).json({ success: true, message: "deleted successfully" })
    } catch (err) {
        console.log("err while getting note", err)
        return res.status(400).json({ success: false, message: err.message, })
    }
}

async function updateNote(req, res) {
    const { title, content, tags, id } = req.body
    try {
        if (!title || !content || !id) {
            throw new Error("while updating title and content is required")
        }

        const note = await NOTE.findOne({ createdBy: req.userId, _id: id })

        if (!note) {
            return res.status(400).json({ success: false, message: "Note not found" })
        }

        note.title = title
        note.content = content
        note.tags = tags

        await note.save()
        return res.status(200).json({ success: true, message: "updated successfully" })
    } catch (err) {
        console.log("err while getting note", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}

async function fetchNote(req, res) {
    const userId = req.userId
    try {
        if (!userId) {
            throw new Error("not authorized")
        }

        const note = await NOTE.find({ createdBy: userId })
            .sort({ isPinned: -1 }) 
            .exec();

        if (!note) {
            return res.status(400).json({ success: false, message: "Note not found" })
        }

        return res.status(200).json({ success: true, note })
    } catch (err) {
        console.log("err while fetching note", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}

async function updatePin(req, res) {
    console.log(req.body)
    const { id, isPinned } = req.body
    const userId = req.userId
    if (!isPinned == null || !id == null) {
        throw new Error("pinned status not send or id")
    }
    try {
        if (!userId) {
            throw new Error("not authorized")
        }

        const note = await NOTE.findOne({ _id: id, createdBy: userId })
        if (!note) {
            return res.status(400).json({ success: false, message: "Pinned status not updated" })
        }

        note.isPinned = isPinned
        await note.save()
        return res.status(200).json({ success: true, message: "pinned update success" })
    } catch (err) {
        console.log("err while updating pinned status", err)
        return res.status(400).json({ success: false, message: err.message })
    }
}



module.exports = {
    addNote,
    getNote,
    deleteNote,
    updateNote,
    fetchNote,
    updatePin
}