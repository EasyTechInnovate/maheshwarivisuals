import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard.jsx";
import UserManagement from "./components/UserManagement"; 

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0D1117] text-white overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 transform transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0 md:transform-none",
          "w-64",
          sidebarOpen ? "md:w-60" : "md:w-16",
          "md:transition-[width] md:duration-300",
        ].join(" ")}
      >
        <Sidebar isCollapsed={!sidebarOpen} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          className="bg-[#111A22]"
        />
        <main className="flex-1 p-4 overflow-y-auto bg-[#111A22]">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
