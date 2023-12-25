import React from "react";
import { Link } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import { useEffect } from "react";
const PaintingCard = ({ obj }) => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasRef.current.loadSaveData(obj.content);
  });
  return (
    <Link to={`/canvas/${obj.id}`} className="w-full border-2 border-zinc-800 rounded-lg overflow-hidden shadow-sm h-max">
      <div className="w-full bg-white relative">
        <CanvasDraw
          ref={canvasRef}
          disabled
          canvasWidth={250}
          canvasHeight={200}
          className="w-full object-cover"
          hideGrid
        />
        <h4 className="bg-zinc-800 px-4 py-3 text-sm uppercase font-medium text-white">
          {obj.name || "Majnu bhai"}
        </h4>
        <span className="text-zinc-300 bg-zinc-800 block border-t border-zinc-700 py-2 text-[12px] px-4">
          🖌️ {new Date(obj.createdOn).toLocaleString("en-us")}
        </span>
      </div>
    </Link>
  );
};

export default PaintingCard;
