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
    <div className="min-h-screen bg-gray-50">

      <Header />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-12 px-6">

        <h2 className="text-3xl font-bold mb-2">
          {t.reportCorruption}
        </h2>

        <p className="text-lg">
          {t.helpImproveTransparency}
        </p>

      </section>

      {/* Form Section */}

      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-10">

        {!submitted ? (

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block font-semibold mb-1">
                {t.issueType}
              </label>

              <select
                name="issueType"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="">{t.selectIssue}</option>
                <option>{t.bribeDemanded}</option>
                <option>{t.applicationDelay}</option>
                <option>{t.fakeBeneficiary}</option>
                <option>{t.otherIssue}</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                {t.locationLabel}
              </label>

              <input
                type="text"
                name="location"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                {t.descriptionLabel}
              </label>

              <textarea
                name="description"
                rows="4"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                {t.uploadPhotoOptional}
              </label>

              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
            >
              {t.submitReportBtn}
            </button>

          </form>

        ) : (

          <div className="text-center p-6">

            <h3 className="text-xl font-bold text-green-600 mb-4">
              {t.reportSubmittedTitle}
            </h3>

            <p className="text-gray-700">
              {t.reportSubmittedDesc}
            </p>

          </div>

        )}

      </section>

      <Footer />

    </div>
  );
}

export default ReportCorruption;