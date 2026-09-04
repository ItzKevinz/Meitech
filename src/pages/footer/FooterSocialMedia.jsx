import { useState } from "react";
import { Save, Upload } from "lucide-react";

import instagramLogo from "../../assets/footer/Instagram-logo.png";
import linkedinLogo from "../../assets/footer/Linkedin-logo.png";
import facebookLogo from "../../assets/footer/Facebook-logo.png";

const FooterSocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState([
    {
      id: 1,
      name: "Instagram",
      link: "instagram.com",
      icon: instagramLogo,
      order: 1,
    },
    {
      id: 2,
      name: "LinkedIn",
      link: "linkedin.com",
      icon: linkedinLogo,
      order: 2,
    },
    {
      id: 3,
      name: "Facebook",
      link: "facebook.com",
      icon: facebookLogo,
      order: 3,
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSocialId, setSelectedSocialId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    icon: null,
    order: "",
  });

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name,
      link: item.link,
      icon: item.icon,
      order: item.order,
    });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);

    setFormData({
      name: "",
      link: "",
      icon: null,
      order: socialMedia.length + 1,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      icon: imageUrl,
    }));
  };

  const handleSaveEdit = () => {
    setSocialMedia((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              name: formData.name,
              link: formData.link,
              icon: formData.icon,
              order: formData.order,
            }
          : item,
      ),
    );

    setEditingId(null);

    setFormData({
      name: "",
      link: "",
      icon: null,
      order: "",
    });
  };

  const handleSaveAdd = () => {
    if (!formData.name || !formData.link) {
      alert("Nama dan tautan wajib diisi!");
      return;
    }

    setSocialMedia((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: formData.name,
        link: formData.link,
        icon: formData.icon,
        order: formData.order,
      },
    ]);

    setIsAdding(false);

    setFormData({
      name: "",
      link: "",
      icon: null,
      order: "",
    });
  };

  const handleDelete = (id) => {
    setSelectedSocialId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSocialId === null) return;

    setSocialMedia((prev) =>
      prev.filter((item) => item.id !== selectedSocialId),
    );

    setSelectedSocialId(null);
    setDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setSelectedSocialId(null);
    setDeleteModalOpen(false);
  };

  const handleSave = () => {
    console.log("Data Footer Social Media:", socialMedia);
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-['Nunito_Sans']">
      {/* PAGE TITLE */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Social Media
        </h1>
      </div>

      {/* MAIN CARD */}
      <section className="rounded-md bg-white shadow-sm">
        {/* HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">
            List Social Media
          </h2>
        </div>

        {/* CONTENT */}
        <div className="px-16 py-5">
          {!isAdding && editingId === null && (
            <>
              {/* TAMBAH */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="rounded-md bg-[#FDCB01] px-5 py-2 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
                >
                  Tambah
                </button>
              </div>

              {/* TABLE */}
              <div className="overflow-hidden rounded-md border border-[#D5D5D5]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F7F3E9]">
                      <th className="border-b border-[#D5D5D5] px-4 py-3 !text-center text-[11px] font-extrabold">
                        No
                      </th>

                      <th className="border-b border-[#D5D5D5] px-4 py-3 text-center text-[11px] font-extrabold">
                        Nama
                      </th>

                      <th className="border-b border-[#D5D5D5] px-4 py-3 text-center text-[11px] font-extrabold">
                        Tautan
                      </th>

                      <th className="border-b border-[#D5D5D5] px-4 py-3 !text-center text-[11px] font-extrabold">
                        Icon
                      </th>

                      <th className="border-b border-[#D5D5D5] px-4 py-3 text-center text-[11px] font-extrabold">
                        Urut
                      </th>

                      <th className="border-b border-[#D5D5D5] px-4 py-3 !text-center text-[11px] font-extrabold">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {socialMedia.map((item, index) => (
                      <tr key={item.id} className="bg-white">
                        <td className="border-b border-[#E0E0E0] px-4 py-3 text-center !text-[12px]">
                          {index + 1}
                        </td>

                        <td className="border-b border-[#E0E0E0] px-4 py-3 text-center !text-[12px]">
                          {item.name}
                        </td>

                        <td className="border-b border-[#E0E0E0] px-4 py-3 text-center !text-[12px]">
                          {item.link}
                        </td>

                        <td className="border-b border-[#E0E0E0] px-4 py-3 text-center">
                          <div className="flex items-center justify-center">
                            <img
                              src={item.icon}
                              alt={item.name}
                              className="h-[28px] w-[28px] object-contain"
                            />
                          </div>
                        </td>

                        <td className="border-b border-[#E0E0E0] px-4 py-3 text-center !text-[11px]">
                          {item.order}
                        </td>

                        <td className="border-b border-[#E0E0E0] px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="rounded-[9px] bg-[#FFD000] px-4 py-1.5 text-[10px] font-bold text-black transition hover:brightness-95"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="rounded-[9px] bg-[#FF0000] px-4 py-1.5 text-[10px] font-bold text-black transition hover:brightness-95"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* FORM TAMBAH / EDIT */}
          {(isAdding || editingId !== null) && (
            <div>
              <div className="mb-4">
                <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                  Nama
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                />
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                  Tautan
                </label>

                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                />
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                  Icon
                </label>

                <label className="flex h-[60px] cursor-pointer items-center gap-3 rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-4 shadow-sm">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleIconChange}
                    className="hidden"
                  />

                  {formData.icon ? (
                    <>
                      <img
                        src={formData.icon}
                        alt="Icon"
                        className="h-[32px] w-[32px] object-contain"
                      />

                      <span className="text-[12px] italic text-[#777]">
                        Icon berhasil dipilih
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#777]"
                      />

                      <span className="text-[12px] italic text-[#777]">
                        Upload Icon
                      </span>
                    </>
                  )}
                </label>
              </div>

              <div className="mb-5">
                <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                  Urut
                </label>

                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                />
              </div>

              <button
                type="button"
                onClick={isAdding ? handleSaveAdd : handleSaveEdit}
                className="rounded-md bg-[#00C000] px-5 py-2 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
              >
                Simpan
              </button>
            </div>
          )}

          {deleteModalOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
    <div className="w-full max-w-[475px] overflow-hidden rounded-[7px] bg-white shadow-2xl">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#D5D5D5] px-6 py-4">
        <h3 className="text-[16px] font-bold text-[#333]">
          Hapus
        </h3>

        <button
          type="button"
          onClick={handleCloseDeleteModal}
          className="text-[26px] font-light leading-none text-black transition hover:opacity-60"
        >
          ×
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-6">
        <p className="mb-2 text-[13px] font-bold text-[#333]">
          Apakah anda yakin ingin menghapus data ini?
        </p>

        <p className="text-[11px] text-[#444]">
          Data ini akan dihapus secara permanen
        </p>
      </div>

      {/* BUTTON */}
      <div className="flex gap-4 px-6 pb-7">
        <button
          type="button"
          onClick={handleCloseDeleteModal}
          className="rounded-[4px] bg-[#FFD84D] px-4 py-2 text-[10px] font-bold text-black transition hover:brightness-95"
        >
          Kembali
        </button>

        <button
          type="button"
          onClick={handleConfirmDelete}
          className="rounded-[4px] bg-[#FF0000] px-4 py-2 text-[10px] font-bold text-black transition hover:brightness-95"
        >
          Hapus
        </button>
      </div>

    </div>
  </div>
)}
        </div>
      </section>
    </div>
  );
};

export default FooterSocialMedia;
