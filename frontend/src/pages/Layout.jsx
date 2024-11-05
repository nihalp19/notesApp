import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NoteForm from "../components/NoteForm"
import Notes from "../components/Notes"
function Layout() {

    const [userData, setUserData] = useState({})
    const [FormOpen, setFormOpen] = useState(false)
    const [Note, setNotes] = useState([])
    const [update, setUpdate] = useState(false)

    const [search, setSearch] = useState("")
    const [filter, setFilterState] = useState([])

    const [title1, setTitle1] = useState("")
    const [content1, setContent1] = useState("")
    const [tag1, setTag1] = useState("")
    const [tags1, setTags1] = useState([])
    const [id, setId] = useState("")


    const navigate = useNavigate()

    useEffect(() => {

        const CheckAuth = async () => {
            try {
                const response = await fetch("http://localhost:3000/user/checkauth", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })

                if (!response.ok) {
                    throw new Error("not logined please login")
                }
                const data = await response.json()
                setUserData(data.user)
                console.log("CheckAuth Successfull user is authorized");
            } catch (err) {
                console.log("CheckAuth: ", err.message)
                navigate("/login")
            }
        }
        CheckAuth()
    }, [])

    return (
        <div className="min-h-screen w-full relative">
            <div className="fixed w-full">
                <Navbar value={{ userData, Note,  filter, setFilterState, search, setSearch }} />
                <Notes value={{ Note, setNotes, FormOpen, setFormOpen, update, setUpdate, title1, tags1, tag1, content1, setContent1, setTag1, setTags1, setTitle1, id, setId, filter, setFilterState, search, setSearch}} />
            </div>
            {FormOpen && <div className="absolute z-10 w-full min-h-screen  flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
                <NoteForm value={{ FormOpen, setFormOpen, Note, setNotes, update, setUpdate, title1, tags1, tag1, content1, setContent1, setTag1, setTags1, setTitle1, id, setId, filter, setFilterState,search, setSearch}} />
            </div>}
            <button className="absolute flex justify-center items-center bg-black text-2xl text-white px-4 py-2 rounded-lg bottom-4 right-4" onClick={() => setFormOpen(true)}>+</button>
        </div>
    )
}

export default Layout 