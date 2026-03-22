import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyDocuments() {

  const { t } = useLanguage();

  const linkedIDs = [
    {
      name: t.aadhaarCard,
      desc: t.aadhaarDesc,
      status: t.digiLockerStatus,
      icon: "🆔",
      color: "bg-blue-50 text-brand-blue"
    },
    {
      name: t.panCard,
      desc: t.panDesc,
      status: t.digiLockerStatus,
      icon: "💳",
      color: "bg-green-50 text-brand-green"
    },
    {
      name: t.drivingLicence,
      desc: t.drivingLicenceDesc,
      status: t.digiLockerStatus,
      icon: "🚗",
      color: "bg-orange-50 text-brand-orange"
    }
  ];

  const [documents, setDocuments] = useState([]);
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem("janmitra_docs")) || [];
    setDocuments(storedDocs);
  }, []);

  const handleUpload = (e) => {

    e.preventDefault();

    if (!docName || !file) return;

    const newDoc = {
      name: docName,
      fileName: file.name,
      date: new Date().toLocaleDateString()
    };

    const updatedDocs = [...documents, newDoc];

    setDocuments(updatedDocs);

    localStorage.setItem("janmitra_docs", JSON.stringify(updatedDocs));

    setDocName("");
    setFile(null);

  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans">

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12 px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-4">
          {t.myGovDocsTitle}
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.myGovDocsDesc}
        </p>
      </section>

      {/* Personal ID Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-display font-bold text-center mb-12 text-gray-800">
          {t.personalIdAccess}
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {linkedIDs.map((id, index) => (
            <div
              key={index}
              className="card-elevated h-full flex flex-col items-center text-center p-8 hover:-translate-y-2 group transition-all duration-300"
            >
              <div className={`w-16 h-16 ${id.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                {id.icon}
              </div>

              <h4 className="text-xl font-display font-bold mb-3 text-gray-800">
                {id.name}
              </h4>

              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {id.desc}
              </p>

              <div className="mb-6">
                <span className="badge bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {id.status}
                </span>
              </div>

              <a
                href="https://www.digilocker.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary py-2 px-6 text-sm w-full mt-auto"
              >
                {t.openDigiLockerBtn}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* DigiLocker Call to Action */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-brand-green/10 to-brand-blue/10 rounded-3xl p-8 md:p-12 border border-white/50 shadow-soft text-center">
          <h3 className="text-2xl font-display font-bold mb-4 text-gray-800">
            {t.accessVerifiedDocsTitle}
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.accessVerifiedDocsDesc}
          </p>
          <a
            href="https://www.digilocker.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4"
          >
            <span>🔒</span> {t.openDigiLockerBtn}
          </a>
        </div>
      </section>

      {/* Upload Section */}
      <section className="max-w-3xl mx-auto py-12 px-6">
        <div className="card-elevated">
          <h3 className="text-2xl font-display font-bold mb-6 text-gray-800">
            {t.uploadAddDocsTitle}
          </h3>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Name
              </label>
              <input
                type="text"
                placeholder={t.docNamePlaceholder}
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose File
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full md:w-auto px-10"
            >
              {t.uploadDocBtn}
            </button>
          </form>
        </div>
      </section>

      {/* Uploaded Documents */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-display font-bold text-center mb-12 text-gray-800">
          {t.uploadedDocsTitle}
        </h3>

        {documents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-soft border border-dashed border-gray-200">
            <p className="text-gray-500 italic">
              {t.noDocsYet}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                  📄
                </div>
                <div className="flex-grow overflow-hidden">
                  <h4 className="font-bold text-gray-900 truncate mb-1">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {t.fileLabel} {doc.fileName}
                  </p>
                  <p className="text-xs text-brand-blue font-medium mt-2">
                    {t.uploadedLabel} {doc.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

    </div>
  );
}

export default MyDocuments;
