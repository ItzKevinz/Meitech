import { useState, useRef } from 'react';
import { Save } from 'lucide-react';

const ContactTeamForm = () => {
  const [formData, setFormData] = useState({
    section_title: '',
    section_title_en: '',
    description: '',
    description_en: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data tersimpan:', formData);
    alert('Data Hubungi Tim berhasil disimpan!');
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Header Beranda */}
        <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm text-left">
          <h1 className="m-0 text-3xl font-bold text-black tracking-tight">Beranda</h1>
        </div>

        {/* Card Hubungi Tim */}
        <div className="bg-white rounded-xl p-8 shadow-sm text-left">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Hubungi Tim</h2>
          <hr className="border-t border-[#EAEAEA] mb-8" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                JUDUL SECTION
              </label>
              <input
                type="text"
                name="section_title"
                value={formData.section_title}
                onChange={handleChange}
                placeholder="Masukan judul"
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                JUDUL DALAM BAHASA INGGRIS
              </label>
              <input
                type="text"
                name="section_title_en"
                value={formData.section_title_en}
                onChange={handleChange}
                placeholder="Masukan judul"
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                DESKRIPSI
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Input deskripsi untuk konsultasi"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                DESKRIPSI DALAM BAHASA INGGRIS
              </label>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                placeholder="Input deskripsi untuk konsultasi"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                GAMBAR UTAMA
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

                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="h-10 rounded object-cover" />
                ) : (
                  <span className="text-xs text-[#777777]">
                    {formData.image ? formData.image.name : 'No file chosen'}
                  </span>
                )}
              </div>
            </div>

            {/* Tombol Simpan Kompak */}
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
        </div>

      </div>
    </div>
  );
};

export default ContactTeamForm;