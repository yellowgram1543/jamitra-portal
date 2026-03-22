import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ReportCorruption() {

  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    issueType: "",
    location: "",
    description: "",
    photo: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("https://jamitra-portal.onrender.com/api/reports", {

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

      console.error("Error submitting report:", error);

    }

  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans">

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12 px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-4">
          {t.reportCorruption}
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.helpImproveTransparency}
        </p>
      </section>

      {/* Form Section */}
      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="card-elevated">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.issueType}
                </label>
                <select
                  name="issueType"
                  required
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">{t.selectIssue}</option>
                  <option>{t.bribeDemanded}</option>
                  <option>{t.applicationDelay}</option>
                  <option>{t.fakeBeneficiary}</option>
                  <option>{t.otherIssue}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.locationLabel}
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Where did this occur?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.descriptionLabel}
                </label>
                <textarea
                  name="description"
                  rows="4"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Please provide details..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.uploadPhotoOptional}
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto px-8"
                >
                  {t.submitReportBtn}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-green mb-2">
                {t.reportSubmittedTitle}
              </h3>
              <p className="text-gray-700">
                {t.reportSubmittedDesc}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default ReportCorruption;
