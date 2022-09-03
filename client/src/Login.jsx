import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserCTX from './ContextProvider';

const Login = () => {
    const [signup, setSignup] = useState(false);
    const ctx= useContext(UserCTX)
    const formref = useRef();
    const [error , setError] = useState(null)
    const navigate = useNavigate()
    const uri = signup ? `${import.meta.env.VITE_BASE_URL}/create` : `${import.meta.env.VITE_BASE_URL}/login`
    const formHandler = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const payload = {};
        for (const key of formdata.keys()) {
            // console.log(formdata.get(key))
            payload[key] = formdata.get(key)
        }
        try {
            const req = await fetch(uri, {
                method: "post",
                origin: "cors",
                body: JSON.stringify(payload),
                headers: {
                    Accept: "*",
                    "Content-type": "application/json"

                }
            });
            const response = await req.json();
            // console.log(response);
            if (response.status) {

                localStorage.setItem("user_project_28", JSON.stringify(response.user));
                ctx?.setUser(response.user);
                navigate("/");
                return
            }
            setError(response.msg)  
        } catch (error) {
            setError("Unable to connect , check your connection")
        }
        
    }

    useEffect(() => {
        if (ctx?.user) {
            navigate("/")
        }
    }, [ctx])
    return (
        <div className='w-full h-full bg-gray-100 flex items-center justify-center place-items-center'>

            <div className="bg-white/50 backdrop-blur-lg backdrop-filter p-4 rounded-lg max-w-[500px] w-[90%] shadow-lg ">
                <div className='w-full h-[200px] '>
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/de09b6b0-32f2-4d7d-8260-dce79d69d272/delyk83-47bac3bb-20c0-4b4f-8cdc-7cf360d66b2f.jpg/v1/fill/w_1024,h_556,q_75,strp/_50000_painting_by_majnu_bhai_by_shr3y008_delyk83-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTU2IiwicGF0aCI6IlwvZlwvZGUwOWI2YjAtMzJmMi00ZDdkLTgyNjAtZGNlNzlkNjlkMjcyXC9kZWx5azgzLTQ3YmFjM2JiLTIwYzAtNGI0Zi04Y2RjLTdjZjM2MGQ2NmIyZi5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.xjP18uvKcSArsyda_BpH1ZMDbWVdoFAW5Rjy-G7ONs0" alt="cover image" className=' border-primary border-2 h-full w-full' />
                </div>
                <form className="py-4 w-[80%] mx-auto" ref={formref} method="post" onSubmit={formHandler}>
                    <h4 className='text-xl text-primary  font-semibold py-4 text-center'>Project 28</h4>
                    {
                        error && 
                        <h4 className='w-full px-4 py-2 text-red-600 bg-red-100 border border-red-600 rounded-lg'>{error}</h4>
                    }
                    <h1 className='text-lg font-semibold text-secondary my-4'>{signup ? "Create account" : "Login here"}</h1>
                    {
                        signup &&
                        <div className="flex-col w-full flex space-y-2 my-4">
                            <label htmlFor="name" className='w-full text-slate-900 font-medium text-sm'>
                                Full name
                            </label>
                            <input required minLength={2} type="text" name='name' id="name" placeholder='eg. John doe' className='border rounded-lg outline-none py-2 px-4 focus:border-primary shadow-xs border-slate-800' />
                        </div>
                    }
                    <div className="flex-col w-full flex space-y-2">
                        <label htmlFor="username" className='w-full text-slate-900 font-medium text-sm'>
                            Username
                        </label>
                        <input required minLength={2} type="text" id="username" name='username' placeholder='username' className='border rounded-lg outline-none py-2 px-4 focus:border-primary shadow-xs border-slate-800' />
                    </div>
                    <div className="flex-col w-full flex space-y-2 my-4">
                        <label htmlFor="username" className='w-full text-slate-900 font-medium text-sm'>
                            Password
                        </label>
                        <input required minLength={2} type="password" name='password' id="username" placeholder='password' className='border rounded-lg outline-none py-2 px-4 focus:border-primary shadow-xs border-slate-800' />
                    </div>
                    {
                        signup &&
                        <div className="flex-col w-full flex space-y-2 my-4">
                            <label htmlFor="username" className='w-full text-slate-900 font-medium text-sm'>
                                Confirm password
                            </label>
                            <input required minLength={2} type="password" name='confirm_password' id="username" placeholder='confirm password' className='border rounded-lg outline-none py-2 px-4 focus:border-primary shadow-xs border-slate-800' />
                        </div>
                    }
                    <button className='bg-primary text-white py-2 px-8 rounded-lg' >{signup ? "Sign up" : "Login"}</button>
                    {
                        signup ? <p className='text-slate-500 text-sm my-2 cursor-pointer'> Dont have an account , <span className='text-primary' onClick={() => setSignup(!signup)}> Login</span> here</p> :

                            <p className='text-slate-500 text-sm my-2 cursor-pointer'> Already have an account , <span className='text-primary' onClick={() => setSignup(!signup)}> Sing up</span> here</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login