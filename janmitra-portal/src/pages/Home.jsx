import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {

  const { language, setLanguage, t } = useLanguage();

  const services = [
    {
      icon: "📄",
      title: t.applyCertificates,
      desc: t.applyCertDesc,
      link: "/certificates"
    },
    {
      icon: "🏛",
      title: t.governmentSchemes,
      desc: t.schemesDesc,
      link: "/schemes"
    },
    {
      icon: "📊",
      title: t.trackApplication,
      desc: t.trackDesc,
      link: "/track"
    },
    {
      icon: "⚠",
      title: t.reportCorruption,
      desc: t.reportDesc,
      link: "/report"
    },
    {
      icon: "📂",
      title: t.myDocuments,
      desc: t.myDocsDesc,
      link: "/documents"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <Header />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-brand-blue to-brand-green text-white text-center py-16 px-6">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.accessServices}
        </h2>

        <p className="text-lg mb-6">
          {t.heroDesc}
        </p>

        <button className="bg-brand-orange hover:bg-brand-orange-dark px-6 py-3 rounded text-white font-semibold">
          {t.getStarted}
        </button>

      </section>

      {/* Services Section */}

      <section className="max-w-6xl mx-auto py-12 px-6">

        <h3 className="text-2xl font-bold text-center mb-10 text-gray-700">
          {t.availableServices}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, index) => (
            <Link key={index} to={service.link}>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">

                <div className="text-4xl mb-4">
                  {service.icon}
                </div>

                <h4 className="text-lg font-semibold mb-2">
                  {service.title}
                </h4>

                <p className="text-gray-600 text-sm">
                  {service.desc}
                </p>

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