import { useState } from "react";
import { Save } from "lucide-react";
import ColorPicker from "../../components/ColorPicker";

const TopProduk = () => {
  const [mode, setMode] = useState("list");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Panel Maker",
    },
    {
      id: 2,
      name: "Sheet Metal",
    },
  ]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    titleColor: "#FFFFFF",
    titleOpacity: 100,
    titleEn: "",
    description: "",
    descriptionColor: "#FFFFFF",
    descriptionOpacity: 100,
    descriptionEn: "",
    backgroundColor: "#FFFFFF",
    backgroundOpacity: 100,
  });

  const handleAddCategory = () => {
    setEditingId(null);

    setFormData({
      category: "",
      title: "",
      titleColor: "#FFFFFF",
      titleOpacity: 100,
      titleEn: "",
      description: "",
      descriptionColor: "#FFFFFF",
      descriptionOpacity: 100,
      descriptionEn: "",
      backgroundColor: "#FFFFFF",
      backgroundOpacity: 100,
    });

    setMode("add");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category.trim()) return;

    if (mode === "edit") {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingId
            ? {
                ...category,
                name: formData.category,
                title: formData.title,
                titleColor: formData.titleColor,
                titleOpacity: formData.titleOpacity,
                titleEn: formData.titleEn,
                description: formData.description,
                descriptionColor: formData.descriptionColor,
                descriptionOpacity: formData.descriptionOpacity,
                descriptionEn: formData.descriptionEn,
                backgroundColor: formData.backgroundColor,
                backgroundOpacity: formData.backgroundOpacity,
              }
            : category
        )
      );

      setEditingId(null);
      setMode("list");
      return;
    }

    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: formData.category,
        title: formData.title,
        titleColor: formData.titleColor,
        titleOpacity: formData.titleOpacity,
        titleEn: formData.titleEn,
        description: formData.description,
        descriptionColor: formData.descriptionColor,
        descriptionOpacity: formData.descriptionOpacity,
        descriptionEn: formData.descriptionEn,
        backgroundColor: formData.backgroundColor,
        backgroundOpacity: formData.backgroundOpacity,
      },
    ]);

    setMode("list");
  };

  const handleEdit = (category) => {
    setEditingId(category.id);

    setFormData({
      category: category.name,
      title: category.title || "",
      titleColor: category.titleColor || "#FFFFFF",
      titleOpacity: category.titleOpacity ?? 100,
      titleEn: category.titleEn || "",
      description: category.description || "",
      descriptionColor: category.descriptionColor || "#FFFFFF",
      descriptionOpacity: category.descriptionOpacity ?? 100,
      descriptionEn: category.descriptionEn || "",
      backgroundColor: category.backgroundColor || "#FFFFFF",
      backgroundOpacity: category.backgroundOpacity ?? 100,
    });

    setMode("edit");
  };

  const handleDelete = (id) => {
    setSelectedCategoryId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategoryId === null) return;

    setCategories((prev) =>
      prev.filter((category) => category.id !== selectedCategoryId)
    );

    setSelectedCategoryId(null);
    setDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setSelectedCategoryId(null);
    setDeleteModalOpen(false);
  };

  const handleSave = () => {
    console.log("Data Top Produk:", categories);
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-['Nunito_Sans']">
      {/* PAGE TITLE */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Top General
        </h1>
      </div>

      {/* LIST */}
{mode === "list" && (
  <>
    <section className="rounded-md bg-white shadow-sm">
      {/* CARD HEADER */}
      <div className="border-b border-[#E5E5E5] px-5 py-3">
        <h2 className="text-[15px] font-bold text-[#171717]">
          Kategori Produk
        </h2>
      </div>

      {/* ADD BUTTON */}
      <div className="px-5 py-3">
        <button
          type="button"
          onClick={handleAddCategory}
          className="rounded-md bg-[#FDCB01] px-3 py-2 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
        >
          Tambah kategori baru
        </button>
      </div>

      {/* TABLE */}
      <div className="px-5 pb-5">
        <div className="overflow-hidden rounded-md border border-[#D5D5D5] shadow-sm">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[15%]" />
              <col className="w-[40%]" />
              <col className="w-[45%]" />
            </colgroup>

            <thead>
              <tr className="bg-[#F7F3E9]">
                <th className="border-b border-[#D5D5D5] px-3 py-3 !text-center align-middle text-[11px] font-bold text-[#333]">
                  No
                </th>

                <th className="border-b border-[#D5D5D5] px-3 py-3 text-center align-middle text-[11px] font-bold text-[#333]">
                  Kategori
                </th>

                <th className="border-b border-[#D5D5D5] px-3 py-3 !text-center align-middle text-[11px] font-bold text-[#333]">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  {/* NO */}
                  <td className="border-b border-[#E5E5E5] px-3 py-3 text-center align-middle text-[12px] text-[#333]">
                    {index + 1}.
                  </td>

                  {/* KATEGORI */}
                  <td className="border-b border-[#E5E5E5] px-3 py-3 text-center align-middle text-[12px] text-[#333]">
                    {category.name}
                  </td>

                  {/* AKSI */}
                  <td className="border-b border-[#E5E5E5] px-3 py-3 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(category)}
                        className="rounded-md bg-[#FDCB01] px-3 py-1.5 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(category.id)}
                        className="rounded-md bg-[#FF0000] px-3 py-1.5 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="h-[58px] text-center align-middle text-[12px] text-[#777]"
                  >
                    Belum ada kategori produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SAVE */}
      <div className="flex justify-end px-5 pb-5 pt-1">
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1 rounded-md bg-[#7FC97F] px-5 py-2 text-[10px] font-bold text-[#222] shadow-sm transition hover:brightness-95"
        >
          <Save size={11} />
          Simpan
        </button>
      </div>
    </section>
  </>
)}

      {/* ADD / EDIT FORM */}
      {(mode === "add" || mode === "edit") && (
        <section className="rounded-md bg-white shadow-sm">
          {/* CARD HEADER */}
          <div className="border-b border-[#E5E5E5] px-5 py-3">
            <h2 className="text-[15px] font-bold text-[#171717]">
              Kategori Produk
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="px-16 py-5">
            {/* KATEGORI */}
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                KATEGORI
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Masukan nama kategori"
                className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
              />
            </div>

            {/* JUDUL */}
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                JUDUL
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukan judul utama"
                  style={{
                    color: formData.titleColor,
                    opacity: formData.titleOpacity / 100,
                  }}
                  className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 pr-32 text-[10px] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <ColorPicker
                    value={formData.titleColor}
                    opacity={formData.titleOpacity}
                    onChange={(color) =>
                      setFormData((prev) => ({
                        ...prev,
                        titleColor: color.hex,
                        titleOpacity: color.opacity,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* JUDUL INGGRIS */}
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
                JUDUL DALAM BAHASA INGGRIS
              </label>

              <input
                type="text"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                placeholder="Masukan judul utama"
                className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] italic text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
              />
            </div>

            {/* DESKRIPSI */}
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                DESKRIPSI
              </label>

              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Masukan deskripsi"
                  rows={4}
                  style={{
                    color: formData.descriptionColor,
                    opacity: formData.descriptionOpacity / 100,
                  }}
                  className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 pr-32 text-[10px] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
                />

                <div className="absolute right-2 top-3">
                  <ColorPicker
                    value={formData.descriptionColor}
                    opacity={formData.descriptionOpacity}
                    onChange={(color) =>
                      setFormData((prev) => ({
                        ...prev,
                        descriptionColor: color.hex,
                        descriptionOpacity: color.opacity,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* DESKRIPSI INGGRIS */}
            <div className="mb-5">
              <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
                DESKRIPSI DALAM BAHASA INGGRIS
              </label>

              <textarea
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleChange}
                placeholder="Masukan deskripsi"
                rows={4}
                className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] italic text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
              />
            </div>

            {/* BACKGROUND WARNA */}
            <div className="mb-5">
              <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                BACKGROUND WARNA
              </label>

              <div className="relative flex h-[60px] items-center rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-2 shadow-sm">
                <div
                  className="h-[18px] w-[18px] rounded-[2px] border border-[#D5D5D5]"
                  style={{
                    backgroundColor: formData.backgroundColor,
                    opacity: formData.backgroundOpacity / 100,
                  }}
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <ColorPicker
                    value={formData.backgroundColor}
                    opacity={formData.backgroundOpacity}
                    onChange={(color) =>
                      setFormData((prev) => ({
                        ...prev,
                        backgroundColor: color.hex,
                        backgroundOpacity: color.opacity,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

{/* SAVE */}
<div className="flex justify-end px-5 pb-5 pt-1">
  <button
    type="button"
    onClick={handleSave}
    className="flex items-center gap-1 rounded-md bg-[#7FC97F] px-5 py-2 text-[10px] font-bold text-[#222] shadow-sm transition hover:brightness-95"
  >
    <Save size={11} />
    Simpan
  </button>
</div>
          </form>
        </section>
      )}

      {/* DELETE MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[500px] overflow-hidden rounded-md bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#D9D9D9] px-5 py-4">
              <h3 className="text-[15px] font-bold text-[#222]">
                Hapus
              </h3>

              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="text-[25px] font-light leading-none text-black transition hover:opacity-60"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-5 py-5">
              <p className="mb-2 text-[12px] font-bold text-[#333]">
                Apakah anda yakin ingin menghapus kategori ini?
              </p>

              <p className="text-[10px] text-[#555]">
                Kategori ini akan dihapus secara permanen
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex gap-3 px-5 pb-5">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="rounded-md bg-[#FFD000] px-3 py-1.5 text-[10px] font-bold text-black transition hover:brightness-95"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-md bg-[#FF0000] px-3 py-1.5 text-[10px] font-bold text-black transition hover:brightness-95"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopProduk;