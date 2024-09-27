import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-zinc-900 w-full h-2 flex-shrink-0" />
      <div className="flex flex-row flex-grow overflow-hidden">
        <div className="sticky left-0 z-30">
          <Sidebar />
        </div>
        <div className="bg-white flex-grow overflow-hidden">
          <Dashboard />
        </div>
      </div>
      <div className="bg-zinc-900 w-full h-2 flex-shrink-0" />
    </div>
  );
}

export default App;