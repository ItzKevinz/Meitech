import { useState, useRef } from 'react';
import { Save, X, ChevronDown, ArrowLeft, Upload } from 'lucide-react';

const Article = () => {
  const [viewMode, setViewMode] = useState('list');

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Meitech Ekspansi ke Summarecon Bandung, Bidik Peluang Besar Bisnis Jasa & Manufaktur',
      title_en: 'Meitech Expands to Summarecon Bandung, Targeting Large Opportunities',
      publisher: 'Admin',
      date: '2026-07-20',
      description: 'Deskripsi singkat mengenai ekspansi Meitech ke Summarecon Bandung...',
      description_en: 'Short description about Meitech expansion to Summarecon Bandung...',
      quote: 'Ekspansi ini merupakan langkah strategis perusahaan.',
      quote_en: 'This expansion is a strategic step for the company.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80'
    },
    {
      id: 2,
      title: 'Targetkan Layanan Mekanikal-Elektrikal Lebih Kompetitif di Jawa Barat',
      title_en: 'Targeting Competitive Mechanical-Electrical Services in West Java',
      publisher: 'Admin',
      date: '2026-07-21',
      description: 'Deskripsi peningkatan kualitas layanan mekanikal-elektrikal...',
      description_en: 'Description of mechanical-electrical service improvements...',
      quote: 'Kualitas dan kepuasan pelanggan adalah prioritas utama.',
      quote_en: 'Quality and customer satisfaction are our top priorities.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80'
    },
    {
      id: 3,
      title: 'Penerapan Standar ISO: Jaminan Presisi Produk Sheet Metal & Panel',
      title_en: 'ISO Standard Implementation: Precision Guarantee for Sheet Metal & Panel Products',
      publisher: 'Admin',
      date: '2026-07-22',
      description: 'Standar ISO memastikan presisi tinggi pada tiap produk panel...',
      description_en: 'ISO standards ensure high precision in every panel product...',
      quote: 'Presisi tinggi adalah standar utama produksi kami.',
      quote_en: 'High precision is our primary production standard.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80'
    },
    {
      id: 4,
      title: 'Peran Strategis Meitech dalam Infrastruktur Data Center Nasional',
      title_en: 'Meitech Strategic Role in National Data Center Infrastructure',
      publisher: 'Admin',
      date: '2026-07-23',
      description: 'Dukungan penuh Meitech untuk percepatan data center nasional...',
      description_en: 'Full support from Meitech for national data center acceleration...',
      quote: 'Membangun fondasi digital Indonesia.',
      quote_en: 'Building Indonesia digital foundation.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80'
    }
  ]);

  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleInput, setArticleInput] = useState({
    date: '',
    publisher: '',
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    quote: '',
    quote_en: '',
    imageFile: null
  });
  const [articleImagePreview, setArticleImagePreview] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingArticleId, setDeletingArticleId] = useState(null);

  const fileInputRef = useRef(null);

  const formatDateToIndo = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return dateString;
    return dateObj.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleOpenAddForm = () => {
    setEditingArticleId(null);
    setArticleInput({
      date: '',
      publisher: '',
      title: '',
      title_en: '',
      description: '',
      description_en: '',
      quote: '',
      quote_en: '',
      imageFile: null
    });
    setArticleImagePreview(null);
    setViewMode('form');
  };

  const handleOpenEditForm = (item) => {
    setEditingArticleId(item.id);
    setArticleInput({
      date: item.date || '',
      publisher: item.publisher || '',
      title: item.title || '',
      title_en: item.title_en || '',
      description: item.description || '',
      description_en: item.description_en || '',
      quote: item.quote || '',
      quote_en: item.quote_en || '',
      imageFile: null
    });
    setArticleImagePreview(item.image || null);
    setViewMode('form');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleInput((prev) => ({ ...prev, imageFile: file }));
      setArticleImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setArticleInput((prev) => ({ ...prev, imageFile: file }));
      setArticleImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!articleInput.title.trim()) {
      alert('Judul artikel wajib diisi!');
      return;
    }

    if (editingArticleId) {
      setArticles((prev) =>
        prev.map((item) =>
          item.id === editingArticleId
            ? {
                ...item,
                ...articleInput,
                image: articleImagePreview || item.image
              }
            : item
        )
      );
    } else {
      const newArticle = {
        id: Date.now(),
        ...articleInput,
        image:
          articleImagePreview ||
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80'
      };
      setArticles((prev) => [...prev, newArticle]);
    }

    setViewMode('list');
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingArticleId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingArticleId) {
      setArticles((prev) => prev.filter((item) => item.id !== deletingArticleId));
      setShowDeleteModal(false);
      setDeletingArticleId(null);
    }
  };

  const handleMainSubmit = (e) => {
    e.preventDefault();
    alert('Data Artikel berhasil disimpan!');
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full relative text-left">
      <div className="w-full flex flex-col gap-6">
        
        {/* TAMPILAN LIST (TABEL CSS FLEXBOX) */}
        {viewMode === 'list' && (
          <>
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm text-left w-full">
              <h1 className="m-0 text-3xl font-bold text-black tracking-tight">Artikel</h1>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-left flex flex-col gap-7 w-full">
              <h2 className="text-2xl font-semibold text-[#1A1A1A] m-0">Semua artikel</h2>
              <hr className="border-t border-[#EAEAEA] m-0" />

              <form onSubmit={handleMainSubmit} className="flex flex-col gap-7 w-full">
                
                <div className="flex justify-start mt-2">
                  <button
                    type="button"
                    onClick={handleOpenAddForm}
                    className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                  >
                    Tambah artikel baru
                  </button>
                </div>

                {/* TABEL CUSTOM CSS (FLEXBOX) */}
                <div className="border border-[#D1D5DB] rounded-2xl overflow-hidden bg-white w-full shadow-xs mt-2">
                  
                  {/* HEADER FLEX */}
                  <div className="bg-[#F7F3E9] border-b border-[#EAEAEA] flex items-center px-4 py-3.5 font-bold text-black text-sm">
                    <div className="w-[6%] text-center">No</div>
                    <div className="w-[34%] text-center">Judul</div>
                    <div className="w-[14%] text-center">Publisher</div>
                    <div className="w-[16%] text-center">Waktu</div>
                    <div className="w-[14%] text-center">Gambar</div>
                    <div className="w-[16%] text-center">Aksi</div>
                  </div>

                  {/* ITEM BARIS FLEX */}
                  <div className="divide-y divide-[#E0E0E0]">
                    {articles.map((article, index) => (
                      <div
                        key={article.id}
                        className="flex items-center px-4 py-6 hover:bg-gray-50/80 transition-colors text-xs text-gray-800"
                      >
                        {/* No */}
                        <div className="w-[6%] text-center text-gray-700 font-normal text-sm">
                          {index + 1}.
                        </div>

                        {/* Judul (Rata Tengah) */}
                        <div className="w-[34%] text-center font-normal px-2 leading-relaxed text-sm">
                          <div className="line-clamp-2">
                            {article.title}
                          </div>
                        </div>

                        {/* Publisher */}
                        <div className="w-[14%] text-center font-normal text-sm">
                          {article.publisher}
                        </div>

                        {/* Waktu */}
                        <div className="w-[16%] text-center font-normal text-sm">
                          {formatDateToIndo(article.date)}
                        </div>

                        {/* Gambar */}
                        <div className="w-[14%] flex justify-center items-center">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-12 w-20 object-cover rounded-xl shadow-xs border border-gray-100"
                          />
                        </div>

                        {/* Aksi */}
                        <div className="w-[16%] flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditForm(article)}
                            className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer border-none"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteModal(article.id)}
                            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer border-none"
                          >
                            Hapus
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

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

        {/* TAMPILAN FORM (TAMBAH/EDIT) */}
        {viewMode === 'form' && (
          <div className="w-full flex flex-col gap-6">
            
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-sm flex items-center gap-4 w-full">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="p-2.5 rounded-lg bg-[#F7F3E9] hover:bg-[#EAE4D7] text-black transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="m-0 text-3xl font-bold text-black tracking-tight">
                {editingArticleId ? 'Edit artikel' : 'Tambah artikel baru'}
              </h1>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col gap-6 w-full">
              <form onSubmit={handleSaveArticle} className="flex flex-col gap-6 w-full">
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Field 1: WAKTU */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    WAKTU
                  </label>
                  <div className="relative w-full">
                    <input
                      type="date"
                      name="date"
                      value={articleInput.date}
                      onChange={handleInputChange}
                      placeholder="Masukan waktu pembuatan artikel"
                      className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 pr-10 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E] cursor-pointer"
                    />
                    <ChevronDown size={20} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                  </div>
                </div>

                {/* Field 2: PUBLISHER */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    PUBLISHER
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={articleInput.publisher}
                    onChange={handleInputChange}
                    placeholder="Masukan nama publisher"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 3: JUDUL */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    JUDUL
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={articleInput.title}
                    onChange={handleInputChange}
                    placeholder="Masukan judul artikel"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 4: JUDUL DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    JUDUL DALAM BAHASA INGGRIS
                  </label>
                  <input
                    type="text"
                    name="title_en"
                    value={articleInput.title_en}
                    onChange={handleInputChange}
                    placeholder="Masukan judul artikel"
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 5: DESKRIPSI */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    DESKRIPSI
                  </label>
                  <textarea
                    name="description"
                    value={articleInput.description}
                    onChange={handleInputChange}
                    placeholder="Masukan deskripsi artikel"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 6: DESKRIPSI DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    DESKRIPSI DALAM BAHASA INGGRIS
                  </label>
                  <textarea
                    name="description_en"
                    value={articleInput.description_en}
                    onChange={handleInputChange}
                    placeholder="Masukan deskripsi artikel"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 7: QUOTE */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    QUOTE
                  </label>
                  <textarea
                    name="quote"
                    value={articleInput.quote}
                    onChange={handleInputChange}
                    placeholder="Masukan quote artikel"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 8: QUOTE DALAM BAHASA INGGRIS */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    QUOTE DALAM BAHASA INGGRIS
                  </label>
                  <textarea
                    name="quote_en"
                    value={articleInput.quote_en}
                    onChange={handleInputChange}
                    placeholder="Masukan quote artikel"
                    rows={4}
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-3.5 text-sm text-[#333333] outline-none resize-none shadow-inner focus:ring-2 focus:ring-[#7EC07E]"
                  />
                </div>

                {/* Field 9: GAMBAR */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[12px] font-bold leading-4 tracking-[0.6px] text-[#3D4947] uppercase">
                    GAMBAR
                  </label>

                  {articleImagePreview ? (
                    <div className="flex items-start gap-10">
                      <div className="w-[380px] h-[220px] rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-black flex items-center justify-center">
                        <img
                          src={articleImagePreview}
                          alt="Preview Gambar"
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
                    className="inline-flex items-center justify-center bg-[#7EC07E] hover:bg-[#6EB06E] text-[#0D2B14] font-bold text-sm px-10 py-3 rounded-lg shadow-sm transition-all cursor-pointer border-none"
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

export default Article;