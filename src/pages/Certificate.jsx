import { useState } from "react";
import { Save, Plus, Pencil, Trash2, Eye } from "lucide-react";
import certificate1 from "../assets/certificate/certificate.jpg";
import certificate2 from "../assets/certificate/certificate2.jpg";
import certificate3 from "../assets/certificate/certificate3.jpg";
import certificate4 from "../assets/certificate/certificate4.jpg";
import certificate5 from "../assets/certificate/certificate5.jpg";
import certificate6 from "../assets/certificate/certificate6.jpg";

const Certificate = ({ onNavigate }) => {
  const [titleData, setTitleData] = useState({
    title: "Sertifikat dan Standar Mutu",
    subtitle: "Bukti legalitas dan jaminan kualitas manufaktur kami",
    title_en: "Sertifikat dan Standar Mutu",
    subtitle_en: "Bukti legalitas dan jaminan kualitas manufaktur kami",
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: "ISO 9001:2015",
      field: "Quality Management System",
      description:
        "Standar Internasional untuk Sistem Manajemen Mutu dalam proses manufaktur.",
      image: certificate1,
    },
    {
      id: 2,
      name: "ISO 14001:2015",
      field: "Environmental Management System",
      description:
        "Komitmen terhadap manajemen lingkungan dan pengurangan dampak industri.",
      image: certificate2,
    },
    {
      id: 3,
      name: "ISO45001:2018",
      field: "Occupational Health & Safety",
      description:
        "Sertifikasi kesehatan dan keselamatan kerja untuk menjamin keamanan personil.",
      image: certificate3,
    },
    {
      id: 4,
      name: "Sertifikat TKDN",
      field: "Panel Box Superson",
      description: "Bukti tingkat komponen strategis nasional.",
      image: certificate4,
    },
    {
      id: 5,
      name: "Surat Terpilih PT PLN",
      field: "Electrical Equipment",
      description: "Pengakuan sebagai penyedia terpercaya kelistrikan PLN.",
      image: certificate5,
    },
    {
      id: 6,
      name: "Sertifikat AESI",
      field: "Solar Energy Membership",
      description:
        "Keanggotaan aktif dalam asosiasi untuk pengembangan energi surya nasional.",
      image: certificate6,
    },
  ]);

  const handleTitleChange = (e) => {
    const { name, value } = e.target;

    setTitleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTitle = (e) => {
    e.preventDefault();

    console.log("Title Sertifikat:", titleData);
    alert("Title Sertifikat berhasil disimpan!");
  };

const handleAdd = () => {
  onNavigate("certificate-add");
};

  const handleDetail = (certificate) => {
    onNavigate("certificate-detail", certificate);
  };

  const handleEdit = (certificate) => {
    onNavigate("certificate-edit", certificate);
  };

  const handleDelete = (id) => {
    setSelectedCertificateId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setCertificates((prev) =>
      prev.filter((certificate) => certificate.id !== selectedCertificateId),
    );

    setSelectedCertificateId(null);
    setDeleteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Sertifikat
        </h1>
      </div>

      {/* TITLE SETTING */}
      <section className="mb-4 overflow-hidden rounded-md bg-white shadow-sm">
        <div className="border-b border-[#e5e5e5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">
            Title Setting
          </h2>
        </div>

        <form onSubmit={handleSaveTitle} className="space-y-3 px-6 py-4">
          {/* TITLE */}
          <div>
            <label className="mb-1 block text-[7px] font-bold uppercase text-[#333]">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={titleData.title}
              onChange={handleTitleChange}
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2 text-[10px] text-[#333] outline-none"
            />
          </div>

          {/* SUB TITLE */}
          <div>
            <label className="mb-1 block text-[7px] font-bold uppercase text-[#333]">
              Sub-title
            </label>

            <input
              type="text"
              name="subtitle"
              value={titleData.subtitle}
              onChange={handleTitleChange}
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2 text-[10px] text-[#333] outline-none"
            />
          </div>

          {/* TITLE EN */}
          <div>
            <label className="mb-1 block text-[7px] font-bold uppercase text-[#333]">
              Title Pakai Bahasa Inggris
            </label>

            <input
              type="text"
              name="title_en"
              value={titleData.title_en}
              onChange={handleTitleChange}
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2 text-[10px] text-[#333] outline-none"
            />
          </div>

          {/* SUB TITLE EN */}
          <div>
            <label className="mb-1 block text-[7px] font-bold uppercase text-[#333]">
              Sub-title
            </label>

            <input
              type="text"
              name="subtitle_en"
              value={titleData.subtitle_en}
              onChange={handleTitleChange}
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2 text-[10px] text-[#333] outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-1 flex items-center gap-1 rounded-md bg-[#7FC97F] px-4 py-2 text-[9px] font-bold text-black transition hover:brightness-95"
          >
            <Save size={12} />
            Simpan
          </button>
        </form>
      </section>

      {/* ALL CERTIFICATES */}
      <section className="overflow-hidden rounded-md bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="mb-3 text-[16px] font-bold text-[#171717]">
            Semua sertifikat
          </h2>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-1 rounded-md bg-[#FDCB01] px-3 py-2 text-[9px] font-bold text-black transition hover:brightness-95"
          >
            <Plus size={12} />
            Tambah Sertifikat
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full border-collapse border border-[#D9D9D9] !text-center">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="w-[55px] border border-[#D9D9D9] px-3 py-3 !text-center text-[10px] font-extrabold text-[#222]">
                  No.
                </th>

                <th className="w-[160px] border border-[#D9D9D9] px-3 py-3 !text-center text-[10px] font-extrabold text-[#222]">
                  Nama
                </th>

                <th className="w-[170px] border border-[#D9D9D9] px-3 py-3 !text-center text-[10px] font-extrabold text-[#222]">
                  Bidang
                </th>

                <th className="w-[260px] border border-[#D9D9D9] px-3 py-3 !text-center text-[10px] font-extrabold text-[#222]">
                  Deskripsi Produk
                </th>

                <th className="w-[100px] border border-[#D9D9D9] px-3 py-3 !text-center text-[10px] font-extrabold text-[#222]">
                  Gambar
                </th>

                <th className="w-[170px] border border-[#D9D9D9] px-3 py-3 !text-center text-[10px] font-extrabold text-[#222]">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {certificates.map((certificate, index) => (
                <tr
                  key={certificate.id}
                  className="transition hover:bg-[#FFFDF5]"
                >
                  <td className="border border-[#D9D9D9] px-3 py-5 !text-center align-middle text-[10px] font-medium text-[#444]">
                    {index + 1}
                  </td>

                  <td className="border border-[#D9D9D9] px-3 py-5 !text-center align-middle text-[10px] font-semibold text-[#333]">
                    {certificate.name}
                  </td>
                  <td className="border border-[#D9D9D9] px-3 py-5 !text-center align-middle text-[10px] text-[#444]">
                    {certificate.field}
                  </td>

                  <td className="border border-[#D9D9D9] px-4 py-5 !text-center align-middle text-[10px] leading-5 text-[#555]">
                    {certificate.description}
                  </td>

                  <td className="border border-[#D9D9D9] px-3 py-4 !text-center align-middle">
                    <div className="flex justify-center">
                      <img
                        src={certificate.image}
                        alt={certificate.name}
                        className="h-[70px] w-[55px] object-contain"
                      />
                    </div>
                  </td>

                  <td className="border border-[#D9D9D9] px-3 py-5 !text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
  {/* DETAIL */}
  <button
    type="button"
    onClick={() => handleDetail(certificate)}
    className="flex items-center gap-1 rounded-md bg-[#138AD9] px-4 py-2 text-[11px] font-bold text-black shadow-sm transition hover:brightness-95"
  >
    <Eye size={11} />
    Detail
  </button>

  {/* EDIT */}
  <button
    type="button"
    onClick={() => handleEdit(certificate)}
    className="flex items-center gap-1 rounded-md bg-[#FFC107] px-4 py-2 text-[11px] font-bold text-black shadow-sm transition hover:brightness-95"
  >
    <Pencil size={11} />
    Edit
  </button>

  {/* DELETE */}
  <button
    type="button"
    onClick={() => handleDelete(certificate.id)}
    className="flex items-center gap-1 rounded-md bg-[#DC3545] px-4 py-2 text-[11px] font-bold text-black shadow-sm transition hover:brightness-95"
  >
    <Trash2 size={11} />
    Delete
  </button>
</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-[540px] overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#E5E5E5] px-7 py-5">
              <h3 className="text-[21px] font-bold text-[#333]">Hapus</h3>

              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setSelectedCertificateId(null);
                }}
                className="text-[#555] transition hover:text-black"
              >
                <span className="text-[30px] font-light leading-none">×</span>
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-7 py-7">
              <p className="mb-4 text-[16px] font-medium text-[#444]">
                Apakah anda yakin akan menghapus data?
              </p>

              <p className="text-[13px] leading-5 text-[#999]">
                Jika data dihapus, maka akan hilang secara permanen
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-start gap-3 px-7 pb-6">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setSelectedCertificateId(null);
                }}
                className="rounded-md bg-[#F4A261] px-5 py-3 text-[13px] font-bold text-white transition hover:brightness-95"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-md bg-[#EF3340] px-5 py-3 text-[13px] font-bold text-white transition hover:brightness-95"
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

export default Certificate;
