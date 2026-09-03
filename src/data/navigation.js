import {
  Settings,
  Package,
  Grid3X3,
  UsersRound,
  Mail,
  ChevronDown,
  LayoutDashboard,
  FileText,
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
        { label: "Beranda" },
        { label: "Tentang Kami" },
        { label: "Sertifikat" },
        { label: "Artikel" },
        { label: "Projek" },
        { label: "FAQ" },
        { label: "Karir" },
        { label: "Lokasi" },
        {
          label: "Top General",
          dropdown: true,
          children: [
            { label: "Top-Beranda" },
            { label: "Top-Tentang Kami" },
            { label: "Top-Produk" },
            { label: "Top-Artikel" },
            { label: "Top-Projek" },
            { label: "Top-FAQ" },
            { label: "Top-Karir" },
          ],
        },
      ],
    },

    {
      label: "Produk",
      icon: Package,
      dropdown: true,
      children: [],
    },

    {
      label: "Footer",
      icon: Grid3X3,
      dropdown: false,
    },

    {
      label: "Pengaturan Pengguna",
      icon: UsersRound,
      dropdown: false,
    },

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