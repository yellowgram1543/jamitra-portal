import React, { useState, useEffect } from "react";
import { 
  Fingerprint, 
  CreditCard, 
  Car, 
  ShieldCheck, 
  Upload, 
  File, 
  Clock,
  ExternalLink 
} from "lucide-react";
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
      icon: <Fingerprint size={32} />,
      color: "bg-brand-navy/10 text-brand-navy"
    },
    {
      name: t.panCard,
      desc: t.panDesc,
      status: t.digiLockerStatus,
      icon: <CreditCard size={32} />,
      color: "bg-brand-saffron/10 text-brand-saffron"
    },
    {
      name: t.drivingLicence,
      desc: t.drivingLicenceDesc,
      status: t.digiLockerStatus,
      icon: <Car size={32} />,
      color: "bg-brand-green/10 text-brand-green"
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
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-green-dark text-white py-16 px-6 text-center shadow-lg">
        <h2 className="text-4xl font-display font-bold mb-4">{t.myGovDocsTitle}</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">{t.myGovDocsDesc}</p>
      </section>

      {/* Personal ID Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-display font-bold text-center mb-12 text-gray-800">
          {t.personalIdAccess}
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {linkedIDs.map((id, index) => (
            <div key={index} className="card-elevated group flex flex-col items-center text-center p-8 group-hover:-translate-y-2">
              <div className={`w-16 h-16 ${id.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {id.icon}
              </div>

              <h4 className="text-xl font-display font-bold mb-2 text-gray-900">{id.name}</h4>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{id.desc}</p>
              
              <div className="flex items-center gap-1 text-brand-navy font-bold text-sm mb-6">
                <ShieldCheck size={16} /> {id.status}
              </div>

              <a
                href="https://www.digilocker.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm py-2"
              >
                {t.openDigiLockerBtn} <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* DigiLocker Callout */}
      <section className="max-w-3xl mx-auto px-6 mb-16">
        <div className="bg-white p-10 rounded-2xl shadow-soft text-center border-t-4 border-brand-green">
          <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
             <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">{t.accessVerifiedDocsTitle}</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">{t.accessVerifiedDocsDesc}</p>
          <a
            href="https://www.digilocker.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ShieldCheck size={20} /> {t.openDigiLockerBtn}
          </a>
        </div>
      </section>

      {/* Upload & List Section */}
      <section className="max-w-6xl mx-auto py-12 px-6 grid lg:grid-cols-2 gap-12">
        {/* Upload Form */}
        <div className="card-elevated">
          <h3 className="text-2xl font-display font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Upload size={24} className="text-brand-saffron" /> {t.uploadAddDocsTitle}
          </h3>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={t.docNamePlaceholder}
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="relative">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-navy/10 file:text-brand-navy hover:file:bg-brand-navy/20 transition-all duration-200"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Upload size={18} /> {t.uploadDocBtn}
            </button>
          </form>
        </div>

        {/* Document List */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-6 text-gray-800">{t.uploadedDocsTitle}</h3>
          
          {documents.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <p className="text-gray-500 italic">{t.noDocsYet}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-soft flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-brand-navy/10 text-brand-navy rounded-lg flex items-center justify-center shrink-0">
                    <File size={24} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-800">{doc.name}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={12} /> {t.uploadedLabel} {doc.date}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {doc.fileName.split('.').pop().toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyDocuments;
