import { useState, useRef } from "react";
import { Upload, Save } from "lucide-react";

const CertificateAdd = ({ onBack, onSave }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    name_en: "",
    description: "",
    description_en: "",
    field: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

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
      image: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sertifikat baru:", formData);

    if (onSave) {
      onSave(formData);
    }

    alert("Sertifikat berhasil ditambahkan!");
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Tambahkan Sertifikat
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
              placeholder="Masukan nama sertifikat"
              required
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] outline-none placeholder:text-[#B8B2A5]"
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
              placeholder="Masukan Deskripsi"
              required
              rows={4}
              className="w-full resize-none rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] leading-4 text-[#333] outline-none placeholder:text-[#B8B2A5]"
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
              placeholder="Masukan Deskripsi dalam bahasa inggris"
              rows={4}
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
              placeholder="Masukan label produk"
              required
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] outline-none placeholder:text-[#B8B2A5]"
            />
          </div>

          {/* SERTIFIKAT */}
          <div className="mb-4">
            <label className="mb-2 block text-[8px] font-bold uppercase text-[#333]">
              Sertifikat
            </label>

            <div
              onClick={handleChooseImage}
              className="flex h-[98px] w-[190px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#BDBDBD] bg-white transition hover:bg-[#FCFCFC]"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview Sertifikat"
                  className="h-full w-full rounded-md object-contain"
                />
              ) : (
                <>
                  <div className="mb-1 rounded-md border border-[#D9D9D9] px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Upload size={12} />
                      <span className="text-[9px] font-semibold text-[#333]">
                        Upload
                      </span>
                    </div>
                  </div>

                  <span className="text-[7px] text-[#999]">
                    Click atau drag gambar
                  </span>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* SIMPAN */}
          <button
            type="submit"
            className="flex items-center gap-1 rounded-md bg-[#7FC97F] px-4 py-2 text-[9px] font-bold text-black transition hover:brightness-95"
          >
            <Save size={11} />
            Simpan
          </button>
        </form>
      </section>
    </div>
  );
};

export default CertificateAdd;