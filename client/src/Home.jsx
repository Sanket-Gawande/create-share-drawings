import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FooterNav from './Components/FooterNav'
import Header from './Components/Header'
import PaintingCard from './Components/PaintingCard'
import UserCTX from './ContextProvider'
import { nanoid } from 'nanoid'
const Home = () => {
    const navigation = useNavigate();
    const ctx = useContext(UserCTX);
    const [works, setWorks] = useState(null)
    const [error, setError] = useState(null)
    const [modal, setModal] = useState(null)
    const [name, setName] = useState(null)
    // let a =  [1, 2, 4, 5, 7, 78, 9, 9, 7, 6, 7, 8, 5, 5, 6, 7]

    const createPainting = async e => {
        e.preventDefault();

        console.log({ e })
        const uri = `${import.meta.env.VITE_BASE_URL}/createWork`;

        try {
            const req = await fetch(uri, {
                method: "post",
                origin: "cors",
                body: JSON.stringify({ username: ctx.user.username, id: nanoid(), name }),
                headers: {
                    Accept: "*",
                    "Content-type": "application/json"
                }
            });
            const response = await req.json();
            if (response.status) {
                navigation(`/canvas/${response.id}`)
                setModal(false)
                return
            }

        } catch (error) {
            setModal(false)
            setError("Unable to connect , check your connection")
        }
    }
    const uri = `${import.meta.env.VITE_BASE_URL}/getWorks`;

    // get my paintings

    const getWorks = async () => {
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
                setWorks(response.data.paintings)
                return
            }
            setError(response.msg)
        } catch (error) {
            setError("Unable to connect , check your connection")
        }
    }

    useEffect(() => {
        getWorks()
    }, [])

    return (
        <div className='h-screen w-full overflow-y-auto'>
            {/*  floating button */}


            <Header />
            {/* create painting modal */}
            {
                modal &&
                <section className='fixed inset-0 grid place-items-center w-full bg-black/20 backdrop-filter backdrop-blur-lg z-20'>
                    <div className="w-[90%] max-w-[500px] bg-white py-8 px-4 rounded-lg">
                        <h4 className='text-slate-800 text-md font-semibold'>Start creating awesome stuff</h4>
                        <form method='post' onSubmit={createPainting} className="w-max mx-auto">
                            <p className='mt-4 '>give name to your art</p>
                            <input className='py-2 px-4 outline-none border border-slate-700 focus:border-primary  rounded-lg my-2' type="text" placeholder='eg. monalisa' onInput={e => setName(e.target.value)} value={name} required />
                            <span className='space-x-4 flex justify-between mt-2'>

                                <button className='bg-white shadow-md text-green-500 rounded-lg flex-1 py-2 px-4 md:mx-4 hover:bg-green-200 hover:shadow-none block md:inline-block'>Lets go ✅</button>
                                <p className='bg-white text-center shadow-md text-red-500 rounded-lg py-2  flex-1  border hover:bg-red-200 px-4 md:mx-4 block hover:shadow-none md:inline-block' onClick={() => setModal(false)}>Cancel 🚫</p>
                            </span>
                        </form>
                    </div>
                </section>
            }
            {
                error &&
                <div className='w-[90%] mx-auto bg-red-600/20 text-red-600 p-4 flex justify-between rounded-sm'>

                    <>
                        <h4 >{error}</h4>
                        <span onClick={getWorks} className="cursor-pointer">🔄</span>
                    </>
                </div>
            }

            <div className='text-lg px-4 flex w-full flex-wrap p-4 flex-1 h-[calc(100%-80px)] pb-20 justify-center '>
                {
                    !works?.length ?
                        <div className='h-full w-full grid place-items-center'>
                            <h4 className='text-xl text-slate-300 font-bold '>You don't have any painting.</h4>
                            <img src="/no-data.png" className='w-[600px]  object-cover' alt="" />
                        </div>
                        :
                        works?.map((obj, index) =>
                            <PaintingCard obj={obj} />
                        )


                }
            </div>
            <button className='fixed md:bottom-4 bottom-16 md:right-8 right-4  bg-white shadow-lg w-12 h-12 hover:bg-slate-100 rounded-full' onClick={() => setModal(true)}>➕</button>
            <FooterNav />
        </div>
    )
}

export default Home