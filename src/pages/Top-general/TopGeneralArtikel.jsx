import { useRef, useState } from "react";
import { Save } from "lucide-react";
import ColorPicker from "../../components/ColorPicker";

const TopGeneralArtikel = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    judul: "",
    judulColor: "#FFFFFF",
    judulOpacity: 100,

    judulEn: "",

    deskripsi: "",
    deskripsiColor: "#FFFFFF",
    deskripsiOpacity: 100,

    deskripsiEn: "",

    background: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      background: imageUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data Top General Artikel:", formData);

    alert("Top General Artikel berhasil disimpan!");
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">

      {/* PAGE TITLE */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Top General
        </h1>
      </div>

      {/* ARTIKEL CARD */}
      <section className="rounded-md bg-white shadow-sm">

        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">
            Artikel
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-16 py-5">

          {/* JUDUL */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              JUDUL
            </label>

            <div className="relative">
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                placeholder="Masukan judul utama"
                className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 pr-32 text-[10px] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
                style={{
                  color: formData.judulColor || "#333333",
                  opacity: (formData.judulOpacity ?? 100) / 100,
                }}
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <ColorPicker
                  value={formData.judulColor}
                  opacity={formData.judulOpacity}
                  onChange={(color) => {
                    setFormData((prev) => ({
                      ...prev,
                      judulColor: color.hex,
                      judulOpacity: color.opacity,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* JUDUL DALAM BAHASA INGGRIS */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
              JUDUL DALAM BAHASA INGGRIS
            </label>

            <input
              type="text"
              name="judulEn"
              value={formData.judulEn}
              onChange={handleChange}
              placeholder="Masukan judul utama dalam bahasa inggris"
              className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] italic shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
              style={{
                color: formData.judulColor || "#333333",
                opacity: (formData.judulOpacity ?? 100) / 100,
              }}
            />
          </div>

          {/* DESKRIPSI */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              DESKRIPSI
            </label>

            <div className="relative">
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Masukan deskripsi"
                rows={4}
                className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 pr-32 text-[10px] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
                style={{
                  color: formData.deskripsiColor || "#333333",
                  opacity: (formData.deskripsiOpacity ?? 100) / 100,
                }}
              />

              <div className="absolute right-2 top-3">
                <ColorPicker
                  value={formData.deskripsiColor}
                  opacity={formData.deskripsiOpacity}
                  onChange={(color) => {
                    setFormData((prev) => ({
                      ...prev,
                      deskripsiColor: color.hex,
                      deskripsiOpacity: color.opacity,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* DESKRIPSI DALAM BAHASA INGGRIS */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
              DESKRIPSI DALAM BAHASA INGGRIS
            </label>

            <textarea
              name="deskripsiEn"
              value={formData.deskripsiEn}
              onChange={handleChange}
              placeholder="Masukan deskripsi dalam bahasa inggris"
              rows={4}
              className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] italic shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
              style={{
                color: formData.deskripsiColor || "#333333",
                opacity: (formData.deskripsiOpacity ?? 100) / 100,
              }}
            />
          </div>

          {/* BACKGROUND */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              BACKGROUND
            </label>

            <div className="flex h-[60px] items-center gap-3 rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md bg-[#FDCB01] px-3 py-1 text-[9px] font-bold text-black shadow-sm transition hover:brightness-95"
              >
                Choose file
              </button>

              {formData.background && (
                <img
                  src={formData.background}
                  alt="Background"
                  className="h-[42px] w-[150px] rounded object-cover"
                />
              )}
            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-1 rounded-md bg-[#7FC97F] px-5 py-2 text-[10px] font-bold text-[#222] shadow-sm transition hover:brightness-95"
            >
              <Save size={11} />
              Simpan
            </button>
          </div>

        </form>
      </section>
    </div>
  );
};

export default TopGeneralArtikel;