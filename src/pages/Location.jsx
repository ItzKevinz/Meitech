import { useState } from "react";
import { Save } from "lucide-react";

const Location = () => {
  const [formData, setFormData] = useState({
    mainTitle: "",
    mainTitleEn: "",
    subtitle: "",
    subtitleEn: "",
    bottomText: "",
    bottomTextEn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data Lokasi:", formData);
    alert("Pengaturan Lokasi berhasil disimpan!");
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Lokasi
        </h1>
      </div>

      {/* LOCATION SETTINGS */}
      <section className="overflow-hidden rounded-md bg-white shadow-sm">
        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">
            Lokasi Settings
          </h2>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-16 py-5"
        >
          {/* MAIN TITLE */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              MAIN TITLE
            </label>

            <input
              type="text"
              name="mainTitle"
              value={formData.mainTitle}
              onChange={handleChange}
              placeholder="Masukan judul section"
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
            />
          </div>

          {/* MAIN TITLE EN */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
              MAIN TITLE DALAM BAHASA INGGRIS
            </label>

            <input
              type="text"
              name="mainTitleEn"
              value={formData.mainTitleEn}
              onChange={handleChange}
              placeholder="Masukan judul section menggunakan Bahasa Inggris"
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
            />
          </div>

          {/* SUBTITLE */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              SUBTITLE
            </label>

            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Masukan subjudul section"
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
            />
          </div>

          {/* SUBTITLE EN */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
              SUBTITLE DALAM BAHASA INGGRIS
            </label>

            <input
              type="text"
              name="subtitleEn"
              value={formData.subtitleEn}
              onChange={handleChange}
              placeholder="Masukan subjudul section"
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
            />
          </div>

          {/* BOTTOM TEXT */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              BOTTOM TEXT
            </label>

            <input
              type="text"
              name="bottomText"
              value={formData.bottomText}
              onChange={handleChange}
              placeholder="Masukan Bottom Text"
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
            />
          </div>

          {/* BOTTOM TEXT EN */}
          <div className="mb-7">
            <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
              BOTTOM TEXT DALAM BAHASA INGGRIS
            </label>

            <input
              type="text"
              name="bottomTextEn"
              value={formData.bottomTextEn}
              onChange={handleChange}
              placeholder="Masukan Bottom Text dalam bahasa Inggris"
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
            />
          </div>

          {/* SIMPAN */}
          <button
            type="submit"
            className="flex items-center gap-1 rounded-md bg-[#FDCB01] px-4 py-2 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
          >
            <Save size={12} />
            Simpan
          </button>
        </form>
      </section>
    </div>
  );
};

export default Location;