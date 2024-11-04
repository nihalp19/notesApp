import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
function Navbar({ value }) {
    const [search, setSearch] = useState("")

    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false);

    const {userData,Note} = value

    const searchNote = () => {
        const filterState = Note.map((n,i) => n.title == search)
        console.log(filterState);
        
    }

    const handleLogout = async () => {
        Cookies.remove("token")
        navigate("/login")
    }

    return (
        <header className='w-full'>
            <nav className='flex justify-between items-start px-8  py-4 shadow-md'>
                <h3 className='text-3xl'>Notes</h3>
                <div className='relative'>
                    <input className="p-2 right-1 top-1 w-[400px] border-[2px] border-black rounded-sm" type="text" placeholder='Search...' value={search} onFocus={() => searchNote()}
                        onBlur={() => setIsFocused(false)} onChange={(e) => setSearch(e.target.value)} />
                    <MagnifyingGlassIcon className='absolute top-3 right-2 text-xl' style={{ width: '20px', height: '20px' }} />
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