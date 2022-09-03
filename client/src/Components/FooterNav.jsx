import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const FooterNav = () => {

    return (
        <>
            {/* <div className='h-[100px] md:h-[80px]'></div> */}
            <div className='bg-white shadow-md fixed bottom-0 md:bottom-6 md:-right-44 md:hover:-right-2 transition-all text-sm font-semibold border  w-full  md:w-48 justify-center items-center flex md:flex-col text-center h-[50px] md:h-auto'>
                <span className='md:first-letter:inline-block left-[-24px] absolute h-12 w-12 hidden '>
                    
                    <i class="fa-solid fa-ellipsis-vertical text-4xl text-slate-600 bg-white p-2"></i>
                </span>
                {/* <NavLink to={"/"} className="text-slate-800 text-lg py-2 flex-1">Home</NavLink> */}
                <NavLink to={"/"} className="text-slate-800  py-2 flex-1 w-full "> 🎨 My paitings</NavLink>
                <NavLink to={"/shared"} className="text-slate-800  py-2 flex-1 w-full"> 📎 Shared</NavLink>

            </div>
        </>
    )
}

export default FooterNav