import React from 'react'
import { Link } from 'react-router-dom'
import CanvasDraw from "react-canvas-draw"
import { useRef } from 'react'
import { useEffect } from 'react'
const PaintingCard = ({ obj }) => {
  const cnvsref = useRef()

  useEffect(() => {
    cnvsref.current.loadSaveData(obj.content)
  })
  return (
    <Link to={`/canvas/${obj.id}`} className="h-max">

      <div className='md:w-[250px] w-[180px] h-[220px]  bg-white relative m-2 md:my-4 border rounded-lg overflow-hidden'>
       
        <CanvasDraw ref={cnvsref} disabled canvasWidth={250} canvasHeight={150} className="w-full object-cover border-b" hideGrid />
        <h4 className='w-full px-4  my-0 text-[14px] font-semibold'>{obj.name || "majnu bhai"}</h4>
        <span className='text-slate-800 text-[12px] px-4'>🖌️ {new Date(obj.createdOn).toLocaleString("en-us")}</span>
      </div>
      {console.log(obj)}
    </Link>
  )
}

export default PaintingCard