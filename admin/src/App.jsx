import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard.jsx";
import UserManagement from "./components/UserManagement"; 

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // default dark mode

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
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
          theme === "dark" ? "bg-[#111A22]" : "bg-gray-200"
        ].join(" ")}
      >
        <Sidebar isCollapsed={!sidebarOpen} theme={theme} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
        <main className={`flex-1 p-4 overflow-y-auto ${theme === "dark" ? "bg-[#151F28]" : "bg-white"}`}>
          <Routes>
  <Route path="/dashboard" element={<Dashboard theme={theme} />} />
  <Route path="/user-management" element={<UserManagement theme={theme} />} />
</Routes>

        </main>
      </div>
    </div>
  );
}

export default App;
