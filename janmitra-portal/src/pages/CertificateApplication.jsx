import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CertificateApplication() {

  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    mobile: "",
    address: "",
    certificateType: "",
    document: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "document") {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("https://jamitra-portal.onrender.com/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log(data);

      setSubmitted(true);

    } catch (error) {

      console.error("Error submitting application:", error);

    }

  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans">

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12 px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-4">
          {t.applyCertificates}
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.submitRequest}
        </p>
      </section>

      {/* Content Section */}
      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="card-elevated">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.aadhaarNumber}
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="12-digit Aadhaar Number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.mobileNumber}
                </label>
                <input
                  type="text"
                  name="mobile"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.address}
                </label>
                <textarea
                  name="address"
                  required
                  onChange={handleChange}
                  rows="3"
                  className="input-field"
                  placeholder="Complete residential address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.certificateType}
                </label>
                <select
                  name="certificateType"
                  required
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">{t.selectCertificate}</option>
                  <option>{t.incomeCert}</option>
                  <option>{t.casteCert}</option>
                  <option>{t.birthCert}</option>
                  <option>{t.deathCert}</option>
                  <option>{t.landRecord}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.uploadDoc}
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                >
                  {t.submitApp}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-green mb-2">
                {t.appSaved}
              </h3>
              <p className="text-gray-700">
                {t.appSavedDesc}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default CertificateApplication;
