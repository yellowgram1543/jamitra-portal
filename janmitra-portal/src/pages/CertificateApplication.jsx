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
    <div className="min-h-screen bg-gray-50">

      <Header />

      {/* Page Title */}

      <section className="bg-gradient-to-r from-brand-blue to-brand-green text-white text-center py-12 px-6">

        <h2 className="text-3xl font-bold mb-2">
          {t.applyCertificates}
        </h2>

        <p className="text-lg">
          {t.submitRequest}
        </p>

      </section>

      {/* Form Section */}

      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-10">

        {!submitted ? (

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block font-semibold mb-1">
                {t.fullName}
              </label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                {t.aadhaarNumber}
              </label>
              <input
                type="text"
                name="aadhaar"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                {t.mobileNumber}
              </label>
              <input
                type="text"
                name="mobile"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                {t.address}
              </label>
              <textarea
                name="address"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                {t.certificateType}
              </label>

              <select
                name="certificateType"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
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
              <label className="block font-semibold mb-1">
                {t.uploadDoc}
              </label>

              <input
                type="file"
                name="document"
                onChange={handleChange}
                className="w-full"
              />

            </div>

            <button
              type="submit"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded font-semibold"
            >
              {t.submitApp}
            </button>

          </form>

        ) : (

          <div className="text-center p-6">

            <h3 className="text-xl font-bold text-brand-green mb-4">
              {t.appSaved}
            </h3>

            <p className="text-gray-700">
              {t.appSavedDesc}
            </p>

          </div>

        )}

      </section>

      <Footer />

    </div>
  );
}

export default CertificateApplication;