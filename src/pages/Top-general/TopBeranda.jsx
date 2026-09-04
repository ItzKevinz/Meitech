import { useRef, useState } from "react";
import { Save, Upload, X } from "lucide-react";

import background1 from "../../assets/top-beranda/background-1.jpg";
import background2 from "../../assets/top-beranda/background-2.jpg";
import ColorPicker from "../../components/ColorPicker";

const TopBeranda = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: "",
    companyNameColor: "#FFFFFF",
    companyNameOpacity: 100,

    slogan: "",
    sloganColor: "#FFFFFF",
    sloganOpacity: 100,

    sloganEn: "",

    businessFields: ["Panel Maker", "Sheet Metal", "Distributor Suntree"],
  });

  const [images, setImages] = useState([background1, background2, background2]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const newImages = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImages].slice(0, 3));
  };

  const handleDeleteImage = (index) => {
    setSelectedImageIndex(index);
    setDeleteModalOpen(true);
  };

  const handleConfirmDeleteImage = () => {
    if (selectedImageIndex === null) return;

    setImages((prev) =>
      prev.filter((_, index) => index !== selectedImageIndex),
    );

    setSelectedImageIndex(null);
    setDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setSelectedImageIndex(null);
    setDeleteModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data Top Beranda:", {
      ...formData,
      images,
    });

    alert("Top Beranda berhasil disimpan!");
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-[Nunito_Sans]">
      {/* PAGE TITLE */}
      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          Top General
        </h1>
      </div>

      {/* BERANDA CARD */}
      <section className="rounded-md bg-white shadow-sm">
        {/* CARD HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[15px] font-bold text-[#171717]">Beranda</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-16 py-5">
          {/* NAMA PERUSAHAAN */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              NAMA PERUSAHAAN
            </label>

            <div className="relative">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Masukan nama perusahaan"
                className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 pr-28 text-[10px] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
                style={{
                  color: formData.companyNameColor || "#333333",
                }}
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <ColorPicker
                  value={formData.companyNameColor || "#FFFFFF"}
                  opacity={formData.companyNameOpacity || 100}
                  onChange={(color) => {
                    setFormData((prev) => ({
                      ...prev,
                      companyNameColor: color.hex,
                      companyNameOpacity: color.opacity,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* SLOGAN */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              SLOGAN
            </label>

            <div className="relative">
              <textarea
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                placeholder="Masukan slogan"
                rows={3}
                className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 pr-28 text-[10px] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
                style={{
                  color: formData.sloganColor || "#333333",
                }}
              />

              <div className="absolute right-2 top-3">
                <ColorPicker
                  value={formData.sloganColor || "#FFFFFF"}
                  opacity={formData.sloganOpacity || 100}
                  onChange={(color) => {
                    setFormData((prev) => ({
                      ...prev,
                      sloganColor: color.hex,
                      sloganOpacity: color.opacity,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* SLOGAN EN */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold italic text-[#555]">
              SLOGAN DALAM BAHASA INGGRIS
            </label>

            <textarea
              name="sloganEn"
              value={formData.sloganEn}
              onChange={handleChange}
              placeholder="Masukan slogan dalam bahasa inggris"
              rows={3}
              className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none placeholder:text-[#999] focus:border-[#FDCB01]"
            />
          </div>

          {/* BIDANG USAHA */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              BIDANG USAHA
            </label>

            <div className="flex min-h-[34px] flex-wrap items-center gap-1 rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-2 py-1.5">
              {formData.businessFields.map((field, index) => (
                <span
                  key={`${field}-${index}`}
                  className="flex items-center gap-1 rounded-full bg-[#DCE8FF] px-2 py-1 text-[9px] text-[#53627A]"
                >
                  {field}

                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        businessFields: prev.businessFields.filter(
                          (_, i) => i !== index,
                        ),
                      }));
                    }}
                    className="text-[#7B8798] hover:text-black"
                  >
                    <X size={9} />
                  </button>
                </span>
              ))}

              <span className="text-[9px] text-[#999]">Add field...</span>
            </div>
          </div>

          {/* BACKGROUND */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
              BACKGROUND
            </label>

            <div className="grid grid-cols-[1fr_1fr] gap-4">
              {/* UPLOAD AREA */}
              <div className="flex h-[219px] items-center justify-center rounded-md border border-dashed border-[#BDBDBD] bg-white">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-1 rounded-md px-5 py-3 text-[10px] text-[#555] transition hover:bg-[#F8F8F8]"
                >
                  <Upload size={17} />

                  <span className="rounded border border-[#D5D5D5] px-3 py-1">
                    Upload
                  </span>

                  <span className="text-[8px] italic text-[#999]">
                    Klik atau drop gambar
                  </span>
                </button>
              </div>

              {/* IMAGE PREVIEW */}
              <div className="space-y-3">
                {images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={image}
                      alt={`Background ${index + 1}`}
                      className="h-[65px] w-full rounded border border-[#D0D0D0] object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="shrink-0 rounded-md bg-[#FF0000] px-3 py-1 text-[9px] font-bold text-black shadow-sm transition hover:brightness-95"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
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
        {deleteModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[3px]">
            <div className="w-full max-w-[560px] overflow-hidden rounded-lg bg-white shadow-2xl">
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-[#E5E5E5] px-5 py-3">
                <h3 className="text-[14px] font-bold text-[#222]">Hapus</h3>

                <button
                  type="button"
                  onClick={handleCloseDeleteModal}
                  className="text-[22px] font-light leading-none text-[#222] transition hover:text-black"
                >
                  ×
                </button>
              </div>

              {/* CONTENT */}
              <div className="px-5 py-5">
                <p className="mb-2 text-[11px] font-bold text-[#222]">
                  Apakah anda yakin ingin menghapus gambar ini?
                </p>

                <p className="text-[9px] text-[#555]">
                  Gambar ini akan dihapus secara permanen
                </p>
              </div>

              {/* BUTTON */}
              <div className="flex items-center gap-3 px-5 pb-5">
                <button
                  type="button"
                  onClick={handleCloseDeleteModal}
                  className="rounded-md bg-[#FFD000] px-4 py-1.5 text-[9px] font-bold text-black shadow-sm transition hover:brightness-95"
                >
                  Kembali
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDeleteImage}
                  className="rounded-md bg-[#FF0000] px-4 py-1.5 text-[9px] font-bold text-black shadow-sm transition hover:brightness-95"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TopBeranda;
