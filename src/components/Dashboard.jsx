import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "./Table";

function Dashboard() {
  return (
    <div className="flex flex-col h-full overflow-x-auto">
      <div className="flex-shrink-0 py-7 px-9 space-y-8 sticky left-0 z-20 bg-white">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center space-x-6">
            <button>
              <ArrowBackIcon style={{ fontSize: "35px" }} />
            </button>
            <div className="border-b-2 border-black py-1 ">
              <h1 className="text-2xl font-serif">Test 3_staging</h1>
            </div>
            <button className="rounded-full border-2 border-blue-500 bg-blue-100 py-1 px-2 text-xs text-blue-500 font-semibold">
              Primary Feed
            </button>
          </div>
          <button className="rounded-md bg-green-500 text-white p-2">Publish Feed</button>
        </div>
      </div>
      <div className="flex-grow border-2 border-gray-400 border-opacity-40 rounded-lg overflow-hidden">
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;