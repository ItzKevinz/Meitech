import { useState, useRef } from "react";
import { Save } from "lucide-react";

const CertificateEdit = ({ certificate, onBack, onSave }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: certificate?.name || "",
    name_en: certificate?.name_en || "",
    description: certificate?.description || "",
    description_en: certificate?.description_en || "",
    field: certificate?.field || "",
    image: certificate?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCertificate = {
      ...certificate,
      ...formData,
    };

    console.log("Sertifikat diperbarui:", updatedCertificate);

    if (onSave) {
      onSave(updatedCertificate);
    }

    alert("Sertifikat berhasil disimpan!");
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Edit Sertifikat
        </h1>
      </div>

      {/* FORM */}
      <section className="overflow-hidden rounded-md bg-white shadow-sm">
        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">
            Sertifikat setting
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          {/* NAMA SERTIFIKAT */}
          <div className="mb-3">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Nama Sertifikat
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] outline-none"
            />
          </div>

          {/* NAMA BAHASA INGGRIS */}
          <div className="mb-3">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Nama Sertifikat Dalam Bahasa Inggris
            </label>

            <input
              type="text"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              placeholder="Masukan nama sertifikat dalam bahasa inggris"
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] outline-none placeholder:text-[#B8B2A5]"
            />
          </div>

          {/* DESKRIPSI */}
          <div className="mb-3">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Deskripsi
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] leading-4 text-[#333] outline-none"
            />
          </div>

          {/* DESKRIPSI BAHASA INGGRIS */}
          <div className="mb-3">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Deskripsi Dalam Bahasa Inggris
            </label>

            <textarea
              name="description_en"
              value={formData.description_en}
              onChange={handleChange}
              rows={4}
              placeholder="Masukan Deskripsi dalam bahasa inggris"
              className="w-full resize-none rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] leading-4 text-[#333] outline-none placeholder:text-[#B8B2A5]"
            />
          </div>

          {/* BIDANG */}
          <div className="mb-4">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Bidang
            </label>

            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] outline-none"
            />
          </div>

          {/* SERTIFIKAT */}
          <div className="mb-2">
            <label className="mb-2 block text-[8px] font-bold uppercase text-[#333]">
              Sertifikat
            </label>

            <div className="flex items-start gap-4">
              {/* PREVIEW */}
              <div className="flex h-[95px] w-[65px] items-center justify-center border border-dashed border-[#BDBDBD] bg-white">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-[8px] text-[#999]">
                    No Image
                  </span>
                )}
              </div>

              {/* UBAH */}
              <button
                type="button"
                onClick={handleChooseImage}
                className="rounded-md bg-[#FDCB01] px-4 py-2 text-[9px] font-bold text-black transition hover:brightness-95"
              >
                Ubah
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* SIMPAN */}
          <div className="mt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex items-center gap-1 rounded-md bg-[#7FC97F] px-4 py-2 text-[9px] font-bold text-black transition hover:brightness-95"
            >
              <Save size={11} />
              Simpan
            </button>

            <button
              type="button"
              onClick={onBack}
              className="rounded-md bg-[#E5E5E5] px-4 py-2 text-[9px] font-bold text-[#333] transition hover:brightness-95"
            >
              Kembali
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CertificateEdit;