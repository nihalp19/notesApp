import React, { useState } from 'react'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { UserApiRegister } from '../api/UserApi'
import { useNavigate } from 'react-router-dom'


function RegisterForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [exposePassword, setexposePassword] = useState(false)
    const [toastText, settoastText] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name == "" || email == "" || password == "") {
            settoastText(true)
            return
        }
        else {
            settoastText(false)
        }
        const userData = { name, email, password }
        const response = UserApiRegister(userData)
        if (response) {
            setEmail("")
            setName("")
            setPassword("")
            navigate("/login")
        }
    }

    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <form className='relative mb-3 p-6 flex flex-col justify-center w-[320px] border-[2px] border-black rounded-lg'>
                <h4 className='text-3xl mb-8 text-center'>Register</h4>
                <input className='mb-6 p-2 rounded-md border' type="text" value={name} placeholder='John Doe' onChange={(e) => setName(e.target.value)} />
                <input className='mb-6 p-2 rounded-md border' type="text" value={email} placeholder='John@example.com' onChange={(e) => setEmail(e.target.value)} />
                <div className='relative mb-6'>
                    <input className='relative p-2 rounded-md border w-full' type={exposePassword ? "text" : "password"} value={password} placeholder='..........................' onChange={(e) => setPassword(e.target.value)} />
                    {exposePassword ? <EyeOpenIcon className='absolute text-3xl right-4 top-3' onClick={() => setexposePassword(!exposePassword)} /> : <EyeClosedIcon className='absolute text-3xl right-4 top-3' onClick={() => setexposePassword(!exposePassword)} />}
                </div>
                <button className='bg-black text-white p-2 text-center rounded-md' onClick={handleSubmit}>Register</button>
                {toastText ? <span className='text-red-600 my-2'>All fields Are required</span> : ""}
            </form>
        </div>
    )
}

export default RegisterForm