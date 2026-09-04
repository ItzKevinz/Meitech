import { useRef, useState } from "react";
import { UserRound, Search, Save } from "lucide-react";

const UserSettings = () => {
  const fileInputRef = useRef(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin meitech",
      email: "indociptap@gmail.com",
      phone: "08XXXXXXXXXX",
      role: "Admin",
      photo: null,
    },
    {
      id: 2,
      name: "User",
      email: "user@gmail.com",
      phone: "082-XXX-XXX-XX",
      role: "User",
      photo: null,
    },
  ]);

  const [search, setSearch] = useState("");

  // list | add | edit | detail
  const [mode, setMode] = useState("list");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    photo: null,
  });

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword)
    );
  });

  // =========================
  // TAMBAH
  // =========================
  const handleAddUser = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      photo: null,
    });

    setSelectedUser(null);
    setMode("add");
  };

  // =========================
  // DETAIL
  // =========================
  const handleDetail = (user) => {
    setSelectedUser(user);
    setMode("detail");
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (user) => {
    setSelectedUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      phone: user.phone,
      role: user.role,
      photo: user.photo || null,
    });

    setMode("edit");
  };

  // =========================
  // DELETE
  // =========================
const handleDelete = (user) => {
  setSelectedUser(user);
  setDeleteModalOpen(true);
};

const handleCloseDeleteModal = () => {
  setSelectedUser(null);
  setDeleteModalOpen(false);
};

const handleConfirmDelete = () => {
  if (!selectedUser) return;

  console.log("Hapus pengguna:", selectedUser);

  setSelectedUser(null);
  setDeleteModalOpen(false);
};

  // =========================
  // INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // FOTO
  // =========================
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      photo: imageUrl,
    }));
  };

  // =========================
  // SIMPAN
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "add") {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        photo: formData.photo,
      };

      setUsers((prev) => [...prev, newUser]);
    }

    if (mode === "edit") {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                photo: formData.photo,
              }
            : user
        )
      );
    }

    setMode("list");
    setSelectedUser(null);
  };

  // =========================
  // KEMBALI
  // =========================
  const handleBack = () => {
    setMode("list");
    setSelectedUser(null);
  };

  // =========================================================
  // DETAIL
  // =========================================================
  if (mode === "detail") {
    return (
      <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-['Nunito_Sans']">
        {/* PAGE TITLE */}
        <div className="mb-3 rounded-md bg-white px-5 py-4 shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
          <h1 className="text-[18px] font-extrabold text-[#555]">
            Pengaturan Pengguna
          </h1>
        </div>

        {/* DETAIL CARD */}
        <section className="rounded-[8px] bg-white shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
          {/* HEADER */}
          <div className="border-b border-[#E5E5E5] px-5 py-3">
            <h2 className="text-[14px] font-bold text-[#333]">
              Detail
            </h2>
          </div>

          <div className="px-[36px] py-[20px]">
            {/* FOTO */}
            <div className="mb-[24px]">
              {selectedUser?.photo ? (
                <img
                  src={selectedUser.photo}
                  alt="Foto Profil"
                  className="h-[62px] w-[62px] rounded-full object-cover"
                />
              ) : (
                <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#9EA1A3]">
                  <UserRound
                    size={39}
                    strokeWidth={2.2}
                    className="text-white"
                  />
                </div>
              )}
            </div>

            {/* DATA */}
            <div className="space-y-[14px] text-[11px] text-[#555]">
              <div className="flex">
                <div className="w-[70px] font-semibold">
                  Nama
                </div>

                <div className="w-[20px]">
                  :
                </div>

                <div>
                  {selectedUser?.name}
                </div>
              </div>

              <div className="flex">
                <div className="w-[70px] font-semibold">
                  Email
                </div>

                <div className="w-[20px]">
                  :
                </div>

                <div>
                  {selectedUser?.email}
                </div>
              </div>

              <div className="flex">
                <div className="w-[70px] font-semibold">
                  No. Telepon
                </div>

                <div className="w-[20px]">
                  :
                </div>

                <div>
                  {selectedUser?.phone}
                </div>
              </div>

              <div className="flex">
                <div className="w-[70px] font-semibold">
                  Role
                </div>

                <div className="w-[20px]">
                  :
                </div>

                <div>
                  {selectedUser?.role}
                </div>
              </div>
            </div>

            {/* KEMBALI */}
            <div className="pt-[32px]">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-[4px] bg-[#E8A05C] px-[13px] py-[5px] text-[10px] font-bold text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:brightness-95"
              >
                Kembali
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // =========================================================
  // ADD / EDIT
  // =========================================================
  if (mode === "add" || mode === "edit") {
    return (
      <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-['Nunito_Sans']">
        {/* PAGE TITLE */}
        <div className="mb-3 rounded-md bg-white px-5 py-4 shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
          <h1 className="text-[18px] font-extrabold text-[#555]">
            Pengaturan Pengguna
          </h1>
        </div>

        {/* FORM CARD */}
        <section className="rounded-[8px] bg-white shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
          {/* HEADER */}
          <div className="border-b border-[#E5E5E5] px-5 py-3">
            <h2 className="text-[14px] font-bold text-[#555]">
              {mode === "add" ? "Tambah" : "Edit"}
            </h2>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="px-[46px] py-[26px]"
          >
            {/* FOTO PROFIL */}
            <div className="mb-[17px]">
              <label className="mb-1.5 block text-[11px] font-semibold text-[#555]">
                Foto Profil
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex h-[36px] w-full cursor-pointer items-center rounded-[5px] border border-[#D5D5D5] bg-white px-3 shadow-[0_2px_3px_rgba(0,0,0,0.18)] transition hover:border-[#FDCB01]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                <span className="rounded-[3px] border border-[#CFCFCF] bg-[#F5F5F5] px-2 py-[2px] text-[8px] text-[#555]">
                  Choose File
                </span>

                <span className="ml-3 text-[9px] text-[#A5A5A5]">
                  {formData.photo
                    ? "File dipilih"
                    : "No File Chosen"}
                </span>
              </div>
            </div>

            {/* NAMA */}
            <div className="mb-[17px]">
              <label className="mb-1.5 block text-[11px] font-semibold text-[#555]">
                Nama
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan Nama"
                className="h-[36px] w-full rounded-[5px] border border-[#D5D5D5] bg-white px-3 text-[10px] text-[#444] shadow-[0_2px_3px_rgba(0,0,0,0.18)] outline-none placeholder:text-[#B5B5B5] focus:border-[#FDCB01]"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-[17px]">
              <label className="mb-1.5 block text-[11px] font-semibold text-[#555]">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan Email"
                className="h-[36px] w-full rounded-[5px] border border-[#D5D5D5] bg-white px-3 text-[10px] text-[#444] shadow-[0_2px_3px_rgba(0,0,0,0.18)] outline-none placeholder:text-[#B5B5B5] focus:border-[#FDCB01]"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-[17px]">
              <label className="mb-1.5 block text-[11px] font-semibold text-[#555]">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan Password"
                className="h-[36px] w-full rounded-[5px] border border-[#D5D5D5] bg-white px-3 text-[10px] text-[#444] shadow-[0_2px_3px_rgba(0,0,0,0.18)] outline-none placeholder:text-[#B5B5B5] focus:border-[#FDCB01]"
              />
            </div>

            {/* NO TELEPON */}
            <div className="mb-[17px]">
              <label className="mb-1.5 block text-[11px] font-semibold text-[#555]">
                No. Telepon
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Masukkan No. Telepon"
                className="h-[36px] w-full rounded-[5px] border border-[#D5D5D5] bg-white px-3 text-[10px] text-[#444] shadow-[0_2px_3px_rgba(0,0,0,0.18)] outline-none placeholder:text-[#B5B5B5] focus:border-[#FDCB01]"
              />
            </div>

            {/* ROLE */}
<div className="mb-[17px]">
  <label className="mb-1.5 block text-[11px] font-semibold text-[#555]">
    Role
  </label>

  <div className="relative">
    {/* INPUT ROLE */}
    <button
      type="button"
      onClick={() =>
        setRoleDropdownOpen((prev) => !prev)
      }
      className="flex h-[36px] w-full items-center rounded-[5px] border border-[#D5D5D5] bg-white px-3 text-left text-[10px] text-[#555] shadow-[0_2px_3px_rgba(0,0,0,0.18)]"
    >
      {formData.role || (
        <span className="text-[#B5B5B5]">
          Pilih Role
        </span>
      )}
    </button>

    {/* DROPDOWN */}
    {roleDropdownOpen && (
      <div className="absolute left-0 top-[39px] z-50 w-full overflow-hidden rounded-[5px] border border-[#E1E1E1] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.22)]">
        {/* PILIH MENU */}
        <button
          type="button"
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              role: "",
            }));
            setRoleDropdownOpen(false);
          }}
          className="flex h-[34px] w-full items-center bg-[#FAF7EF] px-3 text-left text-[10px] text-[#777] transition hover:bg-[#F8F4E9]"
        >
          Pilih Menu
        </button>

        {/* ADMIN */}
        <button
          type="button"
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              role: "Admin",
            }));
            setRoleDropdownOpen(false);
          }}
          className="flex h-[34px] w-full items-center bg-white px-3 text-left text-[10px] text-[#555] transition hover:bg-[#F8F4E9]"
        >
          Admin Meitech
        </button>

        {/* USER */}
        <button
          type="button"
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              role: "User",
            }));
            setRoleDropdownOpen(false);
          }}
          className="flex h-[34px] w-full items-center bg-white px-3 text-left text-[10px] text-[#555] transition hover:bg-[#F8F4E9]"
        >
          User
        </button>
      </div>
    )}
  </div>
</div>

            {/* SIMPAN */}
            <div className="pt-[2px]">
              <button
                type="submit"
                className="flex h-[30px] items-center gap-1 rounded-[4px] bg-[#7FC97F] px-[14px] text-[10px] font-bold text-[#222] shadow-[0_2px_3px_rgba(0,0,0,0.22)] transition hover:brightness-95"
              >
                <Save size={11} />
                Simpan
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }

  // =========================================================
  // LIST
  // =========================================================
  return (
    <div className="min-h-screen bg-[#F8F4E9] px-4 py-5 font-['Nunito_Sans']">
      {/* PAGE TITLE */}
      <div className="mb-3 rounded-md bg-white px-5 py-4 shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
        <h1 className="text-[18px] font-extrabold text-[#555]">
          Pengaturan Pengguna
        </h1>
      </div>

      {/* MAIN CARD */}
      <section className="rounded-[8px] bg-white shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
        {/* HEADER */}
        <div className="border-b border-[#E5E5E5] px-5 py-3">
          <h2 className="text-[14px] font-bold text-[#333]">
            Pengguna
          </h2>
        </div>

        {/* CONTENT */}
        <div className="px-[36px] py-[20px]">
          {/* TOOLBAR */}
          <div className="mb-[20px] flex items-center gap-[26px]">
            {/* TAMBAH */}
            <button
              type="button"
              onClick={handleAddUser}
              className="flex h-[40px] items-center justify-center rounded-[7px] bg-[#FDCB01] px-[14px] text-[14px] font-extrabold text-black shadow-[0_2px_3px_rgba(0,0,0,0.25)] transition hover:brightness-95"
            >
              Tambah Pengguna
            </button>

            {/* SEARCH */}
            <div className="relative w-[300px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari"
                className="h-[40px] w-full rounded-[7px] border border-[#D5D5D5] bg-white px-[18px] pr-[40px] text-[14px] text-[#444] shadow-[0_2px_3px_rgba(0,0,0,0.25)] outline-none placeholder:text-[#A5A5A5] focus:border-[#FDCB01]"
              />

              <Search
                size={19}
                strokeWidth={2}
                className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[#B5BDB8]"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-[8px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="h-[42px] bg-white">
                  <th className="w-[7%] border-b border-[#E5E5E5] px-2 !text-center text-[13px] font-extrabold text-[#444]">
                    No.
                  </th>

                  <th className="w-[12%] border-b border-[#E5E5E5] px-2 !text-center text-[13px] font-extrabold text-[#444]">
                    Foto Profil
                  </th>

                  <th className="w-[17%] border-b border-[#E5E5E5] px-2 text-center text-[13px] font-extrabold text-[#444]">
                    Nama Pengguna
                  </th>

                  <th className="w-[20%] border-b border-[#E5E5E5] px-2 text-center text-[13px] font-extrabold text-[#444]">
                    Email
                  </th>

                  <th className="w-[18%] border-b border-[#E5E5E5] px-2 text-center text-[13px] font-extrabold text-[#444]">
                    No. Telepon
                  </th>

                  <th className="w-[8%] border-b border-[#E5E5E5] px-2 text-center text-[13px] font-extrabold text-[#444]">
                    Role
                  </th>

                  <th className="w-[18%] border-b border-[#E5E5E5] px-2 !text-center text-[13px] font-extrabold text-[#444]">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="h-[50px] bg-white"
                  >
                    {/* NO */}
                    <td className="border-b border-[#E5E5E5] px-2 text-center !text-[14px] text-[#444]">
                      {index + 1}
                    </td>

                    {/* FOTO */}
                    <td className="border-b border-[#E5E5E5] px-2">
                      <div className="flex items-center justify-center">
                        {user.photo ? (
                          <img
                            src={user.photo}
                            alt="Foto Profil"
                            className="h-[30px] w-[30px] rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#9EA1A3]">
                            <UserRound
                              size={19}
                              strokeWidth={2.5}
                              className="text-white"
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* NAMA */}
                    <td className="border-b border-[#E5E5E5] px-2 text-center !text-[14px] text-[#444]">
                      {user.name}
                    </td>

                    {/* EMAIL */}
                    <td className="border-b border-[#E5E5E5] px-2 text-center !text-[14px] text-[#444]">
                      {user.email}
                    </td>

                    {/* TELEPON */}
                    <td className="border-b border-[#E5E5E5] px-2 text-center !text-[14px] text-[#444]">
                      {user.phone}
                    </td>

                    {/* ROLE */}
                    <td className="border-b border-[#E5E5E5] px-2 text-center !text-[14px] text-[#444]">
                      {user.role}
                    </td>

                    {/* AKSI */}
                    <td className="border-b border-[#E5E5E5] px-2">
                      <div className="flex items-center justify-center gap-[6px]">
                        <button
                          type="button"
                          onClick={() => handleDetail(user)}
                          className="rounded-[4px] bg-[#138AD9] px-[9px] py-[4px] text-[11px] font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition hover:brightness-95"
                        >
                          Detail
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(user)}
                          className="rounded-[4px] bg-[#FFC107] px-[9px] py-[4px] text-[11px] font-bold text-black shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition hover:brightness-95"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          className="rounded-[4px] bg-[#DC3545] px-[9px] py-[4px] text-[11px] font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition hover:brightness-95"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="h-[50px] text-center text-[13px] text-[#777]"
                    >
                      Data pengguna tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* DELETE MODAL */}
{deleteModalOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
    <div className="w-full max-w-[560px] overflow-hidden rounded-[8px] bg-white shadow-2xl">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#D5D5D5] px-[26px] py-[16px]">
        <h3 className="text-[17px] font-extrabold text-[#555]">
          Hapus
        </h3>

        <button
          type="button"
          onClick={handleCloseDeleteModal}
          className="text-[28px] font-light leading-none text-[#333] transition hover:text-black"
        >
          ×
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-[26px] py-[28px]">
        <p className="mb-[12px] text-[14px] font-extrabold text-[#444]">
          Apakah anda yakin ingin menghapus data ini?
        </p>

        <p className="text-[12px] text-[#555]">
          Data ini akan dihapus secara permanen
        </p>
      </div>

      {/* BUTTON */}
      <div className="flex items-center gap-[12px] px-[26px] pb-[26px]">
        <button
          type="button"
          onClick={handleCloseDeleteModal}
          className="rounded-[4px] bg-[#FFC107] px-[13px] py-[7px] text-[11px] font-bold text-black shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition hover:brightness-95"
        >
          Kembali
        </button>

        <button
          type="button"
          onClick={handleConfirmDelete}
          className="rounded-[4px] bg-[#DC3545] px-[13px] py-[7px] text-[11px] font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition hover:brightness-95"
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

export default UserSettings;