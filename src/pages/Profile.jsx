import { UserCircle } from "lucide-react";

import "../styles/profile.css";

export default function Profile({ onNavigate }) {
  return (
    <div className="profile-page">

      {/* TITLE */}
      <div className="profile-title">
        <span>Profile</span>
      </div>

      {/* PROFILE CARD */}
      <section className="profile-card">

        <div className="profile-content">

          {/* PROFILE ICON */}
          <div className="profile-avatar">
            <UserCircle
              size={90}
              strokeWidth={1.5}
            />
          </div>

          {/* PROFILE INFO */}
          <div className="profile-info">

            <p className="profile-greeting">
              Hi Admin!
            </p>

            <div className="profile-detail">
              <strong>Admin</strong>
              <span>/ admin</span>
            </div>

            <div className="profile-detail">
              <strong>Email</strong>
              <span>: admin@gmail.com</span>
            </div>

            <div className="profile-detail">
              <strong>Password</strong>
              <span>: ********</span>
            </div>

            <div className="profile-detail">
              <strong>No Tlpn</strong>
              <span>: 0812345878</span>
            </div>

          </div>

        </div>

        {/* EDIT BUTTON */}
        <button
          className="profile-edit-button"
          type="button"
          onClick={() => onNavigate("profile-edit")}
        >
          Edit
        </button>

      </section>

    </div>
  );
}