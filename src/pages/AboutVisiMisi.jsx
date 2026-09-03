import { useState } from "react";
import { Save } from "lucide-react";

const AboutVisiMisi = () => {
  const [formData, setFormData] = useState({
    title: "",
    title_en: "",
    description: "",
    description_en: "",
    vision: "",
    vision_en: "",
    mission: "",
    mission_en: "",
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

    console.log("Data Visi Misi:", formData);

    alert("Data Visi Misi berhasil disimpan!");
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm">
          <h1 className="m-0 text-3xl font-bold text-black tracking-tight">
            Tentang Kami
          </h1>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl p-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-[#1A1A1A]">
            Visi Misi
          </h2>

          <hr className="border-t border-[#EAEAEA] my-4" />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-7 w-full"
          >

            {/* JUDUL */}
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

            {/* JUDUL INGGRIS */}
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

            {/* DESKRIPSI */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                DESKRIPSI
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukan deskripsi"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            {/* DESKRIPSI INGGRIS */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                DESKRIPSI DALAM BAHASA INGGRIS
              </label>

              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                placeholder="Masukan deskripsi"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            {/* VISI */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                VISI
              </label>

              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                placeholder="Masukan visi perusahaan"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            {/* VISI INGGRIS */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                VISI DALAM BAHASA INGGRIS
              </label>

              <textarea
                name="vision_en"
                value={formData.vision_en}
                onChange={handleChange}
                placeholder="Masukan visi perusahaan"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            {/* MISI */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                MISI
              </label>

              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                placeholder="Masukan misi perusahaan"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            {/* MISI INGGRIS */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                MISI DALAM BAHASA INGGRIS
              </label>

              <textarea
                name="mission_en"
                value={formData.mission_en}
                onChange={handleChange}
                placeholder="Masukan misi perusahaan"
                rows={5}
                className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#72C182]"
              />
            </div>

            {/* SIMPAN */}
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-[#72C182] hover:bg-[#62B172] text-[#0D2B14] px-5 py-2 rounded-lg font-bold text-sm shadow-sm transition-all cursor-pointer"
              >
                <Save
                  size={16}
                  className="mr-2 stroke-[2.5]"
                />

                Simpan
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutVisiMisi;