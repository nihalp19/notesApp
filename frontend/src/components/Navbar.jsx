import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
function Navbar({ value }) {

    const { userData, Note, filter, setFilterState, search, setSearch } = value
    const navigate = useNavigate()

    useEffect(() => {
        const searchNote = () => {
            const trimmedSearch = search.trim().toLowerCase();

            const filterState = Note.filter((n) => {
                return (
                    n.title.trim().toLowerCase().includes(trimmedSearch) ||
                    n.content.toLowerCase().includes(trimmedSearch) ||
                    n.tags.some(tag => tag.toLowerCase().includes(trimmedSearch))
                );
            });

            console.log("Filtered notes:", filterState);

            setFilterState(filterState);
        };
        searchNote()
    }, [Note])


    const searchNote = (e) => {
        e.preventDefault();

        const trimmedSearch = search.trim().toLowerCase();

        const filterState = Note.filter((n) => {
            return (
                n.title.trim().toLowerCase().includes(trimmedSearch) ||
                n.content.toLowerCase().includes(trimmedSearch) ||
                n.tags.some(tag => tag.toLowerCase().includes(trimmedSearch))
            );
        });

        console.log("Filtered notes:", filterState);

        setFilterState(filterState);
    };

    const returnHome = () => {
        setFilterState([])
    }

    const handleLogout = async () => {
        Cookies.remove("token")
        navigate("/login")
    }

    return (
        <header className='w-full'>
            <nav className='flex justify-between items-start px-8  py-4 shadow-md'>
                <h3 className='text-3xl' onClick={returnHome}>Notes</h3>
                <div className='relative'>
                    <input className="p-2 right-1 top-1 w-[400px] border-[2px] border-black rounded-sm" type="text" placeholder='Search...' value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <MagnifyingGlassIcon className='absolute top-3 right-2 text-xl' style={{ width: '20px', height: '20px' }} onClick={searchNote} />
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    <span>{userData?.name}</span>
                    <button className='bg-black text-white rounded-md px-4 py-2' onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar