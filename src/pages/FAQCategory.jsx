import { useState } from "react";
import { Plus, Save } from "lucide-react";

const FAQCategory = ({ categories, setCategories, onNavigate }) => {
  // MODE HALAMAN
  const [mode, setMode] = useState("list");

  // KATEGORI YANG SEDANG DIEDIT
  const [selectedCategory, setSelectedCategory] = useState(null);

  // DATA FORM
  const [formData, setFormData] = useState({
    name: "",
  });

  // =========================
  // TAMBAH KATEGORI
  // =========================
  const handleAdd = () => {
    setFormData({
      name: "",
    });

    setSelectedCategory(null);
    setMode("add");
  };

  // =========================
  // EDIT KATEGORI
  // =========================
  const handleEdit = (category) => {
    setSelectedCategory(category);

    setFormData({
      name: category.name,
    });

    setMode("edit");
  };

  // =========================
  // INPUT FORM
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SIMPAN
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // EDIT
    if (mode === "edit") {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === selectedCategory.id
            ? {
                ...category,
                name: formData.name,
              }
            : category,
        ),
      );

      alert("Kategori FAQ berhasil diperbarui!");
    }

    // TAMBAH
    if (mode === "add") {
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        totalFAQ: 0,
      };

      setCategories((prev) => [...prev, newCategory]);

      alert("Kategori FAQ berhasil ditambahkan!");
    }

    // KEMBALI KE LIST
    setMode("list");

    setSelectedCategory(null);

    setFormData({
      name: "",
    });
  };

  // =========================
  // DELETE
  // =========================

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleDelete = (id) => {
    setSelectedCategoryId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== selectedCategoryId),
    );

    setSelectedCategoryId(null);
    setDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setSelectedCategoryId(null);
    setDeleteModalOpen(false);
  };

  // =========================
  // TOTAL FAQ
  // =========================
  const handleTotalFAQ = (category) => {
    console.log("Kategori:", category);

    if (onNavigate) {
      onNavigate("faq-detail", category);
    }
  };

  // =========================
  // KEMBALI
  // =========================
  const handleBack = () => {
    setMode("list");
    setSelectedCategory(null);

    setFormData({
      name: "",
    });
  };

  // =========================================================
  // FORM TAMBAH / EDIT
  // =========================================================
  if (mode === "add" || mode === "edit") {
    return (
      <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
        {/* HEADER */}
        <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
          <h1 className="text-[18px] font-extrabold text-[#171717]">FAQ</h1>
        </div>

        {/* FORM CARD */}
        <section className="overflow-hidden rounded-md bg-white shadow-sm">
          {/* CARD HEADER */}
          <div className="border-b border-[#E5E5E5] px-5 py-3">
            <h2 className="text-[15px] font-bold text-[#171717]">
              {mode === "add" ? "Tambah" : "Edit"}
            </h2>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="px-16 py-9">
            {/* NAMA KATEGORI */}
            <div className="mb-8">
              <label className="mb-2 block text-[11px] font-semibold text-[#555]">
                Nama Kategori
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-4 py-3 text-[12px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
              />
            </div>

            {/* BUTTON */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-[#7FC97F] px-6 py-2.5 text-[11px] font-semibold text-[#333] shadow-sm transition hover:brightness-95"
              >
                <Save size={13} />
                Simpan
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="rounded-md bg-[#E5E5E5] px-6 py-2.5 text-[11px] font-semibold text-[#333] shadow-sm transition hover:brightness-95"
              >
                Kembali
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }

  // =========================================================
  // LIST / TABLE
  // =========================================================
  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">FAQ</h1>
      </div>

      {/* FAQ CATEGORY */}
      <section className="overflow-hidden rounded-md bg-white shadow-sm">
        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">FAQ</h2>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-5">
          {/* TAMBAH KATEGORI */}
          <button
            type="button"
            onClick={handleAdd}
            className="mb-4 flex items-center gap-1 rounded-md bg-[#FDCB01] px-4 py-2 text-[10px] font-bold text-black transition hover:brightness-95"
          >
            <Plus size={13} />
            Tambah Kategori
          </button>

          {/* TABLE */}
          <div className="overflow-hidden rounded-lg border border-[#D0D0D0] shadow-sm">
            <table className="w-full border-collapse !text-center">
              <thead>
                <tr className="bg-[#F8F3E7]">
                  <th className="w-[80px] border-b border-r border-[#D0D0D0] px-4 py-3 !text-center text-[12px] font-bold text-[#222]">
                    No.
                  </th>

                  <th className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center text-[12px] font-bold text-[#222]">
                    Nama Kategori
                  </th>

                  <th className="w-[180px] border-b border-r border-[#D0D0D0] px-4 py-3 !text-center text-[12px] font-bold text-[#222]">
                    Total FAQ
                  </th>

                  <th className="w-[220px] border-b border-[#D0D0D0] px-4 py-3 !text-center text-[12px] font-bold text-[#222]">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="transition hover:bg-[#FFFDF5]"
                  >
                    {/* NO */}
                    <td className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle !text-[12px] text-[#555]">
                      {index + 1}
                    </td>

                    {/* NAMA KATEGORI */}
                    <td className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle !text-[12px] font-medium text-[#444]">
                      {category.name}
                    </td>

                    {/* TOTAL FAQ */}
                    <td className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle">
                      <button
                        type="button"
                        onClick={() => handleTotalFAQ(category)}
                        className="rounded-full bg-[#A8D3FF] px-3 py-1 text-[12px] font-extrabold text-[#1557B0] transition hover:brightness-95"
                      >
                        {category.totalFAQ} FAQ
                      </button>
                    </td>

                    {/* AKSI */}
                    <td className="border-b border-[#D0D0D0] px-4 py-3 !text-center align-middle">
                      <div className="flex items-center justify-center gap-2">
                        {/* EDIT */}
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="rounded-full bg-[#FFD000] px-5 py-1.5 text-[11px] font-bold text-black transition hover:brightness-95"
                        >
                          Edit
                        </button>

                        {/* HAPUS */}
                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          className="rounded-full bg-[#FF0000] px-5 py-1.5 text-[11px] font-bold text-black transition hover:brightness-95"
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
        </div>
      </section>

      {/* DELETE MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[3px]">
          <div className="w-full max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#E5E5E5] px-8 py-5">
              <h3 className="text-[22px] font-extrabold text-[#172033]">
                Hapus
              </h3>

              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="text-[30px] font-light leading-none text-[#4B5563] transition hover:text-black"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-8 py-6">
              <p className="mb-3 text-[16px] font-extrabold text-[#172033]">
                Apakah anda yakin ingin menghapus data ini?
              </p>

              <p className="text-[14px] text-[#667085]">
                Jika data dihapus makan akan hilang secara permanen
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex items-center gap-4 px-8 pb-7">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="rounded-lg bg-[#FDCB01] px-7 py-3 text-[14px] font-bold text-black transition hover:brightness-95"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-[#FF0000] px-7 py-3 text-[14px] font-bold text-white transition hover:brightness-95"
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

export default FAQCategory;
