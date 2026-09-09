import { useState } from "react";
import { Save, Clock, ArrowLeft } from "lucide-react";

const ContactSettings = () => {
  const [viewMode, setViewMode] = useState("main");

  // State Form Utama Kontak
  const [formData, setFormData] = useState({
    kantorAlamat:
      "Ruko Magna Commercial No. 12, Summarecon Bandung, Jawa Barat",
    kantorTelepon: "+62 22 1234 567",
    pabrikAlamat: "Jl. Raya Paseh No. 45, Sumedang, Jawa Barat",
    pabrikMaps: "https://maps.google.com/...",
    jamSeninJumatBuka: "08:00",
    jamSeninJumatTutup: "17:00",
    jamSabtuBuka: "08:00",
    jamSabtuTutup: "14:00",
    jamMinggu: "TUTUP",
    emailSales: "sales@mekanikaelektrika.co.id",
    emailInfo: "info@mekanikaelektrika.co.id",
    judul: "Stay Connected",
    deskripsi:
      "Bergabunglah dengan komunitas profesional kami untuk mendapatkan update proyek terbaru, inovasi energi, dan berita industri.",
    deskripsiEn: "",
    urlLinkedIn: "https://www.linkedin.com/",
    urlInstagram: "https://www.instagram.com/",
    urlYouTube: "https://www.youtube.com/",
    urlFacebook: "https://www.facebook.com/",
  });

  // State Temporary untuk Edit Detail Sosmed
  const [editingSocial, setEditingSocial] = useState({
    keyName: "", 
    nama: "",    
    tautan: "",  
  });

  // State untuk Time Picker & Modal
  const [activePicker, setActivePicker] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectTime = (fieldName, h, m) => {
    setFormData((prev) => ({ ...prev, [fieldName]: `${h}:${m}` }));
    setActivePicker(null);
  };

  // Handler Buka Form Detail Sosmed
  const handleOpenEditSocial = (keyName, nama, tautan) => {
    setEditingSocial({ keyName, nama, tautan });
    setViewMode("editSocial");
  };

  // Handler Simpan Detail Sosmed
  const handleSaveSocialDetail = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [editingSocial.keyName]: editingSocial.tautan,
    }));
    setViewMode("main");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveModal(true);
  };

  const handleConfirmSave = () => {
    console.log("Data Kontak Disimpan:", formData);
    setShowSaveModal(false);
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full relative text-left">
      <div className="w-full flex flex-col gap-6">

        {/* TAMPILAN 1: HALAMAN UTAMA KONTAK SETTINGS*/}
        {viewMode === "main" && (
          <>
            {/* PAGE HEADER */}
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-xs text-left w-full">
              <h1 className="m-0 text-2xl font-bold text-black tracking-tight">
                Kontak
              </h1>
            </div>

            {/* CARD UTAMA */}
            <div className="bg-white rounded-xl shadow-xs text-left w-full overflow-hidden">
              <div className="px-8 py-4 border-b border-[#EAEAEA]">
                <span className="text-sm font-semibold text-gray-500">
                  kontak-Settings
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-8 w-full">
                
                {/* BARIS 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {/* Kantor */}
                  <div className="border border-gray-300 rounded-xl p-5 flex flex-col gap-4 bg-white">
                    <h3 className="text-sm font-bold text-black m-0">Kantor-Opresional</h3>
                    <div className="flex flex-col items-start gap-1">
                      <label className="text-[10px] font-extrabold text-gray-500 uppercase">ALAMAT KANTOR</label>
                      <textarea name="kantorAlamat" value={formData.kantorAlamat} onChange={handleChange} rows={3} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2.5 text-xs text-[#333333] outline-none resize-none" />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <label className="text-[10px] font-extrabold text-gray-500 uppercase">NO TELEPON</label>
                      <input type="text" name="kantorTelepon" value={formData.kantorTelepon} onChange={handleChange} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2.5 text-xs text-[#333333] outline-none" />
                    </div>
                  </div>

                  {/* Pabrik */}
                  <div className="border border-gray-300 rounded-xl p-5 flex flex-col gap-4 bg-white">
                    <h3 className="text-sm font-bold text-black m-0">Pabrik & Workshop</h3>
                    <div className="flex flex-col items-start gap-1">
                      <label className="text-[10px] font-extrabold text-gray-500 uppercase">ALAMAT PABRIK</label>
                      <textarea name="pabrikAlamat" value={formData.pabrikAlamat} onChange={handleChange} rows={3} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2.5 text-xs text-[#333333] outline-none resize-none" />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <label className="text-[10px] font-extrabold text-gray-500 uppercase">LINK GOOGLE MAPS</label>
                      <input type="text" name="pabrikMaps" value={formData.pabrikMaps} onChange={handleChange} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2.5 text-xs text-[#333333] outline-none" />
                    </div>
                  </div>

                  {/* Jam Operasional */}
                  <div className="border border-gray-300 rounded-xl p-5 flex flex-col gap-4 bg-white">
                    <h3 className="text-sm font-bold text-black m-0">Jam Operasional</h3>
                    {/* Senin - Jumat */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-500 font-semibold">Senin - Jumat</span>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col flex-1 relative">
                          <span className="text-[8px] text-gray-400">Jam Buka</span>
                          <div onClick={() => setActivePicker(activePicker === "seninBuka" ? null : "seninBuka")} className="bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2 text-xs text-center flex items-center justify-between cursor-pointer">
                            <span>{formData.jamSeninJumatBuka}</span>
                            <Clock size={12} className="text-gray-500" />
                          </div>
                          {activePicker === "seninBuka" && (
                            <div className="absolute top-12 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg flex w-28 h-32 overflow-hidden text-xs">
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">{hours.map((h) => (<div key={h} onClick={() => handleSelectTime("jamSeninJumatBuka", h, formData.jamSeninJumatBuka.split(":")[1] || "00")} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{h}</div>))}</div>
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100 border-l border-gray-200">{minutes.map((m) => (<div key={m} onClick={() => handleSelectTime("jamSeninJumatBuka", formData.jamSeninJumatBuka.split(":")[0] || "08", m)} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{m}</div>))}</div>
                            </div>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs mt-3">-</span>
                        <div className="flex flex-col flex-1 relative">
                          <span className="text-[8px] text-gray-400">Jam Tutup</span>
                          <div onClick={() => setActivePicker(activePicker === "seninTutup" ? null : "seninTutup")} className="bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2 text-xs text-center flex items-center justify-between cursor-pointer">
                            <span>{formData.jamSeninJumatTutup}</span>
                            <Clock size={12} className="text-gray-500" />
                          </div>
                          {activePicker === "seninTutup" && (
                            <div className="absolute top-12 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg flex w-28 h-32 overflow-hidden text-xs">
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">{hours.map((h) => (<div key={h} onClick={() => handleSelectTime("jamSeninJumatTutup", h, formData.jamSeninJumatTutup.split(":")[1] || "00")} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{h}</div>))}</div>
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100 border-l border-gray-200">{minutes.map((m) => (<div key={m} onClick={() => handleSelectTime("jamSeninJumatTutup", formData.jamSeninJumatTutup.split(":")[0] || "17", m)} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{m}</div>))}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sabtu */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-500 font-semibold">Sabtu</span>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col flex-1 relative">
                          <span className="text-[8px] text-gray-400">Jam Buka</span>
                          <div onClick={() => setActivePicker(activePicker === "sabtuBuka" ? null : "sabtuBuka")} className="bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2 text-xs text-center flex items-center justify-between cursor-pointer">
                            <span>{formData.jamSabtuBuka}</span>
                            <Clock size={12} className="text-gray-500" />
                          </div>
                          {activePicker === "sabtuBuka" && (
                            <div className="absolute top-12 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg flex w-28 h-32 overflow-hidden text-xs">
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">{hours.map((h) => (<div key={h} onClick={() => handleSelectTime("jamSabtuBuka", h, formData.jamSabtuBuka.split(":")[1] || "00")} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{h}</div>))}</div>
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100 border-l border-gray-200">{minutes.map((m) => (<div key={m} onClick={() => handleSelectTime("jamSabtuBuka", formData.jamSabtuBuka.split(":")[0] || "08", m)} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{m}</div>))}</div>
                            </div>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs mt-3">-</span>
                        <div className="flex flex-col flex-1 relative">
                          <span className="text-[8px] text-gray-400">Jam Tutup</span>
                          <div onClick={() => setActivePicker(activePicker === "sabtuTutup" ? null : "sabtuTutup")} className="bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2 text-xs text-center flex items-center justify-between cursor-pointer">
                            <span>{formData.jamSabtuTutup}</span>
                            <Clock size={12} className="text-gray-500" />
                          </div>
                          {activePicker === "sabtuTutup" && (
                            <div className="absolute top-12 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg flex w-28 h-32 overflow-hidden text-xs">
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">{hours.map((h) => (<div key={h} onClick={() => handleSelectTime("jamSabtuTutup", h, formData.jamSabtuTutup.split(":")[1] || "00")} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{h}</div>))}</div>
                              <div className="flex-1 overflow-y-auto divide-y divide-gray-100 border-l border-gray-200">{minutes.map((m) => (<div key={m} onClick={() => handleSelectTime("jamSabtuTutup", formData.jamSabtuTutup.split(":")[0] || "14", m)} className="p-1.5 text-center hover:bg-blue-100 cursor-pointer">{m}</div>))}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Minggu */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-500 font-semibold">Minggu</span>
                      <input type="text" name="jamMinggu" value={formData.jamMinggu} onChange={handleChange} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-lg p-2 text-xs text-red-600 font-bold outline-none" />
                    </div>
                  </div>
                </div>

                {/* BARIS 2: EMAIL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col items-start gap-2">
                    <label className="text-sm font-bold text-gray-700">Email Marketing & Sales</label>
                    <input type="email" name="emailSales" value={formData.emailSales} onChange={handleChange} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none" />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <label className="text-sm font-bold text-gray-700">Email General Information</label>
                    <input type="email" name="emailInfo" value={formData.emailInfo} onChange={handleChange} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none" />
                  </div>
                </div>

                {/* BARIS 3: JUDUL & DESKRIPSI*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
                  {/* Kolom Kiri: Judul */}
                  <div className="flex flex-col items-start gap-2 w-full">
                    <label className="text-sm font-bold text-gray-700">Judul</label>
                    <input type="text" name="judul" value={formData.judul} onChange={handleChange} placeholder="Masukan Judul" className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm font-bold text-[#333333] outline-none" />
                  </div>

                  {/* Kolom Kanan: Deskripsi*/}
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <label className="text-sm font-bold text-gray-700">Deskripsi</label>
                      <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows={3} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-xs text-[#333333] outline-none resize-none leading-relaxed" />
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                      <label className="text-sm font-bold text-gray-700 italic">Deskripsi dalam Bahasa Inggris</label>
                      <textarea name="deskripsiEn" value={formData.deskripsiEn} onChange={handleChange} placeholder="Masukan Deskripsi dalam Bahasa Inggris" rows={3} className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-xs text-[#333333] outline-none resize-none italic leading-relaxed" />
                    </div>
                  </div>
                </div>

                {/* BARIS 4: SOSMED*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex justify-between w-full items-center">
                      <label className="text-sm font-bold text-gray-700">Url LinkedIn</label>
                      <button type="button" onClick={() => handleOpenEditSocial("urlLinkedIn", "LinkedIn", formData.urlLinkedIn)} className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Edit Detail</button>
                    </div>
                    <input type="text" name="urlLinkedIn" value={formData.urlLinkedIn} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3.5 text-sm text-gray-500 cursor-not-allowed outline-none" />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <div className="flex justify-between w-full items-center">
                      <label className="text-sm font-bold text-gray-700">Url Instagram</label>
                      <button type="button" onClick={() => handleOpenEditSocial("urlInstagram", "Instagram", formData.urlInstagram)} className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Edit Detail</button>
                    </div>
                    <input type="text" name="urlInstagram" value={formData.urlInstagram} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3.5 text-sm text-gray-500 cursor-not-allowed outline-none" />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <div className="flex justify-between w-full items-center">
                      <label className="text-sm font-bold text-gray-700">Url YouTube</label>
                      <button type="button" onClick={() => handleOpenEditSocial("urlYouTube", "YouTube", formData.urlYouTube)} className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Edit Detail</button>
                    </div>
                    <input type="text" name="urlYouTube" value={formData.urlYouTube} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3.5 text-sm text-gray-500 cursor-not-allowed outline-none" />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <div className="flex justify-between w-full items-center">
                      <label className="text-sm font-bold text-gray-700">Url Facebook</label>
                      <button type="button" onClick={() => handleOpenEditSocial("urlFacebook", "Facebook", formData.urlFacebook)} className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Edit Detail</button>
                    </div>
                    <input type="text" name="urlFacebook" value={formData.urlFacebook} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3.5 text-sm text-gray-500 cursor-not-allowed outline-none" />
                  </div>
                </div>

                {/* TOMBOL SIMPAN */}
                <div className="flex justify-start mt-4">
                  <button type="submit" className="inline-flex items-center justify-center bg-[#7EC07E] hover:bg-[#6EB06E] text-[#0D2B14] font-bold text-sm px-8 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer border-none">
                    <Save size={16} className="mr-2 stroke-[2.5]" />
                    Simpan
                  </button>
                </div>

              </form>
            </div>
          </>
        )}

        {/* TAMPILAN 2: FORM DETAIL SOSMED*/}
        {viewMode === "editSocial" && (
          <div className="w-full flex flex-col gap-6">
            
            {/* Page Header */}
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-xs flex items-center gap-4 w-full">
              <button
                type="button"
                onClick={() => setViewMode("main")}
                className="p-2 rounded-lg bg-[#F7F3E9] hover:bg-[#EAE4D7] text-black transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="m-0 text-2xl font-bold text-black tracking-tight">
                Kontak-settings
              </h1>
            </div>

            {/* Section Card */}
            <div className="bg-white rounded-xl shadow-xs text-left w-full overflow-hidden">
              <div className="px-8 py-4 border-b border-[#EAEAEA]">
                <span className="text-xs text-gray-500 font-normal">
                  Detail
                </span>
              </div>

              <form onSubmit={handleSaveSocialDetail} className="p-8 flex flex-col gap-6 w-full">
                {/* Field Nama */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-normal text-gray-600">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={editingSocial.nama}
                    onChange={(e) =>
                      setEditingSocial((prev) => ({ ...prev, nama: e.target.value }))
                    }
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none"
                    required
                  />
                </div>

                {/* Field Tautan */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-xs font-normal text-gray-600">
                    Tautan
                  </label>
                  <input
                    type="text"
                    value={editingSocial.tautan}
                    onChange={(e) =>
                      setEditingSocial((prev) => ({ ...prev, tautan: e.target.value }))
                    }
                    className="w-full bg-[#F7F3E9] border border-[#EAE4D7] rounded-xl p-3.5 text-sm text-[#333333] outline-none"
                    required
                  />
                </div>

                {/* Tombol Simpan Hijau Terang */}
                <div className="flex justify-start mt-2">
                  <button
                    type="submit"
                    className="bg-[#00C81F] hover:bg-[#00b01b] text-white font-bold text-xs px-8 py-2.5 rounded-md shadow-xs transition-all cursor-pointer border-none"
                  >
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
                ✕
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
    </div>
  );
};

export default ContactSettings;