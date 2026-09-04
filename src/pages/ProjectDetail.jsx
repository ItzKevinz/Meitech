import { useState, useRef } from 'react';
import { X, ArrowLeft, Upload, Edit, Trash2 } from 'lucide-react';

const ProjectDetail = () => {
  const [viewMode, setViewMode] = useState('list');

  // State Daftar Item Projek Detail
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: 'Panel LVMDP 2500A',
      projectNameEn: 'LVMDP Panel 2500A',
      location: 'Cikarang, Jawa Barat',
      description: 'Pengadaan Panel Distribusi Main Power Pabrik Tekstil PT Sinar Tekstil Jaya.',
      descriptionEn: 'Procurement of Main Power Distribution Panel for PT Sinar Tekstil Jaya.',
      kapasitor: '2500A',
      standarProteksi: 'IP54',
      projectOverview: 'Projek ini mencakup instalasi panel distribusi daya utama pabrik...',
      sektorIndustri: 'Manufaktur Tekstil',
      sistemUtama: 'Power Distribution Panel',
      quotesText: 'Solusi handal untuk kebutuhan distribusi listrik industri.',
      type: 'Panel LVMDP 2500A',
      year: '2020',
      category: 'Panel Marker',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80'
    }
  ]);

  // State Form Input Projek 
  const [editingItemId, setEditingItemId] = useState(null);
  const [projectInput, setProjectInput] = useState({
    projectName: '',
    projectNameEn: '',
    location: '',
    description: '',
    descriptionEn: '',
    kapasitor: '',
    standarProteksi: '',
    projectOverview: '',
    sektorIndustri: '',
    sistemUtama: '',
    quotesText: '',
    
    // Tantangan Indonesia
    tantanganList: [
      { left: '', right: '' },
      { left: '', right: '' },
      { left: '', right: '' }
    ],
    
    // Tantangan Bahasa Inggris
    tantanganEnList: [
      { left: '', right: '' },
      { left: '', right: '' },
      { left: '', right: '' }
    ],
    
    spesifikasiList: [
      { parameter: 'Amphere rate', detail: '2500A' },
      { parameter: 'Tegangan Operasional', detail: '400v/3 Phase/ 30Hz' },
      { parameter: 'Standard Proteksi', detail: 'IP54 (Dust & Water Splash Resistant)' },
      { parameter: 'Komponen Utama', detail: 'Schneider Electric Masterpact ACB' },
      { parameter: 'Material Enclosure', detail: 'Cold Rolled Steel 2.0mm, Powder Coated Yellow RAL 1021' },
      { parameter: 'Busbar System', detail: 'Electrolytic Copper Busbar (Tinned)' }
    ],
    
    spesifikasiEnList: [
      { parameter: '', detail: '' },
      { parameter: '', detail: '' },
      { parameter: '', detail: '' }
    ],

    // State Upload Gambar
    thumbnailPreview: null,
    tantanganPreview: null,
    galleryBoxPreview: null, 

    // image kanan
    galleryFiles: [
      { id: 1, name: 'gambar.png' },
      { id: 2, name: 'gambar1.png' },
      { id: 3, name: 'gambar2.png' },
      { id: 4, name: 'gambar3.png' }
    ]
  });

  // Ref File Upload Interaktif
  const thumbnailInputRef = useRef(null);
  const tantanganInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // State Modal Hapus 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  // Handler Input 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handler Tabel Tantangan 
  const handleTantanganChange = (index, colKey, value) => {
    setProjectInput((prev) => {
      const updated = [...prev.tantanganList];
      updated[index] = { ...updated[index], [colKey]: value };
      return { ...prev, tantanganList: updated };
    });
  };

  const handleAddTantangan = () => {
    setProjectInput((prev) => ({
      ...prev,
      tantanganList: [...prev.tantanganList, { left: '', right: '' }]
    }));
  };

  // Handler Tabel Tantangan
  const handleTantanganEnChange = (index, colKey, value) => {
    setProjectInput((prev) => {
      const updated = [...prev.tantanganEnList];
      updated[index] = { ...updated[index], [colKey]: value };
      return { ...prev, tantanganEnList: updated };
    });
  };

  const handleAddTantanganEn = () => {
    setProjectInput((prev) => ({
      ...prev,
      tantanganEnList: [...prev.tantanganEnList, { left: '', right: '' }]
    }));
  };

  // Handler Tabel Spesifikasi
  const handleSpesifikasiChange = (index, field, value, isEn = false) => {
    const key = isEn ? 'spesifikasiEnList' : 'spesifikasiList';
    setProjectInput((prev) => {
      const updated = [...prev[key]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [key]: updated };
    });
  };

  const handleAddSpesifikasi = (isEn = false) => {
    const key = isEn ? 'spesifikasiEnList' : 'spesifikasiList';
    setProjectInput((prev) => ({
      ...prev,
      [key]: [...prev[key], { parameter: '', detail: '' }]
    }));
  };

  // Handler Upload Gambar Single
  const handleSingleImageUpload = (e, targetKey) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProjectInput((prev) => ({
        ...prev,
        [targetKey]: imageUrl
      }));
    }
  };

  // Handler Buka Form Tambah
  const handleOpenAddForm = () => {
    setEditingItemId(null);
    setProjectInput({
      projectName: '',
      projectNameEn: '',
      location: '',
      description: '',
      descriptionEn: '',
      kapasitor: '',
      standarProteksi: '',
      projectOverview: '',
      sektorIndustri: '',
      sistemUtama: '',
      quotesText: '',
      tantanganList: [
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' }
      ],
      tantanganEnList: [
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' }
      ],
      spesifikasiList: [
        { parameter: '', detail: '' },
        { parameter: '', detail: '' },
        { parameter: '', detail: '' }
      ],
      spesifikasiEnList: [
        { parameter: '', detail: '' },
        { parameter: '', detail: '' },
        { parameter: '', detail: '' }
      ],
      thumbnailPreview: null,
      tantanganPreview: null,
      galleryBoxPreview: null,
      galleryFiles: [
        { id: 1, name: 'gambar.png' },
        { id: 2, name: 'gambar1.png' },
        { id: 3, name: 'gambar2.png' },
        { id: 4, name: 'gambar3.png' }
      ]
    });
    setViewMode('form');
  };

  // Handler Buka Form Edit
  const handleOpenEditForm = (item) => {
    setEditingItemId(item.id);
    setProjectInput({
      projectName: item.projectName || item.type || '',
      projectNameEn: item.projectNameEn || '',
      location: item.location || '',
      description: item.description || '',
      descriptionEn: item.descriptionEn || item.description_en || '',
      kapasitor: item.kapasitor || '',
      standarProteksi: item.standarProteksi || '',
      projectOverview: item.projectOverview || '',
      sektorIndustri: item.sektorIndustri || '',
      sistemUtama: item.sistemUtama || '',
      quotesText: item.quotesText || '',
      tantanganList: [
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' }
      ],
      tantanganEnList: [
        { left: '', right: '' },
        { left: '', right: '' },
        { left: '', right: '' }
      ],
      spesifikasiList: [
        { parameter: 'Amphere rate', detail: '2500A' },
        { parameter: 'Tegangan Operasional', detail: '400v/3 Phase/ 30Hz' },
        { parameter: 'Standard Proteksi', detail: 'IP54 (Dust & Water Splash Resistant)' },
        { parameter: 'Komponen Utama', detail: 'Schneider Electric Masterpact ACB' },
        { parameter: 'Material Enclosure', detail: 'Cold Rolled Steel 2.0mm, Powder Coated Yellow RAL 1021' },
        { parameter: 'Busbar System', detail: 'Electrolytic Copper Busbar (Tinned)' }
      ],
      spesifikasiEnList: [
        { parameter: '', detail: '' },
        { parameter: '', detail: '' },
        { parameter: '', detail: '' }
      ],
      thumbnailPreview: item.image || null,
      tantanganPreview: null,
      galleryBoxPreview: null,
      galleryFiles: [
        { id: 1, name: 'gambar.png' },
        { id: 2, name: 'gambar1.png' },
        { id: 3, name: 'gambar2.png' },
        { id: 4, name: 'gambar3.png' }
      ]
    });
    setViewMode('form');
  };

  // Handler Simpan Item
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectInput.projectName.trim()) {
      alert('NAMA PROJECT wajib diisi!');
      return;
    }

    if (editingItemId) {
      setProjects((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                ...projectInput,
                type: projectInput.projectName,
                image: projectInput.thumbnailPreview || item.image
              }
            : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...projectInput,
        type: projectInput.projectName,
        year: new Date().getFullYear().toString(),
        category: projectInput.sektorIndustri || 'General',
        image: projectInput.thumbnailPreview || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80'
      };
      setProjects((prev) => [...prev, newItem]);
    }

    setViewMode('list');
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

  const handleMainSimpan = () => {
    alert('Data Projek-Detail berhasil disimpan!');
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full relative text-left">
      <div className="w-full flex flex-col gap-6">

        {/* TAMPILAN 1:      */}
        {viewMode === 'list' && (
          <>
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm text-left w-full">
              <h1 className="m-0 text-2xl md:text-3xl font-bold text-black tracking-tight">Projek-Detail</h1>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-left flex flex-col gap-6 w-full">
              <h2 className="text-xl font-medium text-[#4A4A4A] m-0">Projek-list</h2>
              <hr className="border-t border-[#EAEAEA] m-0" />

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={handleOpenAddForm}
                  className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-sm px-6 py-3 rounded-lg shadow-xs transition-all cursor-pointer border-none"
                >
                  Tambah Projek-Detail
                </button>
              </div>

              <div className="border border-[#D1D5DB] rounded-2xl overflow-hidden bg-white w-full shadow-xs">
                <div className="bg-[#F7F3E9] border-b border-[#EAEAEA] flex items-center px-4 py-3.5 font-bold text-black text-sm">
                  <div className="w-[6%] text-center">No</div>
                  <div className="w-[15%] text-center">Tipe</div>
                  <div className="w-[9%] text-center">Tahun</div>
                  <div className="w-[16%] text-center">Lokasi</div>
                  <div className="w-[13%] text-center">Kategori</div>
                  <div className="w-[23%] text-center">Deskripsi</div>
                  <div className="w-[18%] text-center">Gambar</div>
                </div>

                <div className="divide-y divide-[#E0E0E0]">
                  {projects.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center px-4 py-6 hover:bg-gray-50/80 transition-colors text-xs text-gray-800"
                    >
                      <div className="w-[6%] text-center text-gray-700 font-normal">
                        {index + 1}
                      </div>
                      <div className="w-[15%] text-center font-medium px-1 break-words">
                        {item.projectName || item.type}
                      </div>
                      <div className="w-[9%] text-center font-normal">
                        {item.year || '2020'}
                      </div>
                      <div className="w-[16%] text-center font-normal px-1 break-words">
                        {item.location}
                      </div>
                      <div className="w-[13%] text-center font-normal px-1 break-words">
                        {item.category || item.sektorIndustri || 'Panel Marker'}
                      </div>
                      <div className="w-[23%] text-center font-normal px-3 leading-relaxed break-words">
                        {item.description}
                      </div>
                      <div className="w-[18%] flex items-center justify-center gap-3">
                        <div className="w-24 h-14 rounded-lg overflow-hidden border border-gray-200 shadow-2xs bg-black flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.projectName || item.type}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditForm(item)}
                            className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-xs px-3 py-1 rounded-md transition-all cursor-pointer border-none shadow-2xs w-14"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteModal(item.id)}
                            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs px-3 py-1 rounded-md transition-all cursor-pointer border-none shadow-2xs w-14"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-start mt-2">
                <button
                  type="button"
                  onClick={handleMainSimpan}
                  className="bg-[#00D000] hover:bg-[#00B000] text-white font-bold text-sm px-8 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                >
                  Simpan
                </button>
              </div>
            </div>
          </>
        )}

        {/* TAMPILAN 2*/}
        {viewMode === 'form' && (
          <div className="w-full flex flex-col gap-6">
            
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm flex items-center gap-4 w-full text-left">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="p-2.5 rounded-lg bg-[#F7F3E9] hover:bg-[#EAE4D7] text-black transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="m-0 text-2xl md:text-3xl font-bold text-black tracking-tight">
                Projek-Detail
              </h1>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col gap-6 w-full text-left">
              <h2 className="text-xl font-medium text-[#4A4A4A] m-0">Projek-Portofolio</h2>
              <hr className="border-t border-[#EAEAEA] m-0" />

              <form onSubmit={handleSaveProject} className="flex flex-col gap-6 w-full">
                
                {/* 1. NAMA PROJECT */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                    NAMA PROJECT
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={projectInput.projectName}
                    onChange={handleInputChange}
                    className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    required
                  />
                </div>

                {/* 2. NAMA PROJECT  INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                    NAMA PROJECT DALAM BAHASA INGGRIS
                  </label>
                  <input
                    type="text"
                    name="projectNameEn"
                    value={projectInput.projectNameEn}
                    onChange={handleInputChange}
                    className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 3. LOKASI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                    LOKASI
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={projectInput.location}
                    onChange={handleInputChange}
                    className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 4. DESKRIPSI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                    DESKRIPSI
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={projectInput.description}
                    onChange={handleInputChange}
                    className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 5. DESKRIPSI DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                    DESKRIPSI DALAM BAHASA INGGRIS
                  </label>
                  <input
                    type="text"
                    name="descriptionEn"
                    value={projectInput.descriptionEn}
                    onChange={handleInputChange}
                    className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 6. KAPASITOR & STANDAR PROTEKSI */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                      KAPASITOR
                    </label>
                    <input
                      type="text"
                      name="kapasitor"
                      value={projectInput.kapasitor}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                      STANDAR PROTEKSI
                    </label>
                    <input
                      type="text"
                      name="standarProteksi"
                      value={projectInput.standarProteksi}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    />
                  </div>
                </div>

                {/* 7. PROJECT OVERVIEW */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                    PROJECT OVERVIEW
                  </label>
                  <textarea
                    name="projectOverview"
                    value={projectInput.projectOverview}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 8. SEKTOR INDUSTRI & SISTEM UTAMA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                      SEKTOR INDUSTRI
                    </label>
                    <input
                      type="text"
                      name="sektorIndustri"
                      value={projectInput.sektorIndustri}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-xs font-bold leading-4 tracking-[0.6px] text-[#555555] uppercase">
                      SISTEM UTAMA
                    </label>
                    <input
                      type="text"
                      name="sistemUtama"
                      value={projectInput.sistemUtama}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                    />
                  </div>
                </div>

                {/* 9. TABEL TANTANGAN DAN SOLUSI */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555]">
                    Tantangan dan solusi
                  </label>
                  <div className="border border-[#D1D5DB] rounded-lg overflow-hidden bg-white w-full">
                    <div className="bg-[#F8F4E9] border-b border-[#E0E0E0] flex py-2.5 px-4 font-bold text-xs text-black">
                      <div className="w-[8%] text-center">no</div>
                      <div className="w-[46%] text-left pl-2 border-l border-[#E0E0E0]">Point tantangan</div>
                      <div className="w-[46%] text-left pl-2 border-l border-[#E0E0E0]">Point tantangan</div>
                    </div>
                    <div className="divide-y divide-[#E0E0E0]">
                      {projectInput.tantanganList.map((row, idx) => (
                        <div key={idx} className="flex items-center bg-white">
                          <div className="w-[8%] text-center text-xs text-gray-500 font-normal py-2">
                            {idx + 1}
                          </div>
                          <div className="w-[46%] border-l border-[#E0E0E0] px-3 py-2">
                            <input
                              type="text"
                              value={row.left}
                              onChange={(e) => handleTantanganChange(idx, 'left', e.target.value)}
                              placeholder="masukan keterangan tantangan"
                              className="w-full border-none outline-none text-xs text-[#333333] bg-transparent"
                            />
                          </div>
                          <div className="w-[46%] border-l border-[#E0E0E0] px-3 py-2">
                            <input
                              type="text"
                              value={row.right}
                              onChange={(e) => handleTantanganChange(idx, 'right', e.target.value)}
                              placeholder="masukan keterangan tantangan"
                              className="w-full border-none outline-none text-xs text-[#333333] bg-transparent"
                            />
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={handleAddTantangan}
                        className="p-3 text-xs text-gray-400 cursor-pointer hover:bg-gray-50 italic border-t border-[#E0E0E0]"
                      >
                        ( + tambahkan detail )
                      </div>
                    </div>
                  </div>
                </div>

                {/* 10. TABEL SPESIFIKASI INDONESIA */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555] uppercase">
                    SPESIFIKASI
                  </label>
                  <div className="border border-[#D1D5DB] rounded-lg overflow-hidden bg-white w-full">
                    <div className="bg-[#F8F4E9] border-b border-[#E0E0E0] flex py-2.5 px-4 font-bold text-xs text-black uppercase">
                      <div className="w-[45%] text-left pl-2">PARAMETER</div>
                      <div className="w-[55%] text-left pl-2 border-l border-[#E0E0E0]">DETAIL SPESIFIKASI</div>
                    </div>
                    <div className="divide-y divide-[#E0E0E0]">
                      {projectInput.spesifikasiList.map((item, idx) => (
                        <div key={idx} className="flex items-center bg-white">
                          <div className="w-[45%] px-4 py-2 border-r border-[#E0E0E0]">
                            <input
                              type="text"
                              value={item.parameter}
                              onChange={(e) => handleSpesifikasiChange(idx, 'parameter', e.target.value, false)}
                              placeholder="masukan parameter"
                              className="w-full border-none outline-none text-xs font-semibold text-[#333333] bg-transparent"
                            />
                          </div>
                          <div className="w-[55%] px-4 py-2">
                            <input
                              type="text"
                              value={item.detail}
                              onChange={(e) => handleSpesifikasiChange(idx, 'detail', e.target.value, false)}
                              placeholder="masukan detail spesifikasi"
                              className="w-full border-none outline-none text-xs text-[#333333] bg-transparent"
                            />
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={() => handleAddSpesifikasi(false)}
                        className="p-3 text-xs text-gray-400 cursor-pointer hover:bg-gray-50 italic border-t border-[#E0E0E0]"
                      >
                        ( + tambah kolom )
                      </div>
                    </div>
                  </div>
                </div>

                {/* 11. TABEL TANTANGAN DAN SOLUSI DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555]">
                    Tantangan dan solusi dalam bahasa inggris
                  </label>
                  <div className="border border-[#D1D5DB] rounded-lg overflow-hidden bg-white w-full">
                    <div className="bg-[#F8F4E9] border-b border-[#E0E0E0] flex py-2.5 px-4 font-bold text-xs text-black">
                      <div className="w-[8%] text-center">no</div>
                      <div className="w-[46%] text-left pl-2 border-l border-[#E0E0E0]">Point tantangan</div>
                      <div className="w-[46%] text-left pl-2 border-l border-[#E0E0E0]">Point tantangan</div>
                    </div>
                    <div className="divide-y divide-[#E0E0E0]">
                      {projectInput.tantanganEnList.map((row, idx) => (
                        <div key={idx} className="flex items-center bg-white">
                          <div className="w-[8%] text-center text-xs text-gray-500 font-normal py-2">
                            {idx + 1}
                          </div>
                          <div className="w-[46%] border-l border-[#E0E0E0] px-3 py-2">
                            <input
                              type="text"
                              value={row.left}
                              onChange={(e) => handleTantanganEnChange(idx, 'left', e.target.value)}
                              placeholder="masukan keterangan tantangan"
                              className="w-full border-none outline-none text-xs text-[#333333] bg-transparent"
                            />
                          </div>
                          <div className="w-[46%] border-l border-[#E0E0E0] px-3 py-2">
                            <input
                              type="text"
                              value={row.right}
                              onChange={(e) => handleTantanganEnChange(idx, 'right', e.target.value)}
                              placeholder="masukan keterangan tantangan"
                              className="w-full border-none outline-none text-xs text-[#333333] bg-transparent"
                            />
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={handleAddTantanganEn}
                        className="p-3 text-xs text-gray-400 cursor-pointer hover:bg-gray-50 italic border-t border-[#E0E0E0]"
                      >
                        ( + tambahkan detail )
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12. TABEL SPESIFIKASI DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555] uppercase">
                    SPESIFIKASI DALAM BAHASA INGGRIS
                  </label>
                  <div className="border border-[#D1D5DB] rounded-lg overflow-hidden bg-white w-full">
                    <div className="bg-[#F8F4E9] border-b border-[#E0E0E0] flex py-2.5 px-4 font-bold text-xs text-black uppercase">
                      <div className="w-[45%] text-left pl-2">PARAMETER</div>
                      <div className="w-[55%] text-left pl-2 border-l border-[#E0E0E0]">DETAIL SPESIFIKASI</div>
                    </div>
                    <div className="divide-y divide-[#E0E0E0]">
                      {projectInput.spesifikasiEnList.map((item, idx) => (
                        <div key={idx} className="flex items-center bg-white">
                          <div className="w-[45%] px-4 py-2 border-r border-[#E0E0E0]">
                            <input
                              type="text"
                              value={item.parameter}
                              onChange={(e) => handleSpesifikasiChange(idx, 'parameter', e.target.value, true)}
                              placeholder="masukan parameter"
                              className="w-full border-none outline-none text-xs text-[#333333] bg-transparent"
                            />
                          </div>
                          <div className="w-[55%] px-4 py-2">
                            <input
                              type="text"
                              value={item.detail}
                              onChange={(e) => handleSpesifikasiChange(idx, 'detail', e.target.value, true)}
                              placeholder="masukan detail spesifikasi"
                              className="w-full border-none outline-none text-xs text-[#333333] bg-transparent"
                            />
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={() => handleAddSpesifikasi(true)}
                        className="p-3 text-xs text-gray-400 cursor-pointer hover:bg-gray-50 italic border-t border-[#E0E0E0]"
                      >
                        ( + tambah kolom )
                      </div>
                    </div>
                  </div>
                </div>

                {/* 13. QUOTES TEXT */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555]">
                    Quotes Text
                  </label>
                  <input
                    type="text"
                    name="quotesText"
                    value={projectInput.quotesText}
                    onChange={handleInputChange}
                    className="w-full bg-[#F8F4E9] border border-[#EBE3D3] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-xs focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* 14. PROJEK THUMBNAIL */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555] uppercase">
                    PROJEK THUMBNAIL
                  </label>
                  
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    onChange={(e) => handleSingleImageUpload(e, 'thumbnailPreview')}
                    className="hidden"
                    accept="image/*"
                  />

                  <div
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="w-[380px] h-48 border-2 border-dashed border-[#B0B0B0] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white relative overflow-hidden group"
                  >
                    {projectInput.thumbnailPreview ? (
                      <>
                        <img
                          src={projectInput.thumbnailPreview}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              thumbnailInputRef.current?.click();
                            }}
                            className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer border-none"
                          >
                            <Edit size={14} /> Ganti
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProjectInput((prev) => ({ ...prev, thumbnailPreview: null }));
                            }}
                            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer border-none"
                          >
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="border border-gray-300 rounded-lg px-6 py-2 flex items-center gap-2 bg-white shadow-2xs">
                          <Upload size={16} className="text-black" />
                          <span className="text-xs font-semibold text-black">Upload</span>
                        </div>
                        <span className="text-[11px] text-gray-400 italic mt-1">
                          Click atau drop gambar
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 15. GAMBAR TANTANGAN DAN SOLUSI */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555] uppercase">
                    GAMBAR TANTANGAN DAN SOLUSI
                  </label>

                  <input
                    type="file"
                    ref={tantanganInputRef}
                    onChange={(e) => handleSingleImageUpload(e, 'tantanganPreview')}
                    className="hidden"
                    accept="image/*"
                  />

                  <div
                    onClick={() => tantanganInputRef.current?.click()}
                    className="w-[380px] h-48 border-2 border-dashed border-[#B0B0B0] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white relative overflow-hidden group"
                  >
                    {projectInput.tantanganPreview ? (
                      <>
                        <img
                          src={projectInput.tantanganPreview}
                          alt="Tantangan"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              tantanganInputRef.current?.click();
                            }}
                            className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer border-none"
                          >
                            <Edit size={14} /> Ganti
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProjectInput((prev) => ({ ...prev, tantanganPreview: null }));
                            }}
                            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer border-none"
                          >
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="border border-gray-300 rounded-lg px-6 py-2 flex items-center gap-2 bg-white shadow-2xs">
                          <Upload size={16} className="text-black" />
                          <span className="text-xs font-semibold text-black">Upload</span>
                        </div>
                        <span className="text-[11px] text-gray-400 italic mt-1">
                          Click atau drop gambar
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 16. GALERI PORTOFOLIO */}
                <div className="flex flex-col items-start gap-2 w-full mt-2">
                  <label className="text-xs font-bold text-[#555555] uppercase">
                    GALERI PORTOFOLIO
                  </label>
                  <div className="border border-[#D1D5DB] rounded-2xl p-6 bg-white w-full flex flex-col md:flex-row items-center gap-8">
                    
                    {/* Input file  */}
                    <input
                      type="file"
                      ref={galleryInputRef}
                      onChange={(e) => handleSingleImageUpload(e, 'galleryBoxPreview')}
                      className="hidden"
                      accept="image/*"
                    />

                    {/* Box Upload Kiri */}
                    <div
                      onClick={() => galleryInputRef.current?.click()}
                      className="w-[340px] h-44 border-2 border-dashed border-[#B0B0B0] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white relative overflow-hidden flex-shrink-0 group"
                    >
                      {projectInput.galleryBoxPreview ? (
                        <>
                          <img
                            src={projectInput.galleryBoxPreview}
                            alt="Galeri Portofolio"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                galleryInputRef.current?.click();
                              }}
                              className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer border-none"
                            >
                              <Edit size={14} /> Ganti
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setProjectInput((prev) => ({ ...prev, galleryBoxPreview: null }));
                              }}
                              className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer border-none"
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="border border-gray-300 rounded-lg px-6 py-2 flex items-center gap-2 bg-white shadow-2xs">
                            <Upload size={16} className="text-black" />
                            <span className="text-xs font-semibold text-black">Upload</span>
                          </div>
                          <span className="text-[11px] text-gray-400 italic mt-1">
                            Click atau drop gambar
                          </span>
                        </div>
                      )}
                    </div>

                    {/* List File Terupload */}
                    <div className="flex flex-col gap-3 w-full max-w-[420px]">
                      {projectInput.galleryFiles.map((f) => (
                        <div key={f.id} className="flex items-center gap-3 w-full">
                          <div className="flex-1 border border-[#D1D5DB] rounded-lg py-2.5 px-4 text-xs font-normal text-[#333333] bg-white shadow-2xs flex items-center gap-2 overflow-hidden">
                            <span className="bg-gray-100 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-300 text-gray-600 flex-shrink-0">
                              PNG
                            </span>
                            <span className="truncate">{f.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => e.preventDefault()}
                            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer border-none shadow-2xs flex-shrink-0 select-none"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Tombol Simpan Hijau */}
                <div className="flex justify-start mt-6">
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

      {/* hpus*/}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[580px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-8 py-5 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#111827] m-0">Hapus</h3>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="text-[#374151] hover:text-black cursor-pointer border-none bg-transparent p-1"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-bold text-[#111827] m-0">
                  Apakah anda yakin ingin menghapus data ini?
                </h4>
                <p className="text-sm text-[#4B5563] m-0">
                  Jika data dihapus makan akan hilang secara permanen
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-[#FDE047] hover:bg-[#facc15] text-[#111827] font-semibold text-sm px-6 py-2.5 rounded-lg border-none cursor-pointer"
                >
                  Kembali

                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="bg-[#FF0000] hover:bg-[#dc2626] text-white font-semibold text-sm px-6 py-2.5 rounded-lg border-none cursor-pointer"
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

export default ProjectDetail;