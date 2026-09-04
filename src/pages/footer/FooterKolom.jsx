import { useRef, useState } from "react";
import { Save } from "lucide-react";
import instagramLogo from "../../assets/footer/Instagram-logo.png";
import linkedinLogo from "../../assets/footer/Linkedin-logo.png";
import facebookLogo from "../../assets/footer/Facebook-logo.png";

const FooterKolom = () => {
  const [mode, setMode] = useState("list");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);

  const fileInputRef = useRef(null);

  const [columns, setColumns] = useState([
    {
      id: 1,
      name: "Profile Meitech",
      column: "Kolom 1",
      text: "Produsen panel listrik terpercaya untuk kebutuhan industri, gedung, dan infrastruktur dengan standar teknis presisi tinggi.",
      services: [],
      socialMedia: [
        {
          id: 1,
          name: "Instagram",
          link: "instagram.com",
          icon: instagramLogo,
        },
        {
          id: 2,
          name: "LinkedIn",
          link: "linkedin.com",
          icon: linkedinLogo,
        },
        {
          id: 3,
          name: "Facebook",
          link: "facebook.com",
          icon: facebookLogo,
        },
      ],
    },

    {
      id: 2,
      name: "Produk Meitech",
      column: "Footer Kolom 2",
      text: "",
      services: [
        "Panel Maker",
        "Sheet Metal",
        "Distribution Suntree",
        "Support PV",
      ],
      socialMedia: [],
    },

    {
      id: 3,
      name: "Layanan Kami",
      column: "Footer Kolom 3",
      text: "",
      services: ["FAQ", "Artikel", "Kontak Kami", "Karir"],
      socialMedia: [],
    },

    {
      id: 4,
      name: "Alamat Kantor",
      column: "Footer Kolom 4",
      text: "",
      services: [],
      socialMedia: [],
      address:
        "Magna Commercial MC 21 Summarecon Bandung, Rancabolang, Kec. Gedebage, Kota Bandung, Jawa Barat 40295",
      email: "info@mekanikalistrik.co.id",
      phone: "+62 812-3456-7890",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    column: "",
    text: "",
    services: [],
    socialMedia: [],
    address: "",
    email: "",
    phone: "",
  });

  const [socialFormData, setSocialFormData] = useState({
    name: "",
    link: "",
    icon: "",
  });

  // =====================================================
  // INPUT FOOTER
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // EDIT FOOTER
  // =====================================================

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name,
      column: item.column,
      text: item.text || "",
      services: item.services || [],
      socialMedia: item.socialMedia || [],
      address: item.address || "",
      email: item.email || "",
      phone: item.phone || "",
    });

    setMode("edit");
  };

  // =====================================================
  // SIMPAN FOOTER
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.column.trim()) {
      return;
    }

    setColumns((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              name: formData.name,
              column: formData.column,
              text: formData.text,
              services: formData.services,
              socialMedia: formData.socialMedia,
              address: formData.address,
              email: formData.email,
              phone: formData.phone,
            }
          : item,
      ),
    );

    setEditingId(null);
    setMode("list");
  };

  // =====================================================
  // HAPUS SERVICE
  // =====================================================

  const handleDeleteService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((item) => item !== service),
    }));
  };

  // =====================================================
  // EDIT SOCIAL MEDIA
  // =====================================================

  const handleEditSocialMedia = (social) => {
    setSelectedSocialMedia(social);

    setSocialFormData({
      name: social.name,
      link: social.link,
      icon: social.icon,
    });

    setMode("social-edit");
  };

  // =====================================================
  // INPUT SOCIAL MEDIA
  // =====================================================

  const handleSocialChange = (e) => {
    const { name, value } = e.target;

    setSocialFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // UPLOAD ICON
  // =====================================================

  const handleIconUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const iconUrl = URL.createObjectURL(file);

    setSocialFormData((prev) => ({
      ...prev,
      icon: iconUrl,
    }));
  };

  // =====================================================
  // SIMPAN SOCIAL MEDIA
  // =====================================================

  const handleSocialSubmit = (e) => {
    e.preventDefault();

    if (!selectedSocialMedia) return;

    setFormData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.map((social) =>
        social.id === selectedSocialMedia.id
          ? {
              ...social,
              name: socialFormData.name,
              link: socialFormData.link,
              icon: socialFormData.icon,
            }
          : social,
      ),
    }));

    setSelectedSocialMedia(null);
    setMode("edit");
  };

  // =====================================================
  // HAPUS SOCIAL MEDIA
  // =====================================================

  const handleDeleteSocialMedia = (id) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((social) => social.id !== id),
    }));
  };

  // =====================================================
  // HAPUS FOOTER
  // =====================================================

  const handleDelete = (id) => {
    setSelectedColumnId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedColumnId === null) return;

    setColumns((prev) => prev.filter((item) => item.id !== selectedColumnId));

    setSelectedColumnId(null);
    setDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setSelectedColumnId(null);
    setDeleteModalOpen(false);
  };

  // =====================================================
  // SIMPAN UTAMA
  // =====================================================

  const handleSave = () => {
    console.log("Data Footer Kolom:", columns);
  };

  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-['Nunito_Sans']">
      {/* ================================================= */}
      {/* PAGE TITLE */}
      {/* ================================================= */}

      <div className="mb-2 rounded-md bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[18px] font-extrabold text-[#171717]">
          {mode === "social-edit" ? "Social Media" : "Footer-Kolom"}
        </h1>
      </div>

      {/* ================================================= */}
      {/* MODE LIST */}
      {/* ================================================= */}

      {mode === "list" && (
        <section className="rounded-md bg-white shadow-sm">
          {/* HEADER */}
          <div className="border-b border-[#E5E5E5] px-5 py-3">
            <h2 className="text-[15px] font-bold text-[#171717]">List Kolom</h2>
          </div>

          {/* TABLE */}
          <div className="px-5 pb-5 pt-5">
            <div className="overflow-hidden rounded-md border border-[#D5D5D5] shadow-sm">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  <col className="w-[10%]" />
                  <col className="w-[30%]" />
                  <col className="w-[30%]" />
                  <col className="w-[30%]" />
                </colgroup>

                <thead>
                  <tr className="bg-[#F7F3E9]">
                    <th className="border-b border-[#D5D5D5] px-3 py-3 !text-center align-middle text-[11px] font-bold text-[#333]">
                      No
                    </th>

                    <th className="border-b border-[#D5D5D5] px-3 py-3 text-center align-middle text-[11px] font-bold text-[#333]">
                      Nama Kolom
                    </th>

                    <th className="border-b border-[#D5D5D5] px-3 py-3 text-center align-middle text-[11px] font-bold text-[#333]">
                      Kolom
                    </th>

                    <th className="border-b border-[#D5D5D5] px-3 py-3 !text-center align-middle text-[11px] font-bold text-[#333]">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {columns.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border-b border-[#E5E5E5] px-3 py-3 text-center align-middle !text-[12px] text-[#333]">
                        {index + 1}
                      </td>

                      <td className="border-b border-[#E5E5E5] px-3 py-3 text-center align-middle !text-[12px] text-[#333]">
                        {item.name}
                      </td>

                      <td className="border-b border-[#E5E5E5] px-3 py-3 text-center align-middle !text-[12px] text-[#333]">
                        {item.column}
                      </td>

                      <td className="border-b border-[#E5E5E5] px-3 py-3 text-center align-middle">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="rounded-md bg-[#FDCB01] px-3 py-1.5 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="rounded-md bg-[#FF0000] px-3 py-1.5 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {columns.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="h-[58px] text-center align-middle text-[12px] text-[#777]"
                      >
                        Belum ada kolom footer
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-end px-5 pb-5 pt-1">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 rounded-md bg-[#7FC97F] px-5 py-2 text-[10px] font-bold text-[#222] shadow-sm transition hover:brightness-95"
            >
              <Save size={11} />
              Simpan
            </button>
          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* MODE EDIT */}
      {/* ================================================= */}

      {mode === "edit" && (
        <section className="rounded-md bg-white shadow-sm">
          {/* HEADER */}
          <div className="border-b border-[#E5E5E5] px-5 py-3">
            <h2 className="text-[15px] font-bold text-[#171717]">Edit</h2>
          </div>

          <form onSubmit={handleSubmit} className="px-16 py-5">
            {/* ========================================= */}
            {/* PROFILE MEITECH */}
            {/* ========================================= */}

            {editingId === 1 && (
              <>
                {/* NAMA FOOTER */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Nama Footer
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* KOLOM */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Kolom
                  </label>

                  <input
                    type="text"
                    name="column"
                    value={formData.column}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* TEXT */}
                <div className="mb-5">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Text
                  </label>

                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* LIST SOCIAL MEDIA */}
                <div className="mb-5">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    List Social Media
                  </label>

                  <div className="overflow-hidden border border-[#D5D5D5]">
                    <table className="w-full table-fixed border-collapse">
                      <colgroup>
                        <col className="w-[8%]" />
                        <col className="w-[22%]" />
                        <col className="w-[25%]" />
                        <col className="w-[15%]" />
                        <col className="w-[30%]" />
                      </colgroup>

                      <thead>
                        <tr className="bg-[#F7F3E9]">
                          <th className="border-b border-[#D5D5D5] px-2 py-2 !text-center text-[10px] font-bold">
                            No
                          </th>

                          <th className="border-b border-[#D5D5D5] px-2 py-2 text-center text-[10px] font-bold">
                            Nama
                          </th>

                          <th className="border-b border-[#D5D5D5] px-2 py-2 text-center text-[10px] font-bold">
                            Tautan
                          </th>

                          <th className="border-b border-[#D5D5D5] px-2 py-2 !text-center text-[10px] font-bold">
                            Icon
                          </th>

                          <th className="border-b border-[#D5D5D5] px-2 py-2 !text-center text-[10px] font-bold">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {formData.socialMedia.map((social, index) => (
                          <tr key={social.id}>
                            <td className="border-b border-[#D5D5D5] px-2 py-2 text-center align-middle text-[10px]">
                              {index + 1}
                            </td>

                            <td className="border-b border-[#D5D5D5] px-2 py-2 text-center align-middle text-[10px]">
                              {social.name}
                            </td>

                            <td className="border-b border-[#D5D5D5] px-2 py-2 text-center align-middle text-[10px]">
                              {social.link}
                            </td>

                            <td className="border-b border-[#D5D5D5] px-2 py-2 text-center align-middle">
                              <div className="flex h-full w-full items-center justify-center">
                                <img
                                  src={social.icon}
                                  alt={social.name}
                                  className="h-[36px] w-[36px] object-contain"
                                />
                              </div>
                            </td>

                            <td className="border-b border-[#D5D5D5] px-2 py-2 text-center align-middle">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEditSocialMedia(social)}
                                  className="rounded-md bg-[#FDCB01] px-3 py-1 text-[9px] font-bold text-black transition hover:brightness-95"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteSocialMedia(social.id)
                                  }
                                  className="rounded-md bg-[#FF0000] px-3 py-1 text-[9px] font-bold text-black transition hover:brightness-95"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ========================================= */}
            {/* PRODUK MEITECH */}
            {/* ========================================= */}

            {(editingId === 2 || editingId === 3) && (
              <>
                {/* NAMA FOOTER */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Nama Footer
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* KOLOM */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Kolom
                  </label>

                  <input
                    type="text"
                    name="column"
                    value={formData.column}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* LAYANAN */}
                <div className="mb-5">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Layanan
                  </label>

                  <div className="flex min-h-[45px] flex-wrap items-center gap-1.5 rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2 shadow-sm">
                    {formData.services.map((service) => (
                      <span
                        key={service}
                        className="flex items-center gap-1 rounded-full bg-[#DCEAFF] px-2 py-1 text-[8px] text-[#55708F]"
                      >
                        {service}

                        <button
                          type="button"
                          onClick={() => handleDeleteService(service)}
                          className="text-[9px] font-bold text-[#55708F] hover:text-black"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ========================================= */}
            {/* KOLOM 3 & 4 */}
            {/* ========================================= */}

            {editingId === 4 && (
              <>
                {/* NAMA FOOTER */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Nama Footer
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* KOLOM */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Kolom
                  </label>

                  <input
                    type="text"
                    name="column"
                    value={formData.column}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* ALAMAT */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                    Alamat
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] text-[#555]">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] font-bold text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>

                {/* TELPON */}
                <div className="mb-5">
                  <label className="mb-1.5 block text-[10px] text-[#555]">
                    Telpon
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] font-bold text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
                  />
                </div>
              </>
            )}

            {/* ========================================= */}
            {/* SIMPAN */}
            {/* ========================================= */}

            <div
              className={`flex pt-2 ${
                editingId === 2 ? "justify-start pt-[160px]" : "justify-start"
              }`}
            >
              <button
                type="submit"
                className="flex items-center gap-1 rounded-md bg-[#00C800] px-5 py-2 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
              >
                <Save size={11} />
                Simpan
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ================================================= */}
      {/* SOCIAL MEDIA EDIT */}
      {/* ================================================= */}

      {mode === "social-edit" && (
        <section className="rounded-md bg-white shadow-sm">
          {/* HEADER */}
          <div className="border-b border-[#E5E5E5] px-5 py-3">
            <h2 className="text-[15px] font-bold text-[#171717]">Edit</h2>
          </div>

          <form onSubmit={handleSocialSubmit} className="px-16 py-5">
            {/* NAMA */}
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                Nama
              </label>

              <input
                type="text"
                name="name"
                value={socialFormData.name}
                onChange={handleSocialChange}
                className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
              />
            </div>

            {/* TAUTAN */}
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                Tautan
              </label>

              <input
                type="text"
                name="link"
                value={socialFormData.link}
                onChange={handleSocialChange}
                className="w-full rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 py-2.5 text-[10px] text-[#333] shadow-sm outline-none focus:border-[#FDCB01]"
              />
            </div>

            {/* ICON */}
            <div className="mb-5">
              <label className="mb-1.5 block text-[10px] font-bold text-[#555]">
                Icon
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleIconUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-[35px] w-full items-center rounded-md border border-[#D5D5D5] bg-[#F7F3E9] px-3 shadow-sm outline-none transition hover:border-[#FDCB01]"
              >
                <div className="flex items-center justify-start">
                  {socialFormData.icon && (
                    <img
                      src={socialFormData.icon}
                      alt="Icon"
                      className="h-[36px] w-[36px] object-contain"
                    />
                  )}
                </div>
              </button>
            </div>

            {/* SIMPAN */}
            <div className="flex justify-start pt-2">
              <button
                type="submit"
                className="flex items-center gap-1 rounded-md bg-[#00C800] px-5 py-2 text-[10px] font-bold text-black shadow-sm transition hover:brightness-95"
              >
                <Save size={11} />
                Simpan
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[500px] overflow-hidden rounded-md bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#D9D9D9] px-5 py-4">
              <h3 className="text-[15px] font-bold text-[#222]">Hapus</h3>

              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="text-[25px] font-light leading-none text-black transition hover:opacity-60"
              >
                ×
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-5 py-5">
              <p className="mb-2 text-[12px] font-bold text-[#333]">
                Apakah anda yakin ingin menghapus kolom ini?
              </p>

              <p className="text-[10px] text-[#555]">
                Kolom ini akan dihapus secara permanen
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex gap-3 px-5 pb-5">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="rounded-md bg-[#FFD000] px-3 py-1.5 text-[10px] font-bold text-black transition hover:brightness-95"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-md bg-[#FF0000] px-3 py-1.5 text-[10px] font-bold text-black transition hover:brightness-95"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterKolom;
