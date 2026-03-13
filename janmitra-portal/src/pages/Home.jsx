import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Home() {

  const { language, setLanguage, t } = useLanguage();

  const services = [
    {
      icon: "📄",
      title: t.applyCertificates,
      desc: "Apply for documents like income, caste, and birth certificates.",
      link: "/certificates"
    },
    {
      icon: "🏛",
      title: t.governmentSchemes,
      desc: "Discover welfare schemes you are eligible for.",
      link: "/schemes"
    },
    {
      icon: "📊",
      title: t.trackApplication,
      desc: "Check the status of your submitted requests.",
      link: "/track"
    },
    {
      icon: "⚠",
      title: t.reportCorruption,
      desc: "Report delays, bribery, or misuse of government schemes.",
      link: "/report"
    },
    {
      icon: "📂",
      title: t.myDocuments,
      desc: "Access Aadhaar, land records and other government documents.",
      link: "/documents"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <div>
            <h1 className="text-2xl font-bold text-blue-700">JanMitra</h1>

            <p className="text-sm text-gray-600">
              {t.portalTitle}
            </p>
          </div>

          <select
            className="border p-2 rounded"
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="kn">Kannada</option>
          </select>

        </div>
      </header>

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-16 px-6">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.accessServices}
        </h2>

        <p className="text-lg mb-6">
          Apply for certificates, discover schemes, and track applications from your village.
        </p>

        <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-white font-semibold">
          Get Started
        </button>

      </section>

      {/* Services Section */}

      <section className="max-w-6xl mx-auto py-12 px-6">

        <h3 className="text-2xl font-bold text-center mb-10 text-gray-700">
          Available Services
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

      {/* Footer */}

      <footer className="bg-blue-700 text-white mt-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-8">

          <div>
            <h4 className="font-semibold mb-2">
              About JanMitra
            </h4>

            <p className="text-sm">
              A digital platform helping rural citizens access government services easily.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">
              Help & Support
            </h4>

            <p className="text-sm">
              User guides and citizen assistance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">
              Panchayat Contact
            </h4>

            <p className="text-sm">
              Contact your local village office for support.
            </p>
          </div>

        </div>

        <div className="text-center pb-4 text-sm">
          JanMitra – Bringing Digital Government Services to Every Village.
        </div>

      </footer>

    </div>
  );
}

export default Home;