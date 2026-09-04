import {
  Settings,
  Package,
  Grid3X3,
  UsersRound,
  Mail,
  LayoutDashboard,
} from "lucide-react";

export const navigation = {
  dashboard: {
    title: "Dashboard",
    icon: LayoutDashboard,
  },

  settings: [
    {
      label: "Pengaturan Umum",
      icon: Settings,
      dropdown: true,
      children: [
        // =========================
        // BERANDA
        // =========================
        {
          label: "Beranda",
          dropdown: true,
          children: [
            { label: "Beranda-Produk" },
            { label: "Beranda-Konsultasi" },
            { label: "Beranda-Hubungi Tim" },
            { label: "Beranda-Mitra" },
          ],
        },

        // =========================
        // TENTANG KAMI
        // =========================
        {
          label: "Tentang Kami",
          dropdown: true,
          children: [
            {
              label: "Tentang-Profil",
            },
            {
              label: "Tentang-Visi Misi",
            },
          ],
        },

        // =========================
        // MENU LAIN
        // =========================
        { label: "Sertifikat" },
        { label: "Artikel" },

        // DROPDOWN PROJEK
        {
          label: "Projek",
          dropdown: true,
          children: [
            { label: "Projek-Kategori" },
            { label: "Projek-Detail" },
          ],
        },

        {
          label: "FAQ",
          dropdown: true,
          children: [
            { label: "FAQ Kategori" },
            { label: "FAQ Detail" },
          ],
        },
        { label: "Karir" },
        { label: "Lokasi" },

        // =========================
        // TOP GENERAL
        // =========================
        {
          label: "Top General",
          dropdown: true,
          children: [
            { label: "Top-Beranda" },
            { label: "Top-Tentang Kami" },
            { label: "Top-Katalog Produk" },
            { label: "Top-Produk" },
            { label: "Top-Artikel" },
            { label: "Top-Projek" },
            { label: "Top-FAQ" },
            { label: "Top-Karir" },
          ],
        },
      ],
    },

    // =========================
    // PRODUK
    // =========================
    {
      label: "Produk",
      icon: Package,
      dropdown: true,
      children: [
        { label: "Kategori" },
        { label: "list-Produk" },
      ],
    },

    // =========================
    // FOOTER
    // =========================
    {
      label: "Footer",
      icon: Grid3X3,
      dropdown: false,
    },

    // =========================
    // PENGATURAN PENGGUNA
    // =========================
    {
      label: "Pengaturan Pengguna",
      icon: UsersRound,
      dropdown: false,
    },

    // =========================
    // KONTAK
    // =========================
    {
      label: "Kontak",
      icon: Mail,
      dropdown: true,
      children: [
        { label: "Kontak Settings" },
        { label: "Pesan Masuk" },
      ],
    },
  ],
};