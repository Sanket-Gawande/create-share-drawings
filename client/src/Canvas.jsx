import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams, useRoutes } from 'react-router-dom'
import FooterNav from './Components/FooterNav'
import Header from './Components/Header'
import CanvasDraw from "react-canvas-draw"
import UserCTX from './ContextProvider'
import PaintingCard from './Components/PaintingCard'
const Canvas = () => {
    const navigation = useNavigate();
    const ctx = useContext(UserCTX);
    const [work, setWork] = useState([])
    const canvasRef = useRef()
    const shareBtn = useRef()
    const saveBtn = useRef()

    const [shareTo, setShareTo] = useState(null)
    const [modal, setModal] = useState(null)
    const [error, setError] = useState(null)
    const [merror, setMError] = useState()
    const [color, setColor] = useState("#222")
    const [size, setSize] = useState(5)
    // let a =  [1, 2, 4, 5, 7, 78, 9, 9, 7, 6, 7, 8, 5, 5, 6, 7]
    const { id } = useParams()

    const uri = `${import.meta.env.VITE_BASE_URL}/getWork`;
    const getWork = async () => {
        try {
            const req = await fetch(uri, {
                method: "post",
                origin: "cors",
                body: JSON.stringify({  id }),
                headers: {
                    Accept: "*",
                    "Content-type": "application/json"

                }
            });
            const response = await req.json();
            setError(null)
            if (response.status) {
                canvasRef.current.loadSaveData(response.data.paintings[0]?.content)
                setWork(response.data.paintings[0])
                return
            }
            setError(response.msg)
        } catch (error) {
            setError("Unable to connect , check your connection")
        }
    }
    useEffect(() => {
        getWork();
    }, [])


    // save drawing

    const saveData = async () => {

        // 
        saveBtn.current.disabled = true
        saveBtn.current.innerHTML = "saving 🔄"
        const uri = `${import.meta.env.VITE_BASE_URL}/updateWork`;

        try {
            const req = await fetch(uri, {
                method: "post",
                origin: "cors",
                body: JSON.stringify({ username: work.owner, id, content: canvasRef.current.getSaveData() }),
                headers: {
                    Accept: "*",
                    "Content-type": "application/json"

                }
            });
            const response = await req.json();
            setError(null)
            if (response.status) {
                saveBtn.current.disabled = false
                   saveBtn.current.innerHTML = "Save drawing 📂"
                // setModal(false)
                return
            }
            setMError(response.msg)
        } catch (error) {
            setError("Unable to connect , check your connection")
        }

    }

    // share drawing
    const shareDrawing = async (e) => {
        e.preventDefault()
        // 
        shareBtn.current.disabled = true
        shareBtn.current.innerHTML = "Sharing 🔄"
        const uri = `${import.meta.env.VITE_BASE_URL}/shareWork`;

        try {
            const req = await fetch(uri, {
                method: "post",
                origin: "cors",
                body: JSON.stringify({ username: ctx.user.username, shareTo,  id, content: canvasRef.current.getSaveData()  , name : work.name}),
                headers: {
                    Accept: "*",
                    "Content-type": "application/json"

                }
            });
            const response = await req.json();
            setMError(null)
            shareBtn.current.disabled = false
            shareBtn.current.innerHTML = "error"
            if (response.status) {
                shareBtn.current.disabled = false
                shareBtn.current.innerHTML = "Shared !"
                return
            }
            setMError(response.msg)
        } catch (error) {
            setMError("Unable to connect , check your connection")
            shareBtn.current.disabled = false
        }

    }
    return (
        <div className='h-screen w-full overflow-y-auto'>
            <Header />
            {
                error &&
                <div className='w-[90%] mx-auto bg-red-600/20 text-red-600 p-4 flex justify-between rounded-sm'>

                    <>
                        <h4 >{error}</h4>
                        <span onClick={getWork} className="cursor-pointer">🔄</span>
                    </>
                </div>
            }
            {
                modal &&
                <section className='fixed inset-0 grid place-items-center w-full bg-black/20 backdrop-filter backdrop-blur-lg z-20'>
                    <div className="w-[90%] max-w-[500px] bg-white py-8 px-4 rounded-lg">
                        <h4 className='text-slate-800 text-md font-semibold'>Share your art with friends</h4>
                        {
                            merror &&
                            <div className='w-[90%] mx-auto bg-red-600/20 text-red-600 p-4 py-2 flex justify-between rounded-md font-semibold text-sm'>

                                <>
                                    <h4 >{merror}</h4>

                                </>
                            </div>
                        }
                        <form method='post' className="w-max mx-auto" onSubmit={shareDrawing}>
                            <p className='mt-4 '>Enter username</p>
                            <input className='py-2 px-4 outline-none border border-slate-700 focus:border-primary  rounded-lg my-2' type="text" list='username-list' placeholder='eg. mycoolfriend' onInput={e => setShareTo(e.target.value)} value={shareTo} required />
                            <span className='space-x-4 flex justify-between mt-2'>

                                <button className='bg-white shadow-md text-green-500 rounded-lg flex-1 py-2 px-4 md:mx-4 hover:bg-green-200 hover:shadow-none block md:inline-block' ref={shareBtn}>Share  📩</button>
                                <p className='bg-white text-center shadow-md text-red-500 rounded-lg py-2  flex-1  border hover:bg-red-200 px-4 md:mx-4 block hover:shadow-none md:inline-block' onClick={() => setModal(false)}>Cancel 🚫</p>
                            </span>
                        </form>
                    </div>
                </section>
            }
            <span className='bg-white py-3 px-6 rounded-lg border shadow-md absolute text-sm  font-semibold'>Painting : {work?.name} by : {work?.owner}</span>
            <CanvasDraw canvasWidth={window.innerWidth} canvasHeight={window.innerHeight} className="mx-auto border" brushColor={color} brushRadius={size} hideGrid ref={canvasRef} />
            <span className='fixed md:bottom-4 top-[50%] md:right-8 right-4  bg-white shadow-lg -translate-y-[50%] hover:bg-slate-100 rounded-lg p-1 flex flex-col  justify-between py-4' >
                <section className='flex flex-col space-y-4'>
                    <label htmlFor="clr" className='flex justify-center items-center space-x-4'>
                        <p className={`h-12 w-12 rounded-full inline-block border-2`} style={{ background: color }}></p>
                        <p>

                            {color}
                        </p>
                    </label>
                    <input type="color" id='clr' onInput={e => setColor(e.target.value)} className="w-1 h-1" />
                    <input type="range" onInput={e => setSize(e.target.value)} value={size} className="  rounded-full overflow-hidden mx-auto " />
                    <button onClick={() => canvasRef.current.undo()} className="bg-slate-500 text-white rounded-md py-2 px-4 ">
                        Undo ↩️
                    </button>
                    <button onClick={() => canvasRef.current.eraseAll()} className="bg-slate-500 text-white rounded-md py-2 px-4 " >
                        Erase all 🧹
                    </button>
                </section>
                <button onClick={() => saveData()} className="bg-primary text-white rounded-md py-2 px-4 " ref={saveBtn}>
                    Save drawing 📂
                </button>
            </span>
            <button className='fixed md:bottom-4 bottom-16 md:right-8 right-4  bg-white shadow-lg w-12 h-12 hover:bg-slate-100 rounded-full' onClick={() => setModal(true)}> <i class="fa-solid fa-share"></i> </button>
            <FooterNav />
        </div>
    )
}

export default Canvas