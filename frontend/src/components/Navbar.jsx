import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import luffy from "../assets/luffy.jpg"
function Navbar({ value }) {

    const { userData, Note, filter, setFilterState, search, setSearch } = value
    const [mobSearch, setmobSearch] = useState(false)
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const searchNote = () => {
            if (!search == "") {
                const trimmedSearch = search.trim().toLowerCase();
                console.log("search", search);

                const filterState = Note.filter((n) => {
                    return (
                        n.title.trim().toLowerCase().includes(trimmedSearch) ||
                        n.content.toLowerCase().includes(trimmedSearch) ||
                        n.tags.some(tag => tag.toLowerCase().includes(trimmedSearch))
                    );
                });

                console.log("Filtered notes:", filterState);

                setFilterState(filterState);
            } else {
                return
            }
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

    const returnHome = (e) => {
        e.preventDefault()
        setFilterState([])
        setSearch("")
        console.log("filter :", filter);

    }

    const handleLogout = async () => {
        Cookies.remove("token")
        navigate("/login")
    }

    return (
        <header className='w-full h-full'>
            <nav className='relative flex justify-between items-center px-4  py-4 shadow-md'>
                <h3 className={mobSearch ? 'hidden' : 'text-3xl'} onClick={returnHome}>Notes</h3>
                <div className='relative md:block hidden'>
                    <input className="p-2 right-1 top-1 w-[400px] border-[2px] border-black rounded-sm" type="text" placeholder='Search...' value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <MagnifyingGlassIcon className='absolute top-3 right-2 text-xl' style={{ width: '20px', height: '20px' }} onClick={searchNote} />
                </div>
                <div className=' gap-2 justify-center items-center  md:flex hidden'>
                    <span>{userData?.name}</span>
                    <button className='bg-black text-white rounded-md px-4 py-2' onClick={handleLogout}>Logout</button>
                </div>
                <div className='flex gap-3 justify-center md:hidden '>
                    <MagnifyingGlassIcon className={mobSearch ? 'hidden' : ''} style={{ width: '25px', height: '25px' }} onClick={() => setmobSearch(true)} />
                    <HamburgerMenuIcon className={mobSearch ? 'hidden' : ''} style={{ width: '25px', height: '25px' }} onClick={() => setToggle(true)} />
                </div>
                {mobSearch ? (<div className='relative w-full block md:hidden'>
                    <input className="p-2 right-1 top-1 w-full border-[2px] border-black rounded-sm" type="text" placeholder='Search...' value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <MagnifyingGlassIcon className='absolute top-3 right-8 text-xl' style={{ width: '20px', height: '20px' }} onClick={searchNote} />
                    <Cross1Icon className='absolute top-3 right-2 text-xl' style={{ width: '20px', height: '20px' }} onClick={() => setmobSearch(false)} />
                </div>) : ("")}
                {toggle ? (<div className='absolute w-3/4  bg-black right-0 top-0 z-20 min-h-screen'>
                    <Cross1Icon className='absolute top-3 right-2 text-xl text-white' style={{ width: '20px', height: '20px' }} onClick={() => setToggle(false)} />
                    <div className='flex flex-col gap-4 justify-center items-center p-6'>
                        <div class="w-full  border-b-2 border-gray-300">
                            <div className='flex w-full  gap-4 mb-4'>
                               <img src={luffy} className='rounded-full w-[30px] h-[30px] bg-white' alt="" />
                                <span className='text-white text-xl'>{userData?.name}</span>
                            </div>
                        </div>
                        <button className='bg-white w-full rounded-md px-4 py-2' onClick={handleLogout}>Logout</button>
                    </div>
                </div>) : ("")
                }
            </nav>
        </header>
    )
}

export default Navbar