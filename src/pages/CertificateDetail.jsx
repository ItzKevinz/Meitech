import { useState } from "react";

const CertificateDetail = ({ certificate, onBack }) => {
  const [formData, setFormData] = useState({
    name: certificate?.name || "",
    name_en: certificate?.name_en || "",
    description: certificate?.description || "",
    description_en: certificate?.description_en || "",
    field: certificate?.field || "",
    image: certificate?.image || "",
  });

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* HEADER */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Detail Portfolio
        </h1>
      </div>

      {/* DETAIL CARD */}
      <section className="overflow-hidden rounded-md bg-white shadow-sm">
        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">
            Sertifikat setting
          </h2>
        </div>

        <div className="px-6 py-5">
          {/* NAMA SERTIFIKAT */}
          <div className="mb-3">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Nama Sertifikat
            </label>

            <input
              type="text"
              value={formData.name}
              readOnly
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] outline-none"
            />
          </div>

          {/* NAMA INGGRIS */}
          <div className="mb-3">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Nama Sertifikat Dalam Bahasa Inggris
            </label>

            <input
              type="text"
              value={formData.name_en}
              readOnly
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
              value={formData.description}
              readOnly
              rows={4}
              className="w-full resize-none rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] leading-4 text-[#333] outline-none"
            />
          </div>

          {/* DESKRIPSI INGGRIS */}
          <div className="mb-3">
            <label className="mb-1 block text-[8px] font-bold uppercase text-[#333]">
              Deskripsi Dalam Bahasa Inggris
            </label>

            <textarea
              value={formData.description_en}
              readOnly
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
              value={formData.field}
              readOnly
              className="w-full rounded-md bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] outline-none"
            />
          </div>

          {/* SERTIFIKAT */}
          <div>
            <label className="mb-2 block text-[8px] font-bold uppercase text-[#333]">
              Sertifikat
            </label>

            {formData.image && (
              <div className="flex">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="h-[105px] w-[75px] rounded border border-[#D9D9D9] object-contain"
                />
              </div>
            )}
          </div>

          {/* BACK */}
          <div className="mt-6">
            <button
              type="button"
              onClick={onBack}
              className="rounded-md bg-[#FDCB01] px-4 py-2 text-[9px] font-bold text-black transition hover:brightness-95"
            >
              Kembali
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificateDetail;