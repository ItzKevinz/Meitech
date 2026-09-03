import { useState, useRef } from 'react';
import { Save, X, ArrowLeft, Upload } from 'lucide-react';

const ProjectKategori = () => {
  // State Mode Tampilan: 'list' (Tabel Utama) atau 'form' (Form Tambah/Edit Projek)
  const [viewMode, setViewMode] = useState('list');

  // State Form Utama (Judul & Sub Judul Section)
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    subtitle: '',
    subtitle_en: ''
  });

  // State Daftar Item Projek Portofolio (Dummy)
  const [projects, setProjects] = useState([
    {
      id: 1,
      type: 'Panel LVMDP 2500A',
      year: '2020',
      location: 'Cikarang, Jawa Barat',
      category: 'Pengadaan Panel Distribusi Main Power Pabrik Tekstil PT Sinar Tekstil Jaya.',
      description: 'Pengadaan Panel Distribusi Main Power Pabrik Tekstil PT Sinar Tekstil Jaya.',
      description_en: 'Pengadaan Panel Distribusi Main Power Pabrik Tekstil PT Sinar Tekstil Jaya.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80'
    },
    {
      id: 2,
      type: 'Heavy Duty Racking',
      year: '2025',
      location: 'Sumedang, Jawa Barat',
      category: 'Sistem Rak Logam Pergudangan Logistik PT Global Logistik Indonesia.',
      description: 'Sistem Rak Logam Pergudangan Logistik PT Global Logistik Indonesia.',
      description_en: 'Sistem Rak Logam Pergudangan Logistik PT Global Logistik Indonesia.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80'
    }
  ]);

  // State Form Item Projek (Tambah/Edit)
  const [editingItemId, setEditingItemId] = useState(null);
  const [projectInput, setProjectInput] = useState({
    type: '',
    year: '',
    location: '',
    description: '',
    description_en: '',
    category: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // State Modal Hapus Custom
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  // Ref untuk File Explorer Upload Gambar
  const fileInputRef = useRef(null);

  // Handler input form judul utama
  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler input form item projek
  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setProjectInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handler Buka Form Tambah Projek (Pindah Tampilan)
  const handleOpenAddForm = () => {
    setEditingItemId(null);
    setProjectInput({
      type: '',
      year: '',
      location: '',
      description: '',
      description_en: '',
      category: '',
      imageFile: null
    });
    setImagePreview(null);
    setViewMode('form');
  };

  // Handler Buka Form Edit Projek (Pindah Tampilan)
  const handleOpenEditForm = (item) => {
    setEditingItemId(item.id);
    setProjectInput({
      type: item.type || '',
      year: item.year || '',
      location: item.location || '',
      description: item.description || '',
      description_en: item.description_en || item.description || '',
      category: item.category || '',
      imageFile: null
    });
    setImagePreview(item.image || null);
    setViewMode('form');
  };

  // Handler Upload Gambar
  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectInput((prev) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setProjectInput((prev) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handler Simpan Item Projek
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectInput.type.trim()) {
      alert('Tipe projek wajib diisi!');
      return;
    }

    if (editingItemId) {
      // Edit mode
      setProjects((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                ...projectInput,
                image: imagePreview || item.image
              }
            : item
        )
      );
    } else {
      // Tambah mode
      const newItem = {
        id: Date.now(),
        ...projectInput,
        image:
          imagePreview ||
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80'
      };
      setProjects((prev) => [...prev, newItem]);
    }

    setViewMode('list'); // Kembali ke tampilan tabel
  };

  // Handler Modal Hapus
  const handleOpenDeleteModal = (id) => {
    setDeletingItemId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingItemId) {
      setProjects((prev) => prev.filter((item) => item.id !== deletingItemId));
      setShowDeleteModal(false);
      setDeletingItemId(null);
    }
  };

  const handleMainSubmit = (e) => {
    e.preventDefault();
    alert('Data Projek Portofolio berhasil disimpan!');
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full relative text-left">
      <div className="w-full flex flex-col gap-6">
        
        {/* ========================================================= */}
        {/* TAMPILAN 1: LIST UTAMA (Pake FLEXBOX)                     */}
        {/* ========================================================= */}
        {viewMode === 'list' && (
          <>
            {/* Header Title 'Projek-Portofolio' */}
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm text-left w-full">
              <h1 className="m-0 text-3xl font-bold text-black tracking-tight">Projek-Portofolio</h1>
            </div>

            {/* Card Utama */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-left flex flex-col gap-7 w-full">
              <h2 className="text-2xl font-semibold text-[#1A1A1A] m-0">Projek-Portofolio</h2>
              <hr className="border-t border-[#EAEAEA] m-0" />

              {/* Form Input Judul Section */}
              <form onSubmit={handleMainSubmit} className="flex flex-col gap-7 w-full">
                
                {/* Field 1: JUDUL */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    JUDUL
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleMainChange}
                    placeholder="Masukan judul section"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 2: JUDUL DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    JUDUL DALAM BAHASA INGGRIS
                  </label>
                  <input
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleMainChange}
                    placeholder="Masukan judul section"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 3: SUB JUDUL */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    SUB JUDUL
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleMainChange}
                    placeholder="Masukan sub judul"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 4: SUB JUDUL DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    SUB JUDUL DALAM BAHASA INGGRIS
                  </label>
                  <input
                    type="text"
                    name="subtitle_en"
                    value={formData.subtitle_en}
                    onChange={handleMainChange}
                    placeholder="Masukan sub judul"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Tombol Tambah Projek Portofolio */}
                <div className="flex justify-start mt-2">
                  <button
                    type="button"
                    onClick={handleOpenAddForm}
                    className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                  >
                    Tambah Projek Portofolio
                  </button>
                </div>

                {/* TAMPILAN PORTOFOLIO RAPAH BERBASIS FLEXBOX (ANTI-GESER) */}
                <div className="border border-[#D1D5DB] rounded-2xl overflow-hidden bg-white w-full shadow-xs mt-2">
                  
                  {/* HEADER FLEX */}
                  <div className="bg-[#F7F3E9] border-b border-[#EAEAEA] flex items-center px-4 py-3.5 font-bold text-black text-sm">
                    <div className="w-[5%] text-center">No</div>
                    <div className="w-[14%] text-center">Tipe</div>
                    <div className="w-[8%] text-center">Tahun</div>
                    <div className="w-[15%] text-center">Lokasi</div>
                    <div className="w-[15%] text-center">Kategori</div>
                    <div className="w-[23%] text-center">Deskripsi</div>
                    <div className="w-[10%] text-center">Gambar</div>
                    <div className="w-[10%] text-center">Aksi</div>
                  </div>

                  {/* ITEM BARIS FLEX */}
                  <div className="divide-y divide-[#E0E0E0]">
                    {projects.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center px-4 py-6 hover:bg-gray-50/80 transition-colors text-xs text-gray-800"
                      >
                        {/* No */}
                        <div className="w-[5%] text-center text-gray-700 font-normal">
                          {index + 1}.
                        </div>

                        {/* Tipe */}
                        <div className="w-[14%] text-center font-semibold px-1 break-words">
                          {item.type}
                        </div>

                        {/* Tahun */}
                        <div className="w-[8%] text-center font-normal">
                          {item.year}
                        </div>

                        {/* Lokasi */}
                        <div className="w-[15%] text-center font-normal px-1 break-words">
                          {item.location}
                        </div>

                        {/* Kategori */}
                        <div className="w-[15%] text-center font-normal px-1 break-words">
                          {item.category}
                        </div>

                        {/* Deskripsi */}
                        <div className="w-[23%] text-center font-normal px-3 leading-relaxed break-words">
                          {item.description}
                        </div>

                        {/* Gambar */}
                        <div className="w-[10%] flex justify-center items-center">
                          <img
                            src={item.image}
                            alt={item.type}
                            className="h-12 w-20 object-cover rounded-xl shadow-xs border border-gray-100"
                          />
                        </div>

                        {/* Aksi */}
                        <div className="w-[10%] flex flex-col items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditForm(item)}
                            className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-semibold text-xs px-4 py-1.5 rounded-lg transition-all cursor-pointer border-none w-16"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteModal(item.id)}
                            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold text-xs px-4 py-1.5 rounded-lg transition-all cursor-pointer border-none w-16"
                          >
                            Hapus
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

                {/* Tombol Simpan Utama */}
                <div className="flex justify-start mt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#7EC07E] hover:bg-[#6EB06E] text-[#0D2B14] font-bold text-sm px-6 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                  >
                    <Save size={16} className="mr-2 stroke-[2.5]" />
                    Simpan
                  </button>
                </div>

              </form>
            </div>
          </>
        )}

        {/* TAMPILAN 2: FORM TAMBAH / EDIT PROJEK (viewMode === 'form') */}
        {viewMode === 'form' && (
          <div className="w-full flex flex-col gap-6">
            
            {/* Header Title dengan Panah Kembali */}
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm flex items-center gap-4 w-full">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="p-2.5 rounded-lg bg-[#F7F3E9] hover:bg-[#EAE4D7] text-black transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="m-0 text-3xl font-bold text-black tracking-tight">
                Projek-Portofolio
              </h1>
            </div>

            {/* Card Form Utama */}
            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col gap-6 w-full">
              <form onSubmit={handleSaveProject} className="flex flex-col gap-6 w-full">
                
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Field 1: TIPE */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-sm font-semibold text-[#4A4A4A]">Tipe</label>
                  <input
                    type="text"
                    name="type"
                    value={projectInput.type}
                    onChange={handleProjectInputChange}
                    placeholder="Panel LVMDP 2500A"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    required
                  />
                </div>

                {/* Field 2: TAHUN */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-sm font-semibold text-[#4A4A4A]">Tahun</label>
                  <input
                    type="text"
                    name="year"
                    value={projectInput.year}
                    onChange={handleProjectInputChange}
                    placeholder="2020"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 3: LOKASI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-sm font-semibold text-[#4A4A4A]">Lokasi</label>
                  <input
                    type="text"
                    name="location"
                    value={projectInput.location}
                    onChange={handleProjectInputChange}
                    placeholder="Cikarang, Jawa Barat"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 4: DESKRIPSI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-sm font-semibold text-[#4A4A4A]">Deskripsi</label>
                  <textarea
                    name="description"
                    value={projectInput.description}
                    onChange={handleProjectInputChange}
                    placeholder="Pengadaan Panel Distribusi Main Power Pabrik Tekstil PT Sinar Tekstil Jaya."
                    rows={3}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 5: DESKRIPSI DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-sm font-semibold text-[#4A4A4A]">
                    Deskripsi Dalam Bahasa Inggris
                  </label>
                  <textarea
                    name="description_en"
                    value={projectInput.description_en}
                    onChange={handleProjectInputChange}
                    placeholder="Pengadaan Panel Distribusi Main Power Pabrik Tekstil PT Sinar Tekstil Jaya."
                    rows={3}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 6: KATEGORI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-sm font-semibold text-[#4A4A4A]">Kategori</label>
                  <input
                    type="text"
                    name="category"
                    value={projectInput.category}
                    onChange={handleProjectInputChange}
                    placeholder="Pengadaan Panel Distribusi Main Power Pabrik Tekstil PT Sinar Tekstil Jaya."
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 7: GAMBAR */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-sm font-semibold text-[#4A4A4A]">Gambar</label>

                  {imagePreview ? (
                    <div className="flex items-start gap-10">
                      <div className="w-[380px] h-[220px] rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-black flex items-center justify-center">
                        <img
                          src={imagePreview}
                          alt="Preview Projek"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleUploadClick}
                        className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-sm px-10 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={handleUploadClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="w-[340px] h-48 border-2 border-dashed border-[#B0B0B0] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors bg-white relative overflow-hidden"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="border border-gray-300 rounded-lg px-6 py-2.5 flex items-center gap-2 bg-white shadow-2xs">
                          <Upload size={18} className="text-black" />
                          <span className="text-sm font-semibold text-black">Upload</span>
                        </div>
                        <span className="text-xs text-gray-500 italic mt-1">
                          Click atau drop gambar
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-start mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#00D000] hover:bg-[#00B000] text-white font-bold text-sm px-10 py-3 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                  >
                    Simpan
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[580px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-8 py-5 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#111827] m-0">Hapus</h3>
              <button type="button" onClick={() => setShowDeleteModal(false)} className="text-[#374151] hover:text-black cursor-pointer border-none bg-transparent p-1">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-bold text-[#111827] m-0">Apakah anda yakin ingin menghapus data ini?</h4>
                <p className="text-sm text-[#4B5563] m-0">Jika data dihapus makan akan hilang secara permanen</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button type="button" onClick={() => setShowDeleteModal(false)} className="bg-[#FDE047] hover:bg-[#facc15] text-[#111827] font-semibold text-sm px-6 py-2.5 rounded-lg border-none cursor-pointer">Kembali</button>
                <button type="button" onClick={handleConfirmDelete} className="bg-[#FF0000] hover:bg-[#dc2626] text-white font-semibold text-sm px-6 py-2.5 rounded-lg border-none cursor-pointer">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectKategori;