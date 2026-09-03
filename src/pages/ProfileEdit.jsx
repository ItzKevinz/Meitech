import { useState, useRef } from "react";
import { UserCircle, Upload, X } from "lucide-react";

import "../styles/profile-edit.css";

const dummyProfile = {
  id: 1,
  name: "Admin",
  username: "admin",
  email: "admin@gmail.com",
  password: "admin123",
  phone: "0812345878",
  photo: null,
};

export default function ProfileEdit({ onNavigate }) {
  const [profile, setProfile] = useState(dummyProfile);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Buka File Explorer
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Setelah gambar dipilih
  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      photo: imageUrl,
    }));

    // Tutup modal setelah pilih gambar
    setUploadModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // NANTI KIRIM KE BACKEND / DATABASE
    console.log("Data profile:", profile);

    onNavigate("profile");
  };

  return (
    <div className="profile-edit-page">

      {/* TITLE */}
      <div className="profile-edit-title">
        <span>Profile-edit</span>
      </div>

      {/* EDIT CARD */}
      <section className="profile-edit-card">

        <form onSubmit={handleSubmit}>

          {/* AVATAR */}
          <div className="profile-edit-avatar-section">

            <div className="profile-edit-avatar">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Profile"
                />
              ) : (
                <UserCircle
                  size={90}
                  strokeWidth={1.5}
                />
              )}
            </div>

            {/* CHOOSE PHOTO */}
            <button
              type="button"
              className="choose-photo-button"
              onClick={() => setUploadModalOpen(true)}
            >
              Choose photo
            </button>

            {/* HIDDEN FILE INPUT */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handlePhotoChange}
              hidden
            />

          </div>

          {/* FORM */}
          <div className="profile-form">

            <div className="profile-form-group">
              <label htmlFor="name">
                Nama
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={profile.password}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="phone">
                No Tlpn
              </label>

              <input
                id="phone"
                name="phone"
                type="text"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>

            {/* SAVE */}
            <button
              className="profile-save-button"
              type="submit"
            >
              Simpan
            </button>

          </div>

        </form>
      </section>

      {/* =========================
          UPLOAD MODAL
      ========================= */}

      {uploadModalOpen && (
        <div
          className="upload-modal-overlay"
          onClick={() => setUploadModalOpen(false)}
        >
          <div
            className="upload-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* CLOSE */}
            <button
              type="button"
              className="upload-modal-close"
              onClick={() => setUploadModalOpen(false)}
              aria-label="Tutup"
            >
              <X size={18} />
            </button>

            {/* UPLOAD */}
            <button
              type="button"
              className="upload-button"
              onClick={handleUploadClick}
            >
              <Upload
                size={16}
                strokeWidth={2}
              />

              <span>
                Upload
              </span>
            </button>

            <p className="upload-hint">
              Click atau drop gambar
            </p>

          </div>
        </div>
      )}

    </div>
  );
}