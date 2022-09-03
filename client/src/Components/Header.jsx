import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserCTX from '../ContextProvider'


const Header = () => {
  const ctx = useContext(UserCTX);
  const logout = () => {
    ctx.setUser(null);
    localStorage.removeItem("user_project_28");
  }
  const navigation = useNavigate();
  useEffect(() => {
    if (!ctx?.user) {
      return navigation("/login")

    }

  }, [ctx]);
  return (
    <>

      <header className='fixed py-2  px-4 md:px-6 w-full flex justify-between items-center h-[80px] z-10 backdrop-blur-md backdrop-filter border bg-white/50' >
        <h4 className='text-lg font-semibold '> <Link to={"/"}>
          Project-28 🖼️</Link> </h4>
        <ul className='space-x-4 py-2 flex items-center justify-end text-sm'>
          <li> 🙋🏻‍♂️ {ctx?.user?.name}</li>
          <li className='bg-primary py-2 px-4 text-white text-sm rounded-md ' onClick={logout}> Logout <span className='hidden md:inline-block'> 🚫</span></li>
        </ul>
      </header>
      <div className="w-full h-[80px]"></div>
    </>
  )
}

export default Header