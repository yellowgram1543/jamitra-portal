import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Landmark, 
  ClipboardList, 
  ShieldAlert, 
  Folder, 
  ArrowRight 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const { language, setLanguage, t } = useLanguage();

  const services = [
    {
      icon: <FileText size={32} />,
      title: t.applyCertificates,
      desc: t.applyCertDesc,
      link: "/certificates",
      color: "bg-blue-50 text-brand-blue"
    },
    {
      icon: <Landmark size={32} />,
      title: t.governmentSchemes,
      desc: t.schemesDesc,
      link: "/schemes",
      color: "bg-green-50 text-brand-green"
    },
    {
      icon: <ClipboardList size={32} />,
      title: t.trackApplication,
      desc: t.trackDesc,
      link: "/track",
      color: "bg-orange-50 text-brand-orange"
    },
    {
      icon: <ShieldAlert size={32} />,
      title: t.reportCorruption,
      desc: t.reportDesc,
      link: "/report",
      color: "bg-red-50 text-red-600"
    },
    {
      icon: <Folder size={32} />,
      title: t.myDocuments,
      desc: t.myDocsDesc,
      link: "/documents",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-surface">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-20 px-6 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-green/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight tracking-tight">
            {t.accessServices}
          </h2>

          <p className="text-lg md:text-xl mb-10 text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            {t.heroDesc}
          </p>

          <button className="btn-primary px-10 py-4 text-lg">
            {t.getStarted}
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            {t.availableServices}
          </h3>
          <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="group">
              <div className="card-elevated h-full flex flex-col items-center text-center p-8 group-hover:-translate-y-2 group-active:scale-95">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                <h4 className="text-xl font-display font-bold mb-3 text-gray-800 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h4>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
                
                <div className="mt-6 text-brand-blue font-bold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  {t.learnMore || "Access Now"} <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
