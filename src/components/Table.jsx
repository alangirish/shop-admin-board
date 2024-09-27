import React, { useState} from "react";
import Row from "./Row";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

function Table() {
  const [columns, setColumns] = useState([
    { name: "Product Filter", span: 2 },
    { name: "Primary Variant" },
    { name: "Variant 2" },
    { name: "Variant 3" },
  ]);

  const [tableData, setTableData] = useState([
    {
      id: 'row-0',
      labels: ["tags", "contains", "name"],
      primaryVariantImg: "collections/img1.jpeg",
      variant2Img: "collections/img2.jpeg",
      variant3Img: "collections/img3.jpeg", 
      additionalVariants: [],
    },
    {
      id: 'row-1',
      labels: ["tags", "contains", "name"],
      primaryVariantImg: "collections/img4.jpeg",
      variant2Img: "collections/img5.jpeg",
      variant3Img: "collections/img6.jpeg",
      additionalVariants: [],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTableData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = [...items];
        const [reorderedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, reorderedItem);
        
        return newItems;
      });
    }
  }

  function addColumn() {
    setColumns([...columns, { name: `Variant ${columns.length}` }]);

    setTableData(
      tableData.map((row) => ({
        ...row,
        additionalVariants: [
          ...row.additionalVariants,
          {
            img: "collections/newVariantImg.jpeg",
            text: `New Variant ${columns.length}`,
          },
        ],
      }))
    );
  }

  function addRow() {
    const newRow = {
      id: `row-${tableData.length}`,
      labels: ["tags", "contains", "name"],
      primaryVariantImg: "collections/newPrimaryImg.jpeg",
      variant2Img: "collections/newVariant2Img.jpeg",
      variant3Img: "collections/newVariant3Img.jpeg",
      additionalVariants: columns.slice(4).map((col, index) => ({
        img: "collections/newVariantImg.jpeg",
        text: `New Variant ${index + 4}`,
      })),
    };

    setTableData([...tableData, newRow]);
  }

  function deleteRow(rowId) {
    const updatedData = tableData.filter((row) => row.id !== rowId);
    setTableData(updatedData);
  }

  return (
    <div className="flex flex-col h-full">
      
      <div className="flex overflow-x-auto">
        <div className="w-80 p-4 border-r border-gray-300 text-gray-500 text-center font-medium flex-shrink-0 sticky left-0 z-10 bg-white">
          Product Filter
        </div>
        <div className="flex-grow ">
          <div className="flex" style={{ minWidth: `${200 * (columns.length - 1)}px` }}>
            {columns.slice(1).map((col, index) => (
              <div
                key={index}
                className="p-4 border-r border-gray-300 text-gray-500 text-center font-medium flex flex-row items-center justify-center"
                style={{ minWidth: '200px' }}
              >
                {col.name}
                {col.name !== "Add" && <MoreVertIcon className="ml-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="flex-grow overflow-y-auto">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          {tableData.map((rowData, index) => (
            <Row
              key={rowData.id}
              {...rowData}
              index={index}
              onDelete={deleteRow}
              addColumn={addColumn}
              columns={columns}
            />
          ))}
        </DndContext>
      </div>

      
      <div className="mt-4 sticky left-0">
        <button
          className="flex items-center space-x-2 p-2 text-gray-500"
          onClick={addRow}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
}

export default Table;