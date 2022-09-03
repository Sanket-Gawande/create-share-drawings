import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FooterNav from './Components/FooterNav'
import Header from './Components/Header'
import PaintingCard from './Components/PaintingCard'
import UserCTX from './ContextProvider'
const Shared = () => {
    const navigation = useNavigate();
    const [shared, setShared] = useState();
    const [error, setError] = useState(null)
    const ctx = useContext(UserCTX)
    // [1, 2, 4, 5, 7, 78, 9, 9, 7, 6, 7, 8, 5, 5, 6, 7]
    // get my paintings
    const uri = `${import.meta.env.VITE_BASE_URL}/getShared`;
    const getShared = async () => {
        // alert("):")
        try {
            const req = await fetch(uri, {
                method: "post",
                origin: "cors",
                body: JSON.stringify({ username: ctx.user.username }),
                headers: {
                    Accept: "*",
                    "Content-type": "application/json"

                }
            });
            const response = await req.json();
            setError(null)
            if (response.status) {
                setShared(response.data.shared)
                return
            }
            setError(response.msg)
        } catch (error) {
            setError("Unable to connect , check your connection")
        }
    }

    useEffect(() => {
        getShared()
    }, [])
    return (
        <div className='h-screen w-full overflow-y-auto'>
            <Header />
            {
                error &&
                <div className='w-[90%] mx-auto bg-red-600/20 text-red-600 p-4 flex justify-between rounded-sm'>

                    <>
                        <h4 >{error}</h4>

                    </>
                </div>
            }
            <div className='text-lg px-4 flex w-full flex-wrap p-4 flex-1 h-[calc(100%-80px)] pb-20 justify-center '>
                {
                    !shared?.length ?
                        <div className='h-full w-full grid place-items-center'>
                            <h4 className='text-xl text-slate-300 font-bold '>Empty folder</h4>
                            <img src="/no-shared.png" className='w-[600px]  object-cover' alt="" />
                        </div>
                        :
                        shared?.map((obj, index) =>
                            <PaintingCard obj={obj} />
                        )


                }
            </div>
            <FooterNav />
        </div>
    )
}

export default Shared