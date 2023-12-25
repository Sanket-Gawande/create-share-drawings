import React, { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserCTX from "../ContextProvider";

const Header = () => {
  const ctx = useContext(UserCTX);
  const logout = () => {
    ctx.setUser(null);
    localStorage.removeItem("drawing_app_user");
  };
  const navigation = useNavigate();
  useEffect(() => {
    if (!ctx?.user) {
      return navigation("/login");
    }
  }, [ctx]);
  return (
    <>
      <header className="fixed py-2 px-4 md:px-6 w-full flex justify-between items-center h-[80px] z-10 backdrop-blur-md backdrop-filter border bg-white">
        <Link to={"/"} className="flex gap-2 items-center">
          <img src="/logo.png" className="w-8" alt="create n share" />
          <p className="hidden sm:inline-block">Drawings</p>
        </Link>{" "}
        <ul className="gap-2 py-2 flex items-center justify-end text-sm">
          <li> 🙋🏻‍♂️ {ctx?.user?.name}</li>
          <li
            className="bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer  py-2 px-4 text-white text-sm rounded-md "
            onClick={logout}
          >
            {" "}
            Logout <span className="hidden md:inline-block"> 🚫</span>
          </li>
        </ul>
      </header>
      <div className="w-full h-[80px]"></div>
    </>
  );
};

export default Header;
