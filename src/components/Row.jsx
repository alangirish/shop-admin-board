import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDraggable, useDroppable } from '@dnd-kit/core';

function Row({
  id,
  labels,
  primaryVariantImg,
  variant2Img,
  variant3Img,
  index,
  addColumn,
  additionalVariants,
  onDelete,
  columns,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef: setDragNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });

  const { setNodeRef: setDropNodeRef } = useDroppable({
    id: id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const dragStyle = isDragging
    ? {
        position: 'relative',
        zIndex: 9999,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
        transform: `${style?.transform || ''} scale(1.05) translateZ(50px)`,
        transition: 'all 0.3s ease',
        background: 'white',
        opacity: 0.8,
      }
    : {
        transition: 'all 0.3s ease',
      };

  return (
    <div ref={setDropNodeRef} className="flex">
      <div ref={setDragNodeRef} style={dragStyle} {...attributes} className="flex">
        <div
          className={`w-80 flex-shrink-0 flex space-x-4 p-4 border-r border-gray-300 items-center justify-center relative ${isDragging ? 'bg-blue-50' : ''} sticky left-0 z-10 bg-white`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-row items-center space-x-2">
            <h1 className="text-4xl font-serif">{index + 1}</h1>
            <div className="cursor-move" {...listeners}>
              <DragIndicatorIcon className={`text-3xl ${isDragging ? 'text-blue-500' : ''}`} />
            </div>
          </div>

          <div className="flex-grow">
            <div className="border-dashed border-2 border-gray-200 p-3 rounded-lg flex flex-row flex-wrap items-center justify-start">
              {labels.map((label, index) => (
                <span
                  key={index}
                  className={`p-1 border-2 border-gray-200 rounded-lg m-1 text-xs font-medium ${
                    label === "contains"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : ""
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {isHovered && !isDragging && (
            <button
              className="text-2xl absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => onDelete(id)}
            >
              <DeleteOutlineOutlinedIcon />
            </button>
          )}
        </div>

        <div className="flex-grow overflow-x-auto">
          <div className="flex" style={{ minWidth: `${200 * (columns.length - 1)}px` }}>
            {[primaryVariantImg, variant2Img, variant3Img, ...additionalVariants].map((variant, index) => (
              <div key={index} className={`p-4 border-r border-gray-300 text-center ${isDragging ? 'bg-blue-50' : ''}`} style={{ minWidth: '200px' }}>
                <div className="p-4 border-dashed border-2 border-gray-200 rounded-lg">
                  <div className="h-28 w-28 mx-auto">
                    <img
                      src={typeof variant === 'string' ? variant : variant.img}
                      alt={`Variant ${index + 1}`}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <p className="pt-2">{typeof variant === 'string' ? `Variant ${index + 1} Text` : variant.text}</p>
                </div>
              </div>
            ))}

            <div className={`flex items-center justify-center ${isDragging ? 'bg-blue-50' : ''}`} style={{ minWidth: '200px' }}>
              <button className="text-3xl" onClick={addColumn}>
                <AddIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Row;