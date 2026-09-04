import { useState } from 'react';
import { Save } from 'lucide-react';

const LokasiSettings = () => {
  // State untuk menampung input form Lokasi 
  const [settingsInput, setSettingsInput] = useState({
    mainTitle: '',
    mainTitleEn: '',
    subtitle: '',
    subtitleEn: '',
    bottomText: '',
    bottomTextEn: ''
  });

  // Handler untuk mengubah nilai input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettingsInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler untuk menyimpan data Lokasi Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    console.log('Data Lokasi Settings Disimpan:', settingsInput);
    alert('Data Lokasi Settings berhasil disimpan!');
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full text-left">
      <div className="w-full flex flex-col gap-6">

        {/* Header Title 'Lokasi Settings' */}
        <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm w-full">
          <h1 className="m-0 text-2xl md:text-3xl font-bold text-black tracking-tight">
            Lokasi Settings
          </h1>
        </div>

        {/* Card Form Utama */}
        <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col gap-6 w-full">
          
          <form onSubmit={handleSaveSettings} className="flex flex-col gap-6 w-full">
            
            {/* 1. MAIN TITLE */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                MAIN TITLE
              </label>
              <input
                type="text"
                name="mainTitle"
                value={settingsInput.mainTitle}
                onChange={handleInputChange}
                placeholder="Masukan judul section"
                className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
              />
            </div>

            {/* 2. MAIN TITLE DALAM BAHASA INGGRIS */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-xs font-bold italic leading-4 tracking-[0.6px] text-[#555555] uppercase">
                MAIN TITLE DALAM BAHASA INGGRIS
              </label>
              <input
                type="text"
                name="mainTitleEn"
                value={settingsInput.mainTitleEn}
                onChange={handleInputChange}
                placeholder="Masukan judul section menggunakan Bahasa inggris"
                className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
              />
            </div>

            {/* 3. SUBTITLE */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                SUBTITLE
              </label>
              <input
                type="text"
                name="subtitle"
                value={settingsInput.subtitle}
                onChange={handleInputChange}
                placeholder="Masukan subjudul section"
                className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
              />
            </div>

            {/* 4. SUBTITLE PAKAI BAHASA INGGRIS */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-xs font-bold italic leading-4 tracking-[0.6px] text-[#555555] uppercase">
                SUBTITLE PAKAI BAHASA INGGRIS
              </label>
              <input
                type="text"
                name="subtitleEn"
                value={settingsInput.subtitleEn}
                onChange={handleInputChange}
                placeholder="Masukan subjudul section"
                className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
              />
            </div>

            {/* 5. BOTTOM TEXT */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                BOTTOM TEXT
              </label>
              <input
                type="text"
                name="bottomText"
                value={settingsInput.bottomText}
                onChange={handleInputChange}
                placeholder="Masukan Bottom Text"
                className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
              />
            </div>

            {/* 6. BOTTOM TEXT BAHASA INGGRIS */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-xs font-bold italic leading-4 tracking-[0.6px] text-[#555555] uppercase">
                BOTTOM TEXT BAHASA INGGRIS
              </label>
              <input
                type="text"
                name="bottomTextEn"
                value={settingsInput.bottomTextEn}
                onChange={handleInputChange}
                placeholder="Masukan Bottom Text dalam bahasa inggris"
                className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
              />
            </div>

            <div className="flex justify-start mt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#FFD600] hover:bg-[#e6c200] text-black font-semibold text-sm px-7 py-3 rounded-xl shadow-xs transition-all cursor-pointer border-none"
              >
                <Save size={16} />
                Simpan
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default LokasiSettings;