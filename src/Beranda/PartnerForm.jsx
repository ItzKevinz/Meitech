import { useState, useRef } from 'react';
import { Save, X } from 'lucide-react';

const PartnerForm = () => {
  // State form utama (Judul & Footer)
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    footer_text: '',
    footer_text_en: ''
  });

  // State daftar mitra dummy
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: 'PLN',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_PLN.png'
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
    }
  ]);

  // State untuk kontrol form Tambah/Edit Mitra
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState(null);
  const [partnerInput, setPartnerInput] = useState({
    name: '',
    logoFile: null
  });
  const [partnerLogoPreview, setPartnerLogoPreview] = useState(null);

  // State untuk Modal Hapus Custom
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingPartnerId, setDeletingPartnerId] = useState(null);

  // Ref untuk pemicu input file
  const fileInputRef = useRef(null);

  // Handler input form utama
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler Buka Form Tambah Mitra
  const handleOpenAddPartner = () => {
    setEditingPartnerId(null);
    setPartnerInput({ name: '', logoFile: null });
    setPartnerLogoPreview(null);
    setShowPartnerModal(true);
  };

  // Handler Buka Form Edit Mitra
  const handleOpenEditPartner = (partner) => {
    setEditingPartnerId(partner.id);
    setPartnerInput({ name: partner.name, logoFile: null });
    setPartnerLogoPreview(partner.logo);
    setShowPartnerModal(true);
  };

  // Handler Buka Modal Hapus Custom
  const handleOpenDeleteModal = (id) => {
    setDeletingPartnerId(id);
    setShowDeleteModal(true);
  };

  // Handler Eksekusi Hapus Mitra
  const handleConfirmDelete = () => {
    if (deletingPartnerId) {
      setPartners((prev) => prev.filter((p) => p.id !== deletingPartnerId));
      setShowDeleteModal(false);
      setDeletingPartnerId(null);
    }
  };

  // Handler klik tombol Choose a File -> Buka File Explorer
  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handler setelah memilih file gambar logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPartnerInput((prev) => ({ ...prev, logoFile: file }));
      setPartnerLogoPreview(URL.createObjectURL(file));
    }
  };

  // Handler simpan mitra baru / update mitra
  const handleSavePartner = (e) => {
    e.preventDefault();
    if (!partnerInput.name.trim()) {
      alert('Nama mitra wajib diisi!');
      return;
    }

    if (editingPartnerId) {
      // Edit mode
      setPartners((prev) =>
        prev.map((item) =>
          item.id === editingPartnerId
            ? {
                ...item,
                name: partnerInput.name,
                logo: partnerLogoPreview || item.logo
              }
            : item
        )
      );
    } else {
      // Tambah mode
      const newPartner = {
        id: Date.now(),
        name: partnerInput.name,
        logo:
          partnerLogoPreview ||
          'https://via.placeholder.com/150?text=Logo+Mitra'
      };
      setPartners((prev) => [...prev, newPartner]);
    }

    setShowPartnerModal(false);
  };

  // Handler Simpan Keseluruhan Form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Mitra Keseluruhan:', { formData, partners });
    alert('Data Beranda Mitra berhasil disimpan!');
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans relative">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Header 'Beranda' */}
        <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm text-left">
          <h1 className="m-0 text-3xl font-bold text-black tracking-tight">Beranda</h1>
        </div>

        {/* Card Utama 'Mitra' */}
        <div className="bg-white rounded-xl p-8 shadow-sm text-left">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Mitra</h2>
          <hr className="border-t border-[#EAEAEA] mb-8" />

          {/* JIKA MODAL TAMBAH/EDIT MITRA SEDANG DIBUKA */}
          {showPartnerModal ? (
            <div className="flex flex-col gap-6 w-full">
              {/* Form Input Nama Mitra */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                  NAMA MITRA
                </label>
                <input
                  type="text"
                  value={partnerInput.name}
                  onChange={(e) =>
                    setPartnerInput((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Masukan nama mitra"
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                />
              </div>

              {/* Logo Mitra / Choose File */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                  LOGO MITRA
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2.5 flex items-center gap-4 shadow-inner">
                  <button
                    type="button"
                    onClick={handleChooseFileClick}
                    className="bg-[#FFD600] hover:bg-[#e6c200] text-black border-none rounded-xl px-6 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Choose a file
                  </button>

                  {partnerLogoPreview ? (
                    <img
                      src={partnerLogoPreview}
                      alt="Preview Logo"
                      className="h-9 rounded object-contain"
                    />
                  ) : (
                    <span className="text-xs text-[#777777]">
                      {partnerInput.logoFile
                        ? partnerInput.logoFile.name
                        : 'No file choosen'}
                    </span>
                  )}
                </div>
              </div>

              {/* Tombol Simpan Mitra (Warna #7EC07E) */}
              <div className="flex justify-end items-center mt-2">
                <button
                  type="button"
                  onClick={handleSavePartner}
                  className="inline-flex items-center gap-2 bg-[#7EC07E] hover:bg-[#6EB06E] text-[#0D2B14] font-bold text-sm px-6 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Save size={16} className="stroke-[2.5]" />
                  Simpan
                </button>
              </div>
            </div>
          ) : (
            /* TAMPILAN UTAMA (FORM HEADER + TEKS FOOTER + TABEL MITRA FLEXBOX) */
            <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
              {/* Field 1: JUDUL */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                  JUDUL
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukan judul section"
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                />
              </div>

              {/* Field 2: JUDUL DALAM BAHASA INGGRIS */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                  JUDUL DALAM BAHASA INGGRIS
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleChange}
                  placeholder="Masukan judul section"
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                />
              </div>

              {/* Field 3: TEKS FOOTER */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                  TEKS FOOTER
                </label>
                <textarea
                  name="footer_text"
                  value={formData.footer_text}
                  onChange={handleChange}
                  placeholder="Masukan teks footer dibawah mitra"
                  rows={5}
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                />
              </div>

              {/* Field 4: TEKS FOOTER DALAM BAHASA INGGRIS */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                  TEKS FOOTER DALAM BAHASA INGGRIS
                </label>
                <textarea
                  name="footer_text_en"
                  value={formData.footer_text_en}
                  onChange={handleChange}
                  placeholder="Masukan teks footer dibawah mitra"
                  rows={5}
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                />
              </div>

              {/* Area Tambah Mitra & Tabel */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={handleOpenAddPartner}
                    className="inline-flex items-center justify-center bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Tambah mitra baru
                  </button>
                </div>

                {/* STRUKTUR TABEL MITRA BERBASIS FLEXBOX (ANTI-GESER & PRESISI) */}
                <div className="border border-[#D1D5DB] rounded-2xl overflow-hidden bg-white w-full shadow-xs mt-2">
                  
                  {/* HEADER FLEX */}
                  <div className="bg-[#F7F3E9] border-b border-[#EAEAEA] flex items-center px-6 py-3.5 font-bold text-black text-sm">
                    <div className="w-[10%] text-left">No</div>
                    <div className="w-[30%] text-left">Logo mitra</div>
                    <div className="w-[40%] text-left">Nama mitra</div>
                    <div className="w-[20%] text-center">Aksi</div>
                  </div>

                  {/* ITEM BARIS FLEX */}
                  <div className="divide-y divide-[#E0E0E0]">
                    {partners.map((partner, index) => (
                      <div
                        key={partner.id}
                        className="flex items-center px-6 py-4 hover:bg-gray-50/80 transition-colors text-sm text-gray-800"
                      >
                        {/* No */}
                        <div className="w-[10%] text-left font-normal">
                          {index + 1}.
                        </div>

                        {/* Logo Mitra */}
                        <div className="w-[30%] text-left flex items-center">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-9 w-auto max-w-[130px] object-contain"
                          />
                        </div>

                        {/* Nama Mitra */}
                        <div className="w-[40%] text-left font-normal">
                          {partner.name}
                        </div>

                        {/* Aksi */}
                        <div className="w-[20%] flex items-center justify-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditPartner(partner)}
                            className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-semibold text-xs px-5 py-2 rounded-xl transition-all cursor-pointer shadow-none"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteModal(partner.id)}
                            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold text-xs px-5 py-2 rounded-xl transition-all cursor-pointer shadow-none"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Tombol Simpan Utama (Warna #7EC07E) */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#7EC07E] hover:bg-[#6EB06E] text-[#0D2B14] px-5 py-2 rounded-lg font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Save size={16} className="mr-2 stroke-[2.5]" />
                  Simpan
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

      {/* MODAL HAPUS CUSTOM */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[580px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            {/* Header Modal Hapus */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#111827] m-0">Hapus</h3>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="text-[#374151] hover:text-black transition-colors cursor-pointer border-none bg-transparent p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Isi Konfirmasi */}
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-bold text-[#111827] m-0">
                  Apakah anda yakin ingin menghapus data ini?
                </h4>
                <p className="text-sm text-[#4B5563] m-0">
                  Jika data dihapus makan akan hilang secara permanen
                </p>
              </div>

              {/* Tombol Aksi Modal */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-[#FDE047] hover:bg-[#facc15] text-[#111827] font-semibold text-sm px-6 py-2.5 rounded-lg border-none cursor-pointer transition-all shadow-xs"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="bg-[#FF0000] hover:bg-[#dc2626] text-white font-semibold text-sm px-6 py-2.5 rounded-lg border-none cursor-pointer transition-all shadow-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PartnerForm;