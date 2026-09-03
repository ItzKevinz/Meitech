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
import "./styles/global.css";
import AboutProfile from "./pages/AboutProfile";
import AboutVisiMisi from "./pages/AboutVisiMisi";
import Certificate from "./pages/Certificate";
import CertificateDetail from "./pages/CertificateDetail";
import CertificateEdit from "./pages/CertificateEdit";
import CertificateAdd from "./pages/CertificateAdd";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);

    if (data) {
      setSelectedCertificate(data);
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

      // Navigasi ke Form Beranda
      case "beranda-produk":
      case "produk-unggulan":
        return <FeaturedProductForm />;

      case "beranda-konsultasi":
      case "konsultasi":
        return <ConsultationForm />;

      case "beranda-hubungi-tim":
      case "hubungi-tim":
        return <ContactTeamForm />;

      // Menambahkan case untuk PartnerForm / Mitra
      case "beranda-mitra":
      case "mitra":
        return <PartnerForm />;

      case "about-profile":
        return <AboutProfile />;

      case "about-visi-misi":
        return <AboutVisiMisi />;

      case "sertifikat":
        return <Certificate onNavigate={handleNavigate} />;

      case "certificate-detail":
        return (
          <CertificateDetail
            certificate={selectedCertificate}
            onBack={() => handleNavigate("sertifikat")}
          />
        );

      case "certificate-edit":
        return (
          <CertificateEdit
            certificate={selectedCertificate}
            onBack={() => handleNavigate("sertifikat")}
            onSave={(updatedCertificate) => {
              setSelectedCertificate(updatedCertificate);
              handleNavigate("sertifikat");
            }}
          />
        );

        case "certificate-add":
  return (
    <CertificateAdd
      onBack={() => handleNavigate("sertifikat")}
      onSave={(newCertificate) => {
        console.log("Data baru:", newCertificate);
        handleNavigate("sertifikat");
      }}
    />
  );
  
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={sidebarCollapsed} onNavigate={handleNavigate} />

      <main className="main-content">
        <Navbar onMenuClick={toggleSidebar} onNavigate={handleNavigate} />

        {renderPage()}
      </main>
    </div>
  );
}

export default App;
