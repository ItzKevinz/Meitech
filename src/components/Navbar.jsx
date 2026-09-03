import { useState } from "react";

import {
  Menu,
  UserCircle,
  ChevronDown,
  LogOut,
  User,
  Activity,
} from "lucide-react";

import "../styles/navbar.css";

export default function Navbar({
  userName = "Admin",
  onMenuClick,
  onProfileClick,
  onNavigate,
}) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleUserDropdown = () => {
    setUserDropdownOpen((prev) => !prev);
  };

  const handleNavigate = (page) => {
    setUserDropdownOpen(false);
    onNavigate(page);
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <button
          className="navbar-menu-button"
          onClick={onMenuClick}
          type="button"
          aria-label="Toggle sidebar"
        >
          <Menu size={19} strokeWidth={2} />
        </button>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* WEBSITE BUTTON */}
        <button className="website-button" type="button">
          Website Meitech
        </button>

        {/* USER */}
        <div className="user-menu">
          <button
            className="user-button"
            onClick={handleUserDropdown}
            type="button"
          >
            <UserCircle size={20} strokeWidth={2} />

            <span className="user-greeting">Hi, {userName}</span>

            <ChevronDown
              className={`user-chevron ${userDropdownOpen ? "open" : ""}`}
              size={18}
              strokeWidth={2}
            />
          </button>

          {/* USER DROPDOWN */}
          {userDropdownOpen && (
            <div className="user-dropdown">
              {/* PROFIL */}
              <button type="button" onClick={() => handleNavigate("profile")}>
                <User size={22} strokeWidth={2} />

                <span>Profil</span>
              </button>

              {/* AKTIVITAS */}
              <button type="button" onClick={() => handleNavigate("activity")}>
                <Activity size={22} strokeWidth={2} />

                <span>Aktivitas</span>
              </button>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={() => {
                  setUserDropdownOpen(false);
                  setLogoutModalOpen(true);
                }}
              >
                <LogOut size={22} strokeWidth={2} />
                <span>Logout</span>
              </button>
            </div>
          )}

          {logoutModalOpen && (
            <div className="logout-overlay">
              <div className="logout-modal">
                {/* HEADER */}
                <div className="logout-modal-header">
                  <h2>Logout</h2>

                  <button
                    className="logout-close"
                    type="button"
                    onClick={() => setLogoutModalOpen(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {/* CONTENT */}
                <div className="logout-modal-content">
                  <h3>Apakah anda yakin ingin Logout?</h3>

                  <p>Anda akan kembali ke menu login</p>

                  {/* BUTTON */}
                  <div className="logout-actions">
                    <button
                      className="logout-cancel"
                      type="button"
                      onClick={() => setLogoutModalOpen(false)}
                    >
                      Kembali
                    </button>

                    <button className="logout-confirm" type="button">
                      Ya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
