import { useState, useRef } from "react";
import { Save, X, ArrowLeft, Upload } from "lucide-react";

const CategorySetting = () => {
  const [viewMode, setViewMode] = useState("list");

  // State Data Kategori Dummy
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Panel Marker",
      name_en: "Panel Marker",
      description:
        "Pembuatan dan perakitan LVMDP, SDP, MCC, Enclosure, ATS, dan Supersun berstandar teknis internasional dengan tingkat presisi dan keamanan tinggi.",
      description_en:
        "Manufacture and assembly of LVMDP, SDP, MCC, Enclosure, ATS, and Supersun with international technical standards.",
      productTypes: ["LVMDP", "SDP", "MCC", "ATS", "Enclosure"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    },
    {
      id: 2,
      name: "Sheet Metal",
      name_en: "Sheet Metal",
      description:
        "Fabrikasi presisi tinggi untuk pembuatan Racking, Bannister, Partisi, Kanopi, Pagar, HVAC, dan Ducting berkualitas industri menggunakan teknologi laser cutting terbaru.",
      description_en:
        "High-precision fabrication for Racking, Bannister, Partitions, Canopies, Fences, HVAC, and Ducting using laser cutting technology.",
      productTypes: [
        "Pagar & Kanopi",
        "Racking",
        "Laser Cutting",
        "HVAC & Ducting",
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
    },
  ]);

  // State Form Input
  const [editingId, setEditingId] = useState(null);
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    name_en: "",
    description: "",
    description_en: "",
    productTypes: [],
    imageFile: null,
  });
  
  // State untuk input temporary penambahan Jenis Produk (Tag)
  const [newTypeInput, setNewTypeInput] = useState("");
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // State Modal Hapus Custom
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // State Modal Simpan Custom
  const [showSaveModal, setShowSaveModal] = useState(false);

  const fileInputRef = useRef(null);

  // Handler Buka Form Tambah
  const handleOpenAddForm = () => {
    setEditingId(null);
    setCategoryInput({
      name: "",
      name_en: "",
      description: "",
      description_en: "",
      productTypes: ["jenis"],
      imageFile: null,
    });
    setImagePreview(null);
    setViewMode("form");
  };

  // Handler Buka Form Edit
  const handleOpenEditForm = (item) => {
    setEditingId(item.id);
    setCategoryInput({
      name: item.name || "",
      name_en: item.name_en || "",
      description: item.description || "",
      description_en: item.description_en || "",
      productTypes: item.productTypes || [],
      imageFile: null,
    });
    setImagePreview(item.image || null);
    setViewMode("form");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handler Tambah Jenis Produk (Tag)
  const handleAddType = () => {
    if (newTypeInput.trim()) {
      setCategoryInput((prev) => ({
        ...prev,
        productTypes: [...prev.productTypes, newTypeInput.trim()],
      }));
      setNewTypeInput("");
      setShowTypeInput(false);
    }
  };

  // Handler Hapus Jenis Produk (Tag)
  const handleRemoveType = (indexToRemove) => {
    setCategoryInput((prev) => ({
      ...prev,
      productTypes: prev.productTypes.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Handler Upload Gambar
  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryInput((prev) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setCategoryInput((prev) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 1. KETIKA TOMBOL SIMPAN DI FORM DIKLIK 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!categoryInput.name.trim()) {
      alert("Nama kategori wajib diisi!");
      return;
    }
    setShowSaveModal(true);
  };

  // 2. KETIKA TOMBOL SIMPAN DI MODAL KONFIRMASI DIKLIK
  const handleConfirmSave = () => {
    if (editingId) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...categoryInput,
                image: imagePreview || item.image,
              }
            : item
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        ...categoryInput,
        image:
          imagePreview ||
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    setShowSaveModal(false);
    setViewMode("list");
  };

  // Handler Hapus
  const handleOpenDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      setCategories((prev) => prev.filter((item) => item.id !== deletingId));
      setShowDeleteModal(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full relative text-left">
      <div className="w-full flex flex-col gap-6">

        {/* TAMPILAN 1: LIST TABEL*/}
        {viewMode === "list" && (
          <>
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm text-left w-full">
              <h1 className="m-0 text-3xl font-bold text-black tracking-tight">
                List Kategori Setting
              </h1>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-left flex flex-col gap-6 w-full">
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={handleOpenAddForm}
                  className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-sm px-6 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                >
                  Tambah Kategori
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden bg-white w-full mt-2">
                <div className="bg-[#F8F8F8] flex items-center px-4 py-3.5 font-semibold text-black text-sm border-b border-gray-100">
                  <div className="w-[4%] text-left">No.</div>
                  <div className="w-[16%] text-left">Nama</div>
                  <div className="w-[32%] text-left px-2">Deskripsi Produk</div>
                  <div className="w-[22%] text-left px-2">Jenis Produk</div>
                  <div className="w-[12%] text-center">Gambar</div>
                  <div className="w-[14%] text-center">Aksi</div>
                </div>

                <div className="divide-y divide-[#EAEAEA]">
                  {categories.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center px-4 py-6 hover:bg-gray-50/50 transition-colors text-xs text-gray-800"
                    >
                      <div className="w-[4%] text-left text-gray-700 font-normal">
                        {index + 1}
                      </div>

                      <div className="w-[16%] text-left font-bold text-sm text-[#111827] pr-2">
                        {item.name}
                      </div>

                      <div className="w-[32%] text-left font-normal px-2 text-gray-600 leading-relaxed text-xs pr-4">
                        {item.description}
                      </div>

                      <div className="w-[22%] text-left px-2 flex flex-wrap gap-2">
                        {item.productTypes.map((type, idx) => (
                          <span
                            key={idx}
                            className="inline-block border border-black rounded-full px-3 py-1 text-[11px] font-semibold text-black bg-white shadow-xs"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      <div className="w-[12%] flex justify-center items-center px-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-24 object-contain rounded-md"
                        />
                      </div>

                      <div className="w-[14%] flex items-center justify-center gap-1.5 px-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditForm(item)}
                          className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-semibold text-xs px-3.5 py-1.5 rounded-md transition-all cursor-pointer border-none"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(item.id)}
                          className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold text-xs px-3 py-1.5 rounded-md transition-all cursor-pointer border-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAMPILAN 2: FORM TAMBAH / EDIT KATEGORI*/}
        {viewMode === "form" && (
          <div className="w-full flex flex-col gap-6">
            
            {/* Page Header Card */}
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm flex items-center gap-4 w-full">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="p-2 rounded-lg bg-[#F7F3E9] hover:bg-[#EAE4D7] text-black transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="m-0 text-xl md:text-2xl font-bold text-black tracking-tight">
                {editingId ? "Edit Kategori" : "Tambah Kategori"}
              </h1>
            </div>

            {/* Form Section Card */}
            <div className="bg-white rounded-xl shadow-sm text-left w-full overflow-hidden">
              
              {/* Card Header Title */}
              <div className="px-8 py-5 border-b border-[#EAEAEA]">
                <h2 className="text-lg font-bold text-[#1A1A1A] m-0">
                  Kategory setting
                </h2>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-8 flex flex-col gap-6 w-full">
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* 1. NAMA KATEGORY */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    NAMA KATEGORY
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={categoryInput.name}
                    onChange={handleInputChange}
                    placeholder="Masukan nama Produk"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    required
                  />
                </div>

                {/* 2. NAMA KATEGORY DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    NAMA KATEGORY DALAM BAHASA INGGRIS
                  </label>
                  <input
                    type="text"
                    name="name_en"
                    value={categoryInput.name_en}
                    onChange={handleInputChange}
                    placeholder="Masukan nama Produk"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 3. DESKRIPSI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    DESKRIPSI
                  </label>
                  <textarea
                    name="description"
                    value={categoryInput.description}
                    onChange={handleInputChange}
                    placeholder="Masukan Deskripsi"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none resize-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 4. DESKRIPSI DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase italic">
                    DESKRIPSI DALAM BAHASA INGGRIS
                  </label>
                  <textarea
                    name="description_en"
                    value={categoryInput.description_en}
                    onChange={handleInputChange}
                    placeholder="Masukan Deskripsi dalam bahasa inggris"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none resize-none shadow-xs focus:ring-2 focus:ring-[#7EC07E] italic"
                  />
                </div>

                {/* 5. JENIS PRODUK (TAG INPUT) */}
                <div className="flex flex-col items-start gap-2.5 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    JENIS PRODUK
                  </label>

                  <div className="flex flex-wrap items-center gap-2">
                    {categoryInput.productTypes.map((type, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-[#E8EFFE] text-[#3B82F6] font-semibold text-xs px-3 py-1.5 rounded-full border border-[#D0E1FD]"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => handleRemoveType(index)}
                          className="hover:text-red-500 cursor-pointer border-none bg-transparent p-0 flex items-center"
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}

                    {showTypeInput ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={newTypeInput}
                          onChange={(e) => setNewTypeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddType();
                            }
                          }}
                          placeholder="Ketik jenis..."
                          className="border border-[#D1D5DB] rounded-full px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-[#3B82F6]"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={handleAddType}
                          className="bg-[#3B82F6] text-white text-xs px-2.5 py-1 rounded-full cursor-pointer border-none font-semibold"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowTypeInput(true)}
                        className="bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280] font-normal text-xs px-3 py-1.5 rounded-full cursor-pointer border border-[#E5E7EB] transition-colors"
                      >
                        tambahkan jenis
                      </button>
                    )}
                  </div>
                </div>

                {/* 6. GAMBAR KATEGORY PRODUK */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    GAMBAR KATEGORY PRODUK
                  </label>

                  {imagePreview ? (
                    <div className="flex items-start gap-6">
                      <div className="w-[340px] h-[200px] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white flex items-center justify-center p-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleUploadClick}
                        className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-xs px-6 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer border-none"
                      >
                        Ganti Gambar
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={handleUploadClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="w-[340px] h-[190px] border-2 border-dashed border-[#C5C5C5] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50/80 transition-colors bg-white relative"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="border border-gray-300 rounded-lg px-5 py-2 flex items-center gap-2 bg-white shadow-2xs">
                          <Upload size={16} className="text-black" />
                          <span className="text-xs font-semibold text-black">Upload</span>
                        </div>
                        <span className="text-[11px] text-gray-400 italic mt-0.5">
                          Click atau drop gambar
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* TOMBOL SIMPAN */}
                <div className="flex justify-start mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#7EC07E] hover:bg-[#6EB06E] text-[#0D2B14] font-bold text-sm px-8 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                  >
                    <Save size={16} className="mr-2 stroke-[2.5]" />
                    Simpan
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>

      {/* MODAL SIMPAN CUSTOM*/}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[540px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#333333] m-0">Simpan</h3>
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="text-[#374151] hover:text-black cursor-pointer border-none bg-transparent p-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold text-[#333333] m-0">
                  Apakah anda yakin akan Menyimpan data?
                </h4>
                <p className="text-sm text-[#666666] m-0">
                  Jika data disimpan, maka akan tersimpan secara permanen
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="bg-[#E5A06D] hover:bg-[#d8915e] text-white font-semibold text-sm px-7 py-2.5 rounded-lg border-none cursor-pointer shadow-xs transition-all"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSave}
                  className="bg-[#7EC07E] hover:bg-[#6EB06E] text-white font-semibold text-sm px-7 py-2.5 rounded-lg border-none cursor-pointer shadow-xs transition-all"
                >
                  simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS CUSTOM */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[540px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#333333] m-0">Hapus</h3>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="text-[#374151] hover:text-black cursor-pointer border-none bg-transparent p-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body  */}
            <div className="p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold text-[#333333] m-0">
                  Apakah anda yakin akan menghapus data?
                </h4>
                <p className="text-sm text-[#666666] m-0">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-[#E5A06D] hover:bg-[#d8915e] text-white font-semibold text-sm px-7 py-2.5 rounded-lg border-none cursor-pointer shadow-xs transition-all"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="bg-[#C82829] hover:bg-[#b02021] text-white font-semibold text-sm px-7 py-2.5 rounded-lg border-none cursor-pointer shadow-xs transition-all"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySetting;