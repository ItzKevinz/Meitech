import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Activity from "./pages/Activity";
import FeaturedProductForm from "./Beranda/FeaturedProductForm";
import ConsultationForm from "./Beranda/ConsultationForm";
import ContactTeamForm from "./Beranda/ContactTeamForm";
import PartnerForm from "./Beranda/PartnerForm";
import Article from "./pages/Article";
import "./styles/global.css";
import ProjectKategori from "./pages/ProjectKategori";
import ProjectDetail from "./pages/ProjectDetail";
import AboutProfile from "./pages/AboutProfile";
import AboutVisiMisi from "./pages/AboutVisiMisi";
import Certificate from "./pages/Certificate";
import CertificateDetail from "./pages/CertificateDetail";
import CertificateEdit from "./pages/CertificateEdit";
import CertificateAdd from "./pages/CertificateAdd";
import FAQCategory from "./pages/FAQCategory";
import FAQDetail from "./pages/FAQDetail";
import Location from "./pages/Location";
import Career from "./pages/Career";
import TopBeranda from "./pages/Top-general/TopBeranda";
import TopTentangKami from "./pages/Top-general/TopTentangKami";
import TopKatalogProduk from "./pages/Top-general/TopKatalogProduk";
import TopProduk from "./pages/Top-general/TopProduk";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // State untuk menyimpan data projek yang sedang diedit (atau null jika tambah baru)
  const [selectedProject, setSelectedProject] = useState(null);

  const [faqCategories, setFaqCategories] = useState([
  {
    id: 1,
    name: "Panel Maker",
    totalFAQ: 2,
  },
  {
    id: 2,
    name: "Sheet Metal",
    totalFAQ: 3,
  },
  {
    id: 3,
    name: "Distribution Suntree",
    totalFAQ: 2,
  },
  {
    id: 4,
    name: "Support PV",
    totalFAQ: 2,
  },
]);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleNavigate = (page, data = null) => {
  setCurrentPage(page);

  if (data) {
    if (page.includes("certificate")) {
      setSelectedCertificate(data);
    } else if (page === "project-detail") {
      setSelectedProject(data);
    }
  } else {
    if (page === "project-detail") {
      setSelectedProject(null);
    }

    if (
      page === "sertifikat" ||
      page === "certificate" ||
      page === "certificate-add"
    ) {
      setSelectedCertificate(null);
    }
  }
};

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <Profile onNavigate={handleNavigate} />;

      case "profile-edit":
        return <ProfileEdit onNavigate={handleNavigate} />;

      case "activity":
        return <Activity />;

      case "beranda-produk":
      case "produk-unggulan":
        return <FeaturedProductForm />;

      case "beranda-konsultasi":
      case "konsultasi":
        return <ConsultationForm />;

      case "beranda-hubungi-tim":
      case "hubungi-tim":
        return <ContactTeamForm />;

      case "beranda-mitra":
      case "mitra":
        return <PartnerForm />;

      case "artikel":
      case "article":
        return <Article onNavigate={handleNavigate} />;

      // ==========================================
      // ROUTE HALAMAN PROJEK PORTOFOLIO
      // ==========================================
      case "project-kategori":
      case "projek":
        return <ProjectKategori onNavigate={handleNavigate} />;

      case "project-detail":
        return (
          <ProjectDetail
            project={selectedProject}
            onBack={() => handleNavigate("project-kategori")}
            onSave={(savedProject) => {
              console.log("Projek disimpan:", savedProject);
              handleNavigate("project-kategori");
            }}
          />
        );
      // ==========================================

      case "about-profile":
        return <AboutProfile />;

      case "about-visi-misi":
        return <AboutVisiMisi />;

// ==========================================
// ROUTE HALAMAN SERTIFIKAT
// ==========================================
case "sertifikat":
case "certificate":
  return (
    <Certificate
      onNavigate={handleNavigate}
    />
  );

case "certificate-detail":
  return (
    <CertificateDetail
      certificate={selectedCertificate}
      onBack={() => handleNavigate("sertifikat")}
      onNavigate={handleNavigate}
    />
  );

case "certificate-edit":
  return (
    <CertificateEdit
      certificate={selectedCertificate}
      onBack={() => handleNavigate("sertifikat")}
      onNavigate={handleNavigate}
    />
  );

case "certificate-add":
  return (
    <CertificateAdd
      onBack={() => handleNavigate("sertifikat")}
      onNavigate={handleNavigate}
    />
  );

case "faq-kategori":
  return (
    <FAQCategory
      categories={faqCategories}
      setCategories={setFaqCategories}
      onNavigate={handleNavigate}
    />
  );

case "faq-detail":
  return (
    <FAQDetail
      categories={faqCategories}
      setCategories={setFaqCategories}
      onNavigate={handleNavigate}
    />
  );

  case "lokasi":
case "location":
  return <Location />;

  case "karir":
case "career":
  return <Career />;

  case "top-beranda":
  return <TopBeranda />;

  case "top-tentang-kami":
  return <TopTentangKami />;

  case "top-katalog-produk":
  return <TopKatalogProduk />;

  case "top-produk":
  return <TopProduk />;

      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={sidebarCollapsed} onNavigate={handleNavigate} />

      <main className="flex-1 w-full min-h-screen bg-[#F8F4E9]">
        <Navbar onMenuClick={toggleSidebar} onNavigate={handleNavigate} />

        {renderPage()}
      </main>
    </div>
  );
}

export default App;
