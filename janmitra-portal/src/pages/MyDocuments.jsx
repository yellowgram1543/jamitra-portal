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
      status: t.digiLockerStatus
    },
    {
      name: t.panCard,
      desc: t.panDesc,
      status: t.digiLockerStatus
    },
    {
      name: t.drivingLicence,
      desc: t.drivingLicenceDesc,
      status: t.digiLockerStatus
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
    <div className="min-h-screen bg-gray-50">

      <Header />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-12 px-6">

        <h2 className="text-3xl font-bold mb-2">
          {t.myGovDocsTitle}
        </h2>

        <p className="text-lg">
          {t.myGovDocsDesc}
        </p>

      </section>

      {/* Personal ID Section */}

      <section className="max-w-6xl mx-auto py-12 px-6">

        <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
          {t.personalIdAccess}
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {linkedIDs.map((id, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >

              <h4 className="text-lg font-semibold mb-2">
                {id.name}
              </h4>

              <p className="text-gray-600 text-sm mb-4">
                {id.desc}
              </p>

              <p className="text-blue-600 font-semibold mb-4">
                {id.status}
              </p>

              <a
                href="https://www.digilocker.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {t.openDigiLockerBtn}
              </a>

            </div>

          ))}

        </div>

      </section>

      {/* DigiLocker Section */}

      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow text-center">

        <h3 className="text-xl font-semibold mb-4">
          {t.accessVerifiedDocsTitle}
        </h3>

        <p className="text-gray-600 mb-6">
          {t.accessVerifiedDocsDesc}
        </p>

        <a
          href="https://www.digilocker.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold"
        >
          🔒 {t.openDigiLockerBtn}
        </a>

      </section>

      {/* Upload Section */}

      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-12">

        <h3 className="text-xl font-semibold mb-4">
          {t.uploadAddDocsTitle}
        </h3>

        <form onSubmit={handleUpload} className="space-y-4">

          <input
            type="text"
            placeholder={t.docNamePlaceholder}
            value={docName}
            onChange={(e)=>setDocName(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
            className="w-full"
            required
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
          >
            {t.uploadDocBtn}
          </button>

        </form>

      </section>

      {/* Uploaded Documents */}

      <section className="max-w-6xl mx-auto py-12 px-6">

        <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
          {t.uploadedDocsTitle}
        </h3>

        {documents.length === 0 ? (

          <p className="text-center text-gray-500">
            {t.noDocsYet}
          </p>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {documents.map((doc, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow"
              >

                <h4 className="font-semibold mb-2">
                  {doc.name}
                </h4>

                <p className="text-sm text-gray-600">
                  {t.fileLabel}{doc.fileName}
                </p>

                <p className="text-sm text-gray-500">
                  {t.uploadedLabel}{doc.date}
                </p>

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