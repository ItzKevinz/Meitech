import { useState, useRef } from 'react';
import { Save, Plus } from 'lucide-react';

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    footer_text: '',
    footer_text_en: ''
  });

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

  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState(null);
  const [partnerInput, setPartnerInput] = useState({
    name: '',
    logoFile: null
  });
  const [partnerLogoPreview, setPartnerLogoPreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOpenAddPartner = () => {
    setEditingPartnerId(null);
    setPartnerInput({ name: '', logoFile: null });
    setPartnerLogoPreview(null);
    setShowPartnerModal(true);
  };

  const handleOpenEditPartner = (partner) => {
    setEditingPartnerId(partner.id);
    setPartnerInput({ name: partner.name, logoFile: null });
    setPartnerLogoPreview(partner.logo);
    setShowPartnerModal(true);
  };

  const handleDeletePartner = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPartnerInput((prev) => ({ ...prev, logoFile: file }));
      setPartnerLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSavePartner = (e) => {
    e.preventDefault();
    if (!partnerInput.name.trim()) {
      alert('Nama mitra wajib diisi!');
      return;
    }

    if (editingPartnerId) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Mitra Keseluruhan:', { formData, partners });
    alert('Data Beranda Mitra berhasil disimpan!');
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Header Beranda */}
        <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm text-left">
          <h1 className="m-0 text-3xl font-bold text-black tracking-tight">Beranda</h1>
        </div>

        {/* Card Utama Mitra */}
        <div className="bg-white rounded-xl p-8 shadow-sm text-left">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Mitra</h2>
          <hr className="border-t border-[#EAEAEA] mb-8" />

          {showPartnerModal ? (
            <div className="flex flex-col gap-6 w-full">
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
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
                />
              </div>

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
                    className="bg-[#FFD600] hover:bg-[#e6c200] text-black border-none rounded-lg px-5 py-2 text-xs font-bold transition-all shadow-sm cursor-pointer"
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

              {/* Tombol Simpan Mitra Kompak */}
              <div className="flex justify-end items-center mt-2">
                <button
                  type="button"
                  onClick={handleSavePartner}
                  className="inline-flex items-center gap-1.5 bg-[#72C182] hover:bg-[#62b172] text-[#0D2B14] font-bold text-sm px-5 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Save size={16} /> Simpan Mitra
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
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
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
                />
              </div>

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
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
                />
              </div>

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
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
                />
              </div>

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
                  className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
                />
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={handleOpenAddPartner}
                    className="inline-flex items-center gap-1.5 bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Plus size={16} className="stroke-[2.5]" />
                    Tambah mitra baru
                  </button>
                </div>

                <div className="border border-[#E0E0E0] rounded-xl overflow-hidden shadow-sm bg-white">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-[#F7F3E9] border-b border-[#E0E0E0]">
                        <th className="py-3.5 px-6 font-bold text-black w-16">No</th>
                        <th className="py-3.5 px-6 font-bold text-black">Logo mitra</th>
                        <th className="py-3.5 px-6 font-bold text-black">Nama mitra</th>
                        <th className="py-3.5 px-6 font-bold text-black text-center w-48">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E0E0]">
                      {partners.map((partner, index) => (
                        <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-gray-700 font-medium">{index + 1}.</td>
                          <td className="py-4 px-6">
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              className="h-8 object-contain max-w-[120px]"
                            />
                          </td>
                          <td className="py-4 px-6 text-gray-800 font-medium">{partner.name}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditPartner(partner)}
                                className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-semibold text-xs px-5 py-2 rounded-lg transition-all cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePartner(partner.id)}
                                className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold text-xs px-5 py-2 rounded-lg transition-all cursor-pointer"
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

              {/* Tombol Simpan Utama Kompak */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#72C182] hover:bg-[#62b172] text-[#0D2B14] px-5 py-2 rounded-lg font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Save size={16} className="mr-2 stroke-[2.5]" />
                  Simpan
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default PartnerForm;