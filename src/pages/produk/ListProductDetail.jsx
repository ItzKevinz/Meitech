import { useState, useRef } from "react";
import { X, ArrowLeft, Save, Upload } from "lucide-react";

const ListProductDetail = () => {
  // State List Data Produk
  const [products, setProducts] = useState([
    {
      id: 1,
      nama: "LVMDP",
      katalog: "Panel Marker",
      label: "Main Distributor",
      deskripsi:
        "Low Voltage Main Distribution Panel sebagai pusat pendistribusian arus utama dari trafo/genset ke seluruh jaringan...",
      deskripsi_en: "",
      spesifikasi: [
        "Rating Arus: 800A hingga 4000A",
        "Plat Enclosure: Cold Rolled Steel 2.0mm",
        "Busbar: Full Copper 99.9% Purity",
      ],
      images: [
        { id: 1, name: "gambar.png", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80" },
        { id: 2, name: "gambar1.png", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80" },
        { id: 3, name: "gambar2.png", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80" },
        { id: 4, name: "gambar3.png", url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&q=80" },
      ],
    },
    {
      id: 2,
      nama: "SDP (Sub distributor Panel)",
      katalog: "Panel Marker",
      label: "Sub Distribution",
      deskripsi:
        "Panel pembagi cabang yang menerima pasokan daya dari LVMDP untuk disalurkan ke beban panel penerangan...",
      deskripsi_en: "",
      spesifikasi: [
        "Rating Arus: 100A hingga 630A",
        "Sistem Proteksi: MCCB & MCB",
        "Monitoring: Digital Metering",
      ],
      images: [
        { id: 1, name: "gambar.png", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80" },
      ],
    },
  ]);

  // Options Kategori Produk
  const categoryOptions = [
    "Panel Marker",
    "Sheet Metal",
    "Suntree Distribution",
    "Support PV",
  ];

  // State Switching Mode View ('list' | 'detail' | 'edit' | 'add')
  const [viewMode, setViewMode] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // State Form Edit / Add
  const [productForm, setProductForm] = useState({
    id: null,
    nama: "",
    deskripsi: "",
    deskripsi_en: "",
    label: "",
    katalog: categoryOptions[0],
    spesifikasi: [],
    images: [],
  });

  // State Preview Gambar Upload untuk Form Tambah
  const [addImagesPreview, setAddImagesPreview] = useState([]);

  // Temporary State untuk Tag Spesifikasi Baru
  const [newSpecInput, setNewSpecInput] = useState("");
  const [showSpecInput, setShowSpecInput] = useState(false);

  // State Modal Hapus & Simpan
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const fileInputRef = useRef(null);

  // Handler Buka Detail
  const handleOpenDetail = (item) => {
    setSelectedProduct(item);
    setSelectedImageIndex(0);
    setViewMode("detail");
  };

  // Handler Buka Form Tambah
  const handleOpenAdd = () => {
    setProductForm({
      id: null,
      nama: "",
      deskripsi: "",
      deskripsi_en: "",
      label: "",
      katalog: categoryOptions[0],
      spesifikasi: ["tambahkan spesifikasi"],
      images: [],
    });
    setAddImagesPreview([]);
    setViewMode("add");
  };

  // Handler Buka Form Edit
  const handleOpenEdit = (item) => {
    setSelectedProduct(item);
    setProductForm({
      id: item.id,
      nama: item.nama || "",
      deskripsi: item.deskripsi || "",
      deskripsi_en: item.deskripsi_en || "",
      label: item.label || "",
      katalog: item.katalog || categoryOptions[0],
      spesifikasi: item.spesifikasi || [],
      images: item.images || [],
    });
    setSelectedImageIndex(0);
    setViewMode("edit");
  };

  // Handler Input Change Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handler Hapus Tag Spesifikasi
  const handleRemoveSpec = (indexToRemove) => {
    setProductForm((prev) => ({
      ...prev,
      spesifikasi: prev.spesifikasi.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Handler Tambah Tag Spesifikasi
  const handleAddSpec = () => {
    if (newSpecInput.trim()) {
      setProductForm((prev) => ({
        ...prev,
        spesifikasi: [...prev.spesifikasi, newSpecInput.trim()],
      }));
      setNewSpecInput("");
      setShowSpecInput(false);
    }
  };

  // Handler Hapus Gambar (Edit Mode)
  const handleRemoveImage = (imgIdToRemove) => {
    setProductForm((prev) => {
      const updatedImages = prev.images.filter((img) => img.id !== imgIdToRemove);
      return { ...prev, images: updatedImages };
    });
    if (selectedImageIndex >= productForm.images.length - 1) {
      setSelectedImageIndex(Math.max(0, productForm.images.length - 2));
    }
  };

  // Handler Upload Gambar Baru
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      if (viewMode === "add") {
        setAddImagesPreview((prev) => [...prev, ...newImages]);
      } else {
        setProductForm((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
      }
    }
  };

  // Handler Drop File
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      const newImages = files.map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      if (viewMode === "add") {
        setAddImagesPreview((prev) => [...prev, ...newImages]);
      } else {
        setProductForm((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
      }
    }
  };

  // Handler Submit Form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!productForm.nama.trim()) {
      alert("Nama produk wajib diisi!");
      return;
    }
    setShowSaveModal(true);
  };

  // Handler Konfirmasi Simpan
  const handleConfirmSave = () => {
    if (viewMode === "add") {
      const newProduct = {
        ...productForm,
        id: Date.now(),
        images:
          addImagesPreview.length > 0
            ? addImagesPreview
            : [
                {
                  id: Date.now(),
                  name: "gambar.png",
                  url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
                },
              ],
      };
      setProducts((prev) => [...prev, newProduct]);
    } else {
      setProducts((prev) =>
        prev.map((item) => (item.id === productForm.id ? { ...item, ...productForm } : item))
      );
    }

    setShowSaveModal(false);
    setViewMode("list");
  };

  // Hapus Data Produk 
  const handleOpenDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      setProducts((prev) => prev.filter((item) => item.id !== deletingId));
      setShowDeleteModal(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full relative text-left">
      <div className="w-full flex flex-col gap-6">

        {/* TAMPILAN 1: LIST PRODUK TABEL*/}
        {viewMode === "list" && (
          <>
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-xs text-left w-full">
              <h1 className="m-0 text-2xl font-bold text-black tracking-tight">
                List Product detail
              </h1>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-xs text-left flex flex-col gap-6 w-full">
              <h2 className="text-xl font-bold text-black m-0">Semua Produk</h2>

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-xs px-6 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer border-none"
                >
                  Tambah Product
                </button>
              </div>

              <div className="rounded-xl overflow-hidden bg-white w-full mt-2">
                <div className="bg-white flex items-center px-4 py-3 font-bold text-black text-xs border-b border-[#EAEAEA]">
                  <div className="w-[4%] text-left">No.</div>
                  <div className="w-[14%] text-left">Nama</div>
                  <div className="w-[12%] text-left">Katalog</div>
                  <div className="w-[14%] text-left">Label</div>
                  <div className="w-[28%] text-left px-2">Deskripsi Produk</div>
                  <div className="w-[20%] text-left px-2">Spesifikasi</div>
                  <div className="w-[8%] text-center">Aksi</div>
                </div>

                <div className="divide-y divide-[#EAEAEA]">
                  {products.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-start px-4 py-5 hover:bg-gray-50/50 transition-colors text-xs text-gray-800"
                    >
                      <div className="w-[4%] text-left text-gray-700 font-medium pt-1">
                        {index + 1}
                      </div>

                      <div className="w-[14%] text-left font-bold text-gray-900 pr-2 pt-1 leading-snug">
                        {item.nama}
                      </div>

                      <div className="w-[12%] text-left text-gray-700 font-medium pt-1">
                        {item.katalog}
                      </div>

                      <div className="w-[14%] text-left text-gray-700 font-medium pt-1 pr-2">
                        {item.label}
                      </div>

                      <div className="w-[28%] text-left font-normal px-2 text-gray-600 leading-relaxed text-xs pr-4 pt-1">
                        {item.deskripsi}
                      </div>

                      <div className="w-[20%] text-left px-2 pt-1">
                        <ul className="list-disc pl-3 m-0 space-y-1 text-gray-700 text-[11px] leading-tight">
                          {item.spesifikasi.map((spec, idx) => (
                            <li key={idx}>{spec}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-[8%] flex flex-col items-center gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(item.id)}
                          className="w-full max-w-[55px] bg-[#C82829] hover:bg-[#b02021] text-white font-semibold text-[10px] py-1 rounded cursor-pointer border-none shadow-2xs transition-all"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="w-full max-w-[55px] bg-[#FFD600] hover:bg-[#e6c200] text-black font-semibold text-[10px] py-1 rounded cursor-pointer border-none shadow-2xs transition-all"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item)}
                          className="w-full max-w-[55px] bg-[#4285F4] hover:bg-[#3367d6] text-white font-semibold text-[10px] py-1 rounded cursor-pointer border-none shadow-2xs transition-all"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAMPILAN 2: DETAIL PRODUK                  */}
        {viewMode === "detail" && selectedProduct && (
          <div className="w-full flex flex-col gap-6">
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-xs flex items-center gap-4 w-full">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="p-2 rounded-lg bg-[#F7F3E9] hover:bg-[#EAE4D7] text-black transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="m-0 text-xl md:text-2xl font-bold text-black tracking-tight">
                Detail Produk
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-xs text-left w-full overflow-hidden">
              <div className="px-8 py-5 border-b border-[#EAEAEA]">
                <h2 className="text-lg font-bold text-[#1A1A1A] m-0">
                  Produk setting
                </h2>
              </div>

              <div className="p-8 flex flex-col gap-6 w-full">
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    NAMA PRODUK
                  </label>
                  <div className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333]">
                    {selectedProduct.nama}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    DESKRIPSI
                  </label>
                  <div className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] min-h-[100px] leading-relaxed">
                    {selectedProduct.deskripsi}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase italic">
                    DESKRIPSI DALAM BAHASA INGGRIS
                  </label>
                  <div className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#999999] min-h-[100px] italic">
                    {selectedProduct.deskripsi_en || "Masukan Deskripsi dalam Bahasa Inggris"}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    LABEL
                  </label>
                  <div className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333]">
                    {selectedProduct.label}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    KATEGORI PRODUK
                  </label>
                  <div className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333]">
                    --{selectedProduct.katalog}--
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    SPESIFIKASI
                  </label>
                  <div className="flex flex-col items-start gap-2">
                    {selectedProduct.spesifikasi.map((spec, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-[#E8EFFE] text-[#3B82F6] font-medium text-xs px-3.5 py-1.5 rounded-full border border-[#D0E1FD]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 w-full mt-2">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    GAMBAR PRODUK
                  </label>

                  <div className="flex flex-col sm:flex-row items-start gap-8 w-full mt-1">
                    <div className="w-[200px] h-[260px] bg-white border border-gray-200 rounded-xl overflow-hidden p-3 flex items-center justify-center shadow-xs">
                      <img
                        src={selectedProduct.images?.[selectedImageIndex]?.url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80"}
                        alt={selectedProduct.images?.[selectedImageIndex]?.name || "Preview"}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-2.5 w-full max-w-[320px]">
                      {(selectedProduct.images || []).map((img, idx) => {
                        const isSelected = selectedImageIndex === idx;
                        return (
                          <button
                            key={img.id || idx}
                            type="button"
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border transition-all cursor-pointer text-xs font-semibold ${
                              isSelected
                                ? "bg-[#FFD600] border-[#FFD600] text-black shadow-xs"
                                : "bg-white border-[#D5D5D5] text-[#333333] hover:bg-gray-50"
                            }`}
                          >
                            <span className="bg-[#EAEAEA] text-[#666666] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                              PNG
                            </span>
                            <span>{img.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAMPILAN 3: TAMBAH / EDIT PRODUK*/}
        {(viewMode === "edit" || viewMode === "add") && (
          <div className="w-full flex flex-col gap-6">
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-xs flex items-center gap-4 w-full">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="p-2 rounded-lg bg-[#F7F3E9] hover:bg-[#EAE4D7] text-black transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="m-0 text-xl md:text-2xl font-bold text-black tracking-tight">
                {viewMode === "add" ? "Tambah Produk" : "Edit Produk"}
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-xs text-left w-full overflow-hidden">
              <div className="px-8 py-5 border-b border-[#EAEAEA]">
                <h2 className="text-lg font-bold text-[#1A1A1A] m-0">
                  Produk setting
                </h2>
              </div>

              <form onSubmit={handleFormSubmit} className="p-8 flex flex-col gap-6 w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                {/* NAMA PRODUK */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    NAMA PRODUK
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={productForm.nama}
                    onChange={handleInputChange}
                    placeholder="Masukan Nama Produk"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    required
                  />
                </div>

                {/* DESKRIPSI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    DESKRIPSI
                  </label>
                  <textarea
                    name="deskripsi"
                    value={productForm.deskripsi}
                    onChange={handleInputChange}
                    placeholder="Masukan Deskripsi"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none resize-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* DESKRIPSI BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase italic">
                    DESKRIPSI DALAM BAHASA INGGRIS
                  </label>
                  <textarea
                    name="deskripsi_en"
                    value={productForm.deskripsi_en}
                    onChange={handleInputChange}
                    placeholder="Masukan Deskripsi dalam Bahasa Inggris"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none resize-none shadow-xs focus:ring-2 focus:ring-[#7EC07E] italic"
                  />
                </div>

                {/* LABEL */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    LABEL
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={productForm.label}
                    onChange={handleInputChange}
                    placeholder="Main Distributor"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* KATEGORI PRODUK (SELECT) */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    KATEGORI PRODUK
                  </label>
                  <div className="relative w-full">
                    <select
                      name="katalog"
                      value={productForm.katalog}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E] appearance-none cursor-pointer"
                    >
                      <option value="" disabled>-- Panel Marker --</option>
                      {categoryOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          --{opt}--
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* SPESIFIKASI */}
                <div className="flex flex-col items-start gap-2.5 w-full">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    SPESIFIKASI
                  </label>

                  <div className="flex flex-wrap items-center gap-2">
                    {productForm.spesifikasi.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-[#E8EFFE] text-[#3B82F6] font-medium text-xs px-3.5 py-1.5 rounded-full border border-[#D0E1FD]"
                      >
                        {spec}
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(index)}
                          className="hover:text-red-500 cursor-pointer border-none bg-transparent p-0 flex items-center"
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}

                    {showSpecInput ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={newSpecInput}
                          onChange={(e) => setNewSpecInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSpec();
                            }
                          }}
                          placeholder="Ketik spesifikasi..."
                          className="border border-[#D1D5DB] rounded-full px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-[#3B82F6]"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={handleAddSpec}
                          className="bg-[#3B82F6] text-white text-xs px-2.5 py-1 rounded-full cursor-pointer border-none font-semibold"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowSpecInput(true)}
                        className="bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280] font-normal text-xs px-3 py-1.5 rounded-full cursor-pointer border border-[#E5E7EB] transition-colors"
                      >
                        tambahkan spesifikasi
                      </button>
                    )}
                  </div>
                </div>

                {/* GAMBAR PRODUK */}
                <div className="flex flex-col items-start gap-3 w-full mt-2">
                  <label className="text-[11px] font-extrabold tracking-wider text-[#3D4947] uppercase">
                    GAMBAR PRODUK
                  </label>

                  {/* FORM TAMBAH: BOKS DROPZONE SAMA DENGAN TAMBAH KATEGORI */}
                  {viewMode === "add" && addImagesPreview.length === 0 ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
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
                  ) : (
                    /* FORM EDIT ATAU TAMBAH (SELESAI UPLOAD) */
                    <div className="w-full bg-white border border-[#D5D5D5] rounded-xl p-6 flex flex-col md:flex-row items-start justify-between gap-8">
                      <div className="w-[180px] h-[240px] border-2 border-dashed border-[#C5C5C5] rounded-xl flex items-center justify-center p-3 bg-white">
                        {(viewMode === "add" ? addImagesPreview : productForm.images).length > 0 ? (
                          <img
                            src={
                              (viewMode === "add" ? addImagesPreview : productForm.images)[
                                selectedImageIndex
                              ]?.url ||
                              (viewMode === "add" ? addImagesPreview : productForm.images)[0]?.url
                            }
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-gray-400 italic text-center">
                            Belum ada gambar
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 flex-1 w-full max-w-[480px]">
                        {(viewMode === "add" ? addImagesPreview : productForm.images).map((img, idx) => {
                          const isSelected = selectedImageIndex === idx;
                          return (
                            <div key={img.id} className="flex items-center gap-3 w-full">
                              <button
                                type="button"
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer text-xs font-semibold ${
                                  isSelected
                                    ? "bg-[#FFD600] border-[#FFD600] text-black shadow-2xs"
                                    : "bg-white border-[#D5D5D5] text-[#333333] hover:bg-gray-50"
                                }`}
                              >
                                <span className="bg-[#EAEAEA] text-[#666666] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                                  PNG
                                </span>
                                <span className="truncate">{img.name}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemoveImage(img.id)}
                                className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer border-none"
                              >
                                Hapus
                              </button>
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-1 border border-dashed border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold text-xs py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Upload size={14} />
                          Tambah Gambar
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* TOMBOL SIMPAN */}
                <div className="flex justify-start mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#7EC07E] hover:bg-[#6EB06E] text-[#0D2B14] font-bold text-sm px-8 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer border-none"
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

      {/* MODAL SIMPAN */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[540px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
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

            <div className="p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold text-[#333333] m-0">
                  Apakah anda yakin akan Menyimpan data?
                </h4>
                <p className="text-sm text-[#666666] m-0">
                  Jika data disimpan, maka akan tersimpan secara permanen
                </p>
              </div>

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

      {/* MODAL HAPUS */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[540px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
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

            <div className="p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold text-[#333333] m-0">
                  Apakah anda yakin akan menghapus data?
                </h4>
                <p className="text-sm text-[#666666] m-0">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>
              </div>

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

export default ListProductDetail;