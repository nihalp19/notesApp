import React, { useEffect } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { DrawingPinIcon } from '@radix-ui/react-icons'
import { fetchData } from '../api/NoteApi'

function Notes({ value }) {

    const { Note, setNotes, FormOpen, setFormOpen, update, setUpdate, title1, tags1, tag1, content1, setContent1, setTag1, setTags1, setTitle1, id, setId, searchIsON, setSearchIsON, filter, setFilterState, search, setSearch } = value


    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetchData()
            if (data) {
                console.log("data :", data.data);
                setNotes(data.data)
            }
        }
        fetchdata()
    }, [])


    const handlePinned = async (id) => {
        console.log("id..", id);

        const isPinned = true
        const pinnedData = { id, isPinned }
        try {
            const response = await fetch("http://localhost:3000/note/updatepin", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pinnedData),
                credentials: "include"
            })

            if (!response.ok) {
                console.log("error while updating pinned status", response)
            }

            const finalresponse = await response.json()
            console.log("finalresponse success", finalresponse)
            const data = await fetchData()
            if (data) {
                if (data) {
                    console.log("data :", data.data);
                    setNotes(data.data)
                }
            }
        }
        catch (err) {
            console.log("err while updating", err.message)
        }
    }

    const handleUnPinned = async (id) => {

        const isPinned = false
        const pinnedData = { id, isPinned }
        try {
            const response = await fetch("http://localhost:3000/note/updatepin", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pinnedData),
                credentials: "include"
            })

            if (!response.ok) {
                console.log("error while updating pinned status", response)
            }

            const finalresponse = await response.json()
            console.log("finalresponse success", finalresponse)
            const data = await fetchData()
            if (data) {
                if (data) {
                    console.log("data :", data.data);
                    setNotes(data.data)
                }
            }
        }
        catch (err) {
            console.log("err while updating", err.message)
        }
    }

    const handleUpdate = (id, title, content, tags) => {
        setFormOpen(true)
        setUpdate(true)

        setTitle1(title)
        setContent1(content)
        setTags1(tags)
        setId(id)

        console.log(title1)
        console.log(content1)
        console.log(tags1)
    }


    const handleDelete = async (id) => {
        try {
            const response = await fetch("http://localhost:3000/note/deletenote", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id }),
                credentials: "include"
            })

            if (!response.ok) {
                console.log("err while deleting", response)
                return
            }
            const data = await fetchData()
            if (data) {
                if (data) {
                    console.log("data :", data.data);
                    setNotes(data.data)
                }
            }
        } catch (err) {
            console.log("error while deleting", err.message);
        }
    }

    return (
        <div className='flex gap-4 w-full p-4'>
            {filter && filter.length > 0 ? (
                filter.map((f, i) => (
                    <div key={i} className='bg-slate-300 px-4 py-2 rounded-md'>
                        <div className='flex justify-end'>
                            {f.isPinned ? (
                                <DrawingPinIcon className='text-blue-500' onClick={() => handleUnPinned(f._id)} />
                            ) : (
                                <DrawingPinIcon onClick={() => handlePinned(f._id)} />
                            )}
                        </div>

                        <p className='text-2xl'>{f.title}</p>
                        <p className='text-lg'>{f.content.slice(0, 25)}</p>
                        <p>#{f.tags.join(" #")}</p>
                        <div className='flex justify-end gap-2 mt-2'>
                            <Pencil1Icon onClick={() => handleUpdate(f._id, f.title, f.content, f.tags)} />
                            <TrashIcon onClick={() => handleDelete(f._id)} />
                        </div>
                    </div>
                ))
            ) : (
                Note && Note.length > 0 ? (
                    Note.map((n, i) => (
                        <div key={i} className='bg-slate-300 px-4 py-2 rounded-md'>
                            <div className='flex justify-end'>
                                {n.isPinned ? (
                                    <DrawingPinIcon className='text-blue-500' onClick={() => handleUnPinned(n._id)} />
                                ) : (
                                    <DrawingPinIcon onClick={() => handlePinned(n._id)} />
                                )}
                            </div>

                            <p className='text-2xl'>{n.title}</p>
                            <p className='text-lg'>{n.content.slice(0, 25)}</p>
                            <p>#{n.tags.join(" #")}</p>
                            <div className='flex justify-end gap-2 mt-2'>
                                <Pencil1Icon onClick={() => handleUpdate(n._id, n.title, n.content, n.tags)} />
                                <TrashIcon onClick={() => handleDelete(n._id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notes available.</p>
                )
            )}
        </div>
    );
}

export default Notes