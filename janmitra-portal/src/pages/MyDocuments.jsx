import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

function MyDocuments() {

  const { language, setLanguage, t } = useLanguage();

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

      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-12 px-6">

        <h2 className="text-3xl font-bold mb-2">
          My Government Documents
        </h2>

        <p className="text-lg">
          Access personal IDs and store important records securely.
        </p>

      </section>

      {/* Personal ID Section */}

      <section className="max-w-6xl mx-auto py-12 px-6">

        <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
          Personal ID Access
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
                Open DigiLocker
              </a>

            </div>

          ))}

        </div>

      </section>

      {/* DigiLocker Section */}

      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow text-center">

        <h3 className="text-xl font-semibold mb-4">
          Access Verified Government Documents
        </h3>

        <p className="text-gray-600 mb-6">
          View Aadhaar, PAN, Driving Licence, educational certificates and
          other official documents securely through DigiLocker.
        </p>

        <a
          href="https://www.digilocker.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold"
        >
          🔒 Open DigiLocker
        </a>

      </section>

      {/* Upload Section */}

      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-12">

        <h3 className="text-xl font-semibold mb-4">
          Upload Additional Documents
        </h3>

        <form onSubmit={handleUpload} className="space-y-4">

          <input
            type="text"
            placeholder="Document Name (Land Record, Property Paper...)"
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
            Upload Document
          </button>

        </form>

      </section>

      {/* Uploaded Documents */}

      <section className="max-w-6xl mx-auto py-12 px-6">

        <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
          Uploaded Documents
        </h3>

        {documents.length === 0 ? (

          <p className="text-center text-gray-500">
            No documents uploaded yet.
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
                  File: {doc.fileName}
                </p>

                <p className="text-sm text-gray-500">
                  Uploaded: {doc.date}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* Footer */}

      <footer className="bg-blue-700 text-white mt-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-8">

          <div>
            <h4 className="font-semibold mb-2">About JanMitra</h4>
            <p className="text-sm">
              A digital platform helping rural citizens access government services easily.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Help & Support</h4>
            <p className="text-sm">
              Citizen assistance and documentation guides.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Panchayat Office</h4>
            <p className="text-sm">
              Gram Panchayat Office  
              Angondhalli Village  
              Bengaluru Rural District  
              Karnataka, India
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

export default MyDocuments;