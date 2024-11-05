import React, { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { sendNoteData, UpdateNoteData, fetchData } from '../api/NoteApi'

function NoteForm({ value }) {
    const { FormOpen, setFormOpen, Note, setNotes, title1, tags1, tag1, content1, setContent1, setTag1, setTags1, setTitle1, update, setUpdate, id, setId, filter, setFilterState, search, setSearch } = value

    const [title, setTitle] = useState(title1)
    const [content, setContent] = useState(content1)
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState(tags1)

    const handleTags = (e) => {
        e.preventDefault()
        setTags([...tags, tag])
        setTag('')
    }

    const removeTag = (id) => {
        const finalTags = tags.filter((t, i) => (i != id))
        setTags(finalTags)
    }

    const handleNoteSubmit = async (e) => {
        e.preventDefault()
        const NoteData = { title, content, tags }

        const note = await sendNoteData(NoteData)
        if (note && note.succes) {
            setNotes([...Note, note.data.note])
            setTitle('')
            setContent('')
            setTag('')
            setTags([])
            setFormOpen(false)
        }
    }

    const handleNoteUpdate = async (e) => {
        e.preventDefault()
        console.log("hi hello");
        const updateNote = { title, content, tags, id }
        const data1 = await UpdateNoteData(updateNote)
        const data = await fetchData()
        if (data) {
            console.log("data :", data.data);
            setNotes(data.data)
            setTitle('')
            setContent('')
            setTags([])
            setTitle1('')
            setContent1('')
            setTags1([])
            setFormOpen(false)
            setUpdate(false)
        }
    }

    return (
        <div>
            <form className='relative flex flex-col gap-4 border-[2px] bg-white border-black rounded-lg p-8 w-[400px]' onSubmit={update ? handleNoteUpdate : handleNoteSubmit}>
                <Cross1Icon className='absolute right-3 top-3' style={{ width: '20px', height: '20px' }} onClick={() => setFormOpen(false)} />
                <h1 className='text-center text-2xl mb-3'>Add Note</h1>
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Title...' className='p-2 border rounded-md' value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="content">Title</label>
                <textarea name="" id="contnet" className='p-2 border rounded-md resize-none' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content.....'></textarea>
                <label htmlFor="tags">tags</label>
                <div className='flex gap-2 overflow-x-scroll no-scrollbar'>
                    {tags && (tags.map((t, i) => (
                        <div className='px-4 py-2 bg-slate-200 rounded-md flex gap-1 items-center ' key={i}>#{t} <span className='nowrap'><Cross1Icon onClick={() => removeTag(i)} /></span></div>
                    )))}
                </div>
                <div className='flex gap-4'>
                    <input type="text" id='tags' className='p-2 border rounded-md' value={tag} onChange={(e) => setTag(e.target.value)} placeholder='#TAGS' />
                    <button className='bg-black text-white rounded-md py-2 px-4' onClick={handleTags}>+</button>
                </div>

                <button className='bg-black text-white rounded-md py-2' >{update ? "Update" : "Add"}</button>
            </form>
        </div>
    )
}

export default NoteForm