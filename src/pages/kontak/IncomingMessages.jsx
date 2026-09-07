import { useState } from "react";
import { Search, X } from "lucide-react";

const IncomingMessages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      namaLengkap: "John Lenon",
      email: "john@gmail.com",
      noHp: "081234567890",
      negara: "Indonesia",
      pesan: "Berapa lama masa garansi yang diberikan untuk perakitan dan komponen panel?",
      tanggalKirim: "6 Agustus 2026, 15.00 WIB",
      waktuSingkat: "06/08/2026",
    },
    {
      id: 2,
      namaLengkap: "Putri",
      email: "putri@gmail.com",
      noHp: "089876543210",
      negara: "Indonesia",
      pesan: "Bagaimana prosedur penanganan jika terjadi kendala operasional?",
      tanggalKirim: "5 Agustus 2026, 10.30 WIB",
      waktuSingkat: "05/08/2026",
    },
    
  ]);

  // State Switching View Mode
  const [viewMode, setViewMode] = useState("list");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // State Search / Filter
  const [searchQuery, setSearchQuery] = useState("");

  // State Modal Hapus Custom
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Filter Messages
  const filteredMessages = messages.filter(
    (item) =>
      item.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pesan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.waktuSingkat.includes(searchQuery)
  );

  // Handler Buka Detail
  const handleOpenDetail = (item) => {
    setSelectedMessage(item);
    setViewMode("detail");
  };

  // Handler Hapus Data
  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      setMessages((prev) => prev.filter((item) => item.id !== deletingId));
      setShowDeleteModal(false);
      setDeletingId(null);
    }
  };

  // Handler Kirim Email via Mailto
  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  // Handler Kirim WhatsApp
  const handleSendWhatsApp = (noHp) => {
    const formattedPhone = noHp.replace(/^0/, "62");
    window.open(`https://wa.me/${formattedPhone}`, "_blank");
  };

  return (
    <div className="bg-[#F8F4E9] min-h-screen p-6 md:p-10 font-sans w-full relative text-left">
      <div className="w-full flex flex-col gap-6">

        {/* TAMPILAN 1: LIST PESAN MASUK TABEL*/}
        {viewMode === "list" && (
          <>
            {/* PAGE HEADER */}
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-xs text-left w-full">
              <h1 className="m-0 text-2xl font-bold text-black tracking-tight">
                Kontak
              </h1>
            </div>

            {/* CARD UTAMA */}
            <div className="bg-white rounded-xl shadow-xs text-left w-full overflow-hidden pb-8">
              <div className="px-8 py-5 border-b border-[#EAEAEA]">
                <h2 className="text-lg font-bold text-[#1A1A1A] m-0">
                  Pesan Masuk
                </h2>
              </div>

              <div className="p-8 flex flex-col gap-6 w-full">
                {/* INPUT CARI */}
                <div className="relative w-full max-w-[220px]">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-lg py-2 pl-3 pr-9 text-xs text-gray-700 outline-none focus:ring-1 focus:ring-[#4285F4]"
                  />
                  <Search
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* TABEL PESAN MASUK */}
                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-white w-full">
                  <div className="bg-[#F7F3E9] flex items-center px-6 py-3.5 font-bold text-black text-xs border-b border-[#E5E7EB]">
                    <div className="w-[8%] text-left">No</div>
                    <div className="w-[18%] text-left">Waktu</div>
                    <div className="w-[24%] text-left">Nama Pegirim</div>
                    <div className="w-[36%] text-left px-2">Pesan</div>
                    <div className="w-[14%] text-center">Aksi</div>
                  </div>

                  <div className="divide-y divide-[#EAEAEA]">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors text-xs text-gray-800"
                        >
                          <div className="w-[8%] text-left font-medium text-gray-700">
                            {index + 1}.
                          </div>

                          <div className="w-[18%] text-left text-gray-700 font-medium">
                            {item.waktuSingkat}
                          </div>

                          <div className="w-[24%] text-left font-medium text-gray-900 pr-2">
                            {item.namaLengkap}
                          </div>

                          <div className="w-[36%] text-left font-normal px-2 text-gray-600 truncate pr-4">
                            {item.pesan}
                          </div>

                          <div className="w-[14%] flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(item)}
                              className="bg-[#4285F4] hover:bg-[#3367d6] text-white font-semibold text-[11px] px-4 py-1.5 rounded-lg border-none cursor-pointer shadow-2xs transition-all"
                            >
                              Detail
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDelete(item.id)}
                              className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold text-[11px] px-4 py-1.5 rounded-lg border-none cursor-pointer shadow-2xs transition-all"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-xs text-gray-400">
                        Tidak ada pesan ditemukan
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAMPILAN 2: DETAIL PESAN MASUK*/}
        {viewMode === "detail" && selectedMessage && (
          <div className="w-full flex flex-col gap-6">
            
            {/* PAGE HEADER*/}
            <div className="bg-white rounded-xl p-5 md:px-8 shadow-xs text-left w-full">
              <h1 className="m-0 text-2xl font-bold text-black tracking-tight">
                Kontak Masuk
              </h1>
            </div>

            {/* CARD UTAMA DETAIL*/}
            <div className="bg-white rounded-xl shadow-xs text-left w-full overflow-hidden pb-12">
              <div className="px-8 py-5 border-b border-[#EAEAEA]">
                <h2 className="text-lg font-bold text-[#1A1A1A] m-0">
                  Detail Pesan Masuk
                </h2>
              </div>

              <div className="p-8 flex flex-col gap-8 w-full max-w-[800px]">
                
                {/* DRAFT LIST INFO PESAN*/}
                <div className="grid grid-cols-[140px_10px_1fr] items-baseline gap-y-3 text-sm font-normal text-black">
                  
                  {/* Nama lengkap */}
                  <span className="font-semibold text-black">Nama lengkap</span>
                  <span>:</span>
                  <span>{selectedMessage.namaLengkap}</span>

                  {/* Email */}
                  <span className="font-semibold text-black">Email</span>
                  <span>:</span>
                  <span>{selectedMessage.email}</span>

                  {/* No Hp */}
                  <span className="font-semibold text-black">No Hp</span>
                  <span>:</span>
                  <span>{selectedMessage.noHp}</span>

                  {/* Negara */}
                  <span className="font-semibold text-black">Negara</span>
                  <span>:</span>
                  <span>{selectedMessage.negara}</span>

                  {/* Pesan */}
                  <span className="font-semibold text-black">Pesan</span>
                  <span>:</span>
                  <span className="leading-relaxed">{selectedMessage.pesan}</span>

                  {/* Tanggal kirim */}
                  <span className="font-semibold text-black">Tanggal kirim</span>
                  <span>:</span>
                  <span>{selectedMessage.tanggalKirim}</span>

                </div>

                {/* TOMBOL AKSI LENGKAP */}
                <div className="flex items-center gap-3 mt-4">
                  
                  {/* 1. Kembali*/}
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-xs px-5 py-2.5 rounded-sm border-none cursor-pointer shadow-xs transition-all"
                  >
                    Kembali
                  </button>

                  {/* 2. Kirim Email*/}
                  <button
                    type="button"
                    onClick={() => handleSendEmail(selectedMessage.email)}
                    className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-bold text-xs px-5 py-2.5 rounded-sm border-none cursor-pointer shadow-xs transition-all"
                  >
                    Kirim Email
                  </button>

                  {/* 3. Kirim WhatsApp*/}
                  <button
                    type="button"
                    onClick={() => handleSendWhatsApp(selectedMessage.noHp)}
                    className="bg-[#00C853] hover:bg-[#00a843] text-white font-bold text-xs px-5 py-2.5 rounded-sm border-none cursor-pointer shadow-xs transition-all"
                  >
                    Kirim WhatsApp
                  </button>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL HAPUS CUSTOM*/}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[500px] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-8 py-5 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-bold text-[#111827] m-0">Hapus</h3>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="text-[#374151] hover:text-black cursor-pointer border-none bg-transparent p-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-bold text-[#111827] m-0">
                  Apakah anda yakin ingin menghapus data ini?
                </h4>
                <p className="text-xs text-[#4B5563] m-0">
                  Jika data dihapus makan akan hilang secara permanen
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-[#FFD600] hover:bg-[#e6c200] text-[#111827] font-semibold text-xs px-6 py-2.5 rounded-md border-none cursor-pointer shadow-2xs transition-all"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold text-xs px-6 py-2.5 rounded-md border-none cursor-pointer shadow-2xs transition-all"
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

export default IncomingMessages;