import { useState } from "react";

import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Activity from "./pages/Activity";

import "./styles/global.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

const renderPage = () => {
  switch (currentPage) {
    case "profile":
      return <Profile onNavigate={handleNavigate} />;

    case "profile-edit":
      return <ProfileEdit onNavigate={handleNavigate} />;

    case "activity":
      return <Activity />;

    case "dashboard":
    default:
      return <Dashboard />;
  }
};

  return (
    <div
      className={`app ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        <Navbar
          onMenuClick={toggleSidebar}
          onNavigate={handleNavigate}
        />

        {renderPage()}
      </main>
    </div>
  );
}

export default App;