import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { navigation } from "../data/navigation";
import "../styles/sidebar.css";
import logoMeitech from "../assets/logo-meitech.png";

function SidebarItem({
  item,
  level = 0,
  onNavigate,
  activeMenu,
  setActiveMenu,
}) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const hasChildren =
    item.dropdown &&
    item.children &&
    item.children.length > 0;

  const handleClick = () => {
  // Kalau punya children, buka/tutup dropdown
  if (hasChildren) {
    setOpen((prev) => !prev);
    return;
  }

  setActiveMenu(item.label);

  if (!onNavigate) return;

  const routes = {
    // Beranda
    "Beranda-Produk": "beranda-produk",
    "Beranda-Konsultasi": "beranda-konsultasi",
    "Beranda-Hubungi Tim": "beranda-hubungi-tim",
    "Beranda-Mitra": "beranda-mitra",

    // Tentang Kami
    "Tentang-Profil": "about-profile",
    "Tentang-Visi Misi": "about-visi-misi",

    // Projek
    "Projek-Kategori": "project-kategori",
    "Projek-Detail": "project-detail",

    // Top General
    "Top-beranda": "top-beranda",
    "Top-tentang kami": "top-tentang-kami",
    "Top-katalog produk": "top-katalog-produk",
    "Top-produk": "top-produk",
    "Top-artikel": "top-artikel",
    "Top-projek": "top-projek",
    "Top-FAQ": "top-faq",
    "Top-karir": "top-karir",
  };

  const page =
    routes[item.label] ||
    item.label.toLowerCase().replace(/\s+/g, "-");

  onNavigate(page);
};

  return (
    <div className="sidebar-item-wrapper">
      <button
        className={`sidebar-item ${
          level === 0 ? "sidebar-item-main" : "sidebar-item-child"
        } ${activeMenu === item.label ? "active" : ""}`}
        style={{
          paddingLeft: `${
            level === 0 ? 4 : 28 + level * 12
          }px`,
        }}
        onClick={handleClick}
        type="button"
      >
        {Icon && (
          <Icon
            size={15}
            strokeWidth={1.8}
          />
        )}

        <span>{item.label}</span>

        {item.dropdown && (
          <ChevronDown
            className={`sidebar-chevron ${
              open ? "sidebar-chevron-open" : ""
            }`}
            size={14}
            strokeWidth={1.7}
          />
        )}
      </button>

      {hasChildren && open && (
        <div className="sidebar-children">
          {item.children.map((child) => (
            <SidebarItem
              key={child.label}
              item={child}
              level={level + 1}
              onNavigate={onNavigate}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ collapsed, onNavigate }) {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const DashboardIcon = navigation.dashboard.icon;

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* LOGO */}
      <div className="sidebar-logo">
        <img
          src={logoMeitech}
          alt="Meitech"
          className="meitech-logo"
        />
      </div>

      <div className="sidebar-divider"></div>

      {/* DASHBOARD */}
      <section className="sidebar-section">
        <h3 className="sidebar-title">DASHBOARD</h3>

        <button
          className={`dashboard-menu ${
            activeMenu === "Dashboard" ? "active" : ""
          }`}
          onClick={() => {
            setActiveMenu("Dashboard");
            if (onNavigate) {
              onNavigate("dashboard");
            }
          }}
          type="button"
        >
          <DashboardIcon size={15} strokeWidth={1.8} />
          <span>{navigation.dashboard.title}</span>
        </button>
      </section>

      <div className="sidebar-divider section-divider"></div>

      {/* SETTINGS */}
      <section className="sidebar-section">
        <h3 className="sidebar-title">SETTINGS</h3>

        <div className="sidebar-navigation">
          {navigation.settings.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              onNavigate={onNavigate}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          ))}
        </div>
      </section>
    </aside>
  );
}