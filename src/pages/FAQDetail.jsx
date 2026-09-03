import { useState } from "react";
import { Save } from "lucide-react";

const FAQDetail = ({ categories, setCategories, onNavigate }) => {
  const [mode, setMode] = useState("list");
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      categoryId: 1,
      question: "Apakah?",
      answer: "Itu Adalah...",
      question_en: "",
      answer_en: "",
    },
    {
      id: 2,
      categoryId: 2,
      question: "Apakah?",
      answer: "Itu Adalah...",
      question_en: "",
      answer_en: "",
    },
    {
      id: 3,
      categoryId: 3,
      question: "Apakah?",
      answer: "Itu Adalah...",
      question_en: "",
      answer_en: "",
    },
    {
      id: 4,
      categoryId: 4,
      question: "Apakah?",
      answer: "Itu Adalah...",
      question_en: "",
      answer_en: "",
    },
  ]);

  const [formData, setFormData] = useState({
    categoryId: "",
    question: "",
    answer: "",
    question_en: "",
    answer_en: "",
  });

  const handleDetail = (faq) => {
  setSelectedFAQ(faq);
  setMode("detail");
};

const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedFAQId, setSelectedFAQId] = useState(null);

const handleDelete = (id) => {
  setSelectedFAQId(id);
  setDeleteModalOpen(true);
};

const handleConfirmDelete = () => {
  if (selectedFAQId === null) return;

  const deletedFAQ = faqs.find(
    (faq) => faq.id === selectedFAQId
  );

  setFaqs((prev) =>
    prev.filter((faq) => faq.id !== selectedFAQId)
  );

  if (deletedFAQ && setCategories) {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === deletedFAQ.categoryId
          ? {
              ...category,
              totalFAQ: Math.max(
                0,
                category.totalFAQ - 1
              ),
            }
          : category
      )
    );
  }

  setSelectedFAQId(null);
  setDeleteModalOpen(false);
};

const handleCloseDeleteModal = () => {
  setSelectedFAQId(null);
  setDeleteModalOpen(false);
};

const handleEdit = (faq) => {
  setSelectedFAQ(faq);

  setFormData({
    categoryId: String(faq.categoryId),
    question: faq.question,
    answer: faq.answer,
    question_en: faq.question_en,
    answer_en: faq.answer_en,
  });

  setMode("edit");
};
  // =========================
  // TAMBAH FAQ
  // =========================
  const handleAdd = () => {
    setFormData({
      categoryId: "",
      question: "",
      answer: "",
      question_en: "",
      answer_en: "",
    });

    setMode("add");
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
  // SIMPAN FAQ
  // =========================
const handleSubmit = (e) => {
  e.preventDefault();

  if (mode === "edit") {
    const oldCategoryId = selectedFAQ.categoryId;
    const newCategoryId = Number(formData.categoryId);

    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === selectedFAQ.id
          ? {
              ...faq,
              categoryId: newCategoryId,
              question: formData.question,
              answer: formData.answer,
              question_en: formData.question_en,
              answer_en: formData.answer_en,
            }
          : faq
      )
    );

    // Kalau kategorinya berubah, update total FAQ masing-masing kategori
    if (setCategories && oldCategoryId !== newCategoryId) {
      setCategories((prev) =>
        prev.map((category) => {
          if (category.id === oldCategoryId) {
            return {
              ...category,
              totalFAQ: Math.max(0, category.totalFAQ - 1),
            };
          }

          if (category.id === newCategoryId) {
            return {
              ...category,
              totalFAQ: category.totalFAQ + 1,
            };
          }

          return category;
        })
      );
    }

    alert("FAQ berhasil diperbarui!");

    setSelectedFAQ(null);
    setMode("list");

    return;
  }

  // ADD
  const newFAQ = {
    id: Date.now(),
    categoryId: Number(formData.categoryId),
    question: formData.question,
    answer: formData.answer,
    question_en: formData.question_en,
    answer_en: formData.answer_en,
  };

  setFaqs((prev) => [...prev, newFAQ]);

  if (setCategories) {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === Number(formData.categoryId)
          ? {
              ...category,
              totalFAQ: category.totalFAQ + 1,
            }
          : category
      )
    );
  }

  alert("FAQ berhasil ditambahkan!");

  setMode("list");
  setFormData({
    categoryId: "",
    question: "",
    answer: "",
    question_en: "",
    answer_en: "",
  });
};

  // =========================
  // KEMBALI
  // =========================
  const handleBack = () => {
    setMode("list");

    setFormData({
      categoryId: "",
      question: "",
      answer: "",
      question_en: "",
      answer_en: "",
    });
  };

  // =========================
  // NAMA KATEGORI
  // =========================
  const getCategoryName = (categoryId) => {
    const category = categories.find((item) => item.id === categoryId);

    return category ? category.name : "-";
  };

  if (mode === "detail" && selectedFAQ) {
  const categoryName = getCategoryName(selectedFAQ.categoryId);

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          FAQ
        </h1>
      </div>

      {/* DETAIL CARD */}
      <section className="overflow-hidden rounded-md bg-white shadow-sm">
        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">
            Detail
          </h2>
        </div>

        {/* CONTENT */}
        <div className="px-16 py-9">
          <div className="grid grid-cols-2 gap-x-16">

            {/* LEFT */}
            <div className="space-y-4">
              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Pertanyaan
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {selectedFAQ.question}
                </span>
              </div>

              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Jawaban
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {selectedFAQ.answer}
                </span>
              </div>

              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Kategori
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {categoryName}
                </span>
              </div>

              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Dibuat
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {selectedFAQ.date || "03/April/2026"}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <div className="mb-2 text-[14px] font-semibold text-[#555]">
                Dalam Bahasa Inggris
              </div>

              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Question
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {selectedFAQ.question_en || "-"}
                </span>
              </div>

              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Answer
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {selectedFAQ.answer_en || "-"}
                </span>
              </div>

              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Category
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {categoryName}
                </span>
              </div>

              <div className="grid grid-cols-[95px_15px_1fr]">
                <span className="text-[14px] font-semibold text-[#555]">
                  Date
                </span>
                <span className="text-[14px] text-[#555]">
                  :
                </span>
                <span className="text-[14px] text-[#555]">
                  {selectedFAQ.date || "03/April/2026"}
                </span>
              </div>
            </div>

          </div>

          {/* KEMBALI */}
          <button
            type="button"
            onClick={() => {
              setMode("list");
              setSelectedFAQ(null);
            }}
            className="mt-12 rounded-md bg-[#E5E5E5] px-6 py-2.5 text-[11px] font-semibold text-[#333] shadow-sm transition hover:brightness-95"
          >
            Kembali
          </button>
        </div>
      </section>
    </div>
  );
}

  // =====================================================
  // FORM TAMBAH FAQ
  // =====================================================
  if (mode === "add" || mode === "edit") {
  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          FAQ
        </h1>
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
        <form
          onSubmit={handleSubmit}
          className="px-16 py-9"
        >
          {/* KATEGORI */}
          <div className="mb-8">
            <label className="mb-2 block text-[11px] font-semibold text-[#555]">
              Kategori
            </label>

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-4 py-3 text-[12px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
            >
              <option value="">Pilih kategori</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* PERTANYAAN */}
          <div className="mb-8">
            <label className="mb-2 block text-[11px] font-semibold text-[#555]">
              Pertanyaan
            </label>

            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-4 py-3 text-[12px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
            />
          </div>

          {/* JAWABAN */}
          <div className="mb-8">
            <label className="mb-2 block text-[11px] font-semibold text-[#555]">
              Jawaban
            </label>

            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-4 py-3 text-[12px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
            />
          </div>

          {/* PERTANYAAN INGGRIS */}
          <div className="mb-8">
            <label className="mb-2 block text-[11px] font-semibold text-[#555]">
              Pertanyaan dalam bahasa Inggris
            </label>

            <input
              type="text"
              name="question_en"
              value={formData.question_en}
              onChange={handleChange}
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-4 py-3 text-[12px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
            />
          </div>

          {/* JAWABAN INGGRIS */}
          <div className="mb-8">
            <label className="mb-2 block text-[11px] font-semibold text-[#555]">
              Jawaban dalam bahasa Inggris
            </label>

            <input
              type="text"
              name="answer_en"
              value={formData.answer_en}
              onChange={handleChange}
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

  // =====================================================
  // LIST FAQ
  // =====================================================
  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">FAQ</h1>
      </div>

      {/* FAQ DETAIL */}
      <section className="overflow-hidden rounded-md bg-white shadow-sm">
        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">FAQ</h2>
        </div>

        <div className="px-6 py-5">
          {/* TAMBAH FAQ */}
          <button
            type="button"
            onClick={handleAdd}
            className="mb-5 flex items-center gap-1 rounded-md bg-[#FDCB01] px-4 py-2 text-[10px] font-bold text-black transition hover:brightness-95"
          >
            + Tambah FAQ
          </button>

          {/* TABLE */}
          <div className="overflow-hidden rounded-lg border border-[#D0D0D0] shadow-sm">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#F8F3E7]">
                  <th className="w-[60px] border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle text-[12px] font-bold text-[#222]">
                    No
                  </th>

                  <th className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle text-[12px] font-bold text-[#222]">
                    Pertanyaan
                  </th>

                  <th className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle text-[12px] font-bold text-[#222]">
                    Jawaban
                  </th>

                  <th className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle text-[12px] font-bold text-[#222]">
                    Kategori
                  </th>

                  <th className="w-[220px] border-b border-[#D0D0D0] px-4 py-3 !text-center align-middle text-[12px] font-bold text-[#222]">
                    Aksi
                  </th>
                </tr>
              </thead>

<tbody>
  {faqs.map((faq, index) => (
    <tr
      key={faq.id}
      className="transition hover:bg-[#FFFDF5]"
    >
      {/* NO */}
      <td className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle !text-[13px] text-[#555]">
        {index + 1}
      </td>

      {/* PERTANYAAN */}
      <td className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle !text-[13px] text-[#666]">
        {faq.question}
      </td>

      {/* JAWABAN */}
      <td className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle !text-[13px] text-[#666]">
        {faq.answer}
      </td>

      {/* KATEGORI */}
      <td className="border-b border-r border-[#D0D0D0] px-4 py-3 !text-center align-middle !text-[13px] text-[#666]">
        {getCategoryName(faq.categoryId)}
      </td>

      {/* AKSI */}
      <td className="border-b border-[#D0D0D0] px-3 py-3 !text-center align-middle">
        <div className="flex items-center justify-center gap-1.5">
          {/* DETAIL */}
<button
  type="button"
  onClick={() => handleDetail(faq)}
  className="rounded-full bg-[#5A73E2] px-3.5 py-1 !text-[11px] font-bold text-black transition hover:brightness-95"
>
  Detail
</button>

{/* EDIT */}
<button
  type="button"
  onClick={() => handleEdit(faq)}
  className="rounded-full bg-[#FFD000] px-3.5 py-1 !text-[11px] font-bold text-black transition hover:brightness-95"
>
  Edit
</button>

{/* HAPUS */}
<button
  type="button"
  onClick={() => handleDelete(faq.id)}
  className="rounded-full bg-[#FF0000] px-3.5 py-1 !text-[11px] font-bold text-black transition hover:brightness-95"
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

export default FAQDetail;
