import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function ReportCorruption() {

  const { language, setLanguage, t } = useLanguage();

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

      {/* Header */}

      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <div>
            <h1 className="text-2xl font-bold text-blue-700">JanMitra</h1>
            <p className="text-sm text-gray-600">{t.portalTitle}</p>
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
                Location (Village / District)
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
                Description
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
                Upload Photo (optional)
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
              Submit Report
            </button>

          </form>

        ) : (

          <div className="text-center p-6">

            <h3 className="text-xl font-bold text-green-600 mb-4">
              Report Submitted
            </h3>

            <p className="text-gray-700">
              Your report has been recorded and will be forwarded to the district authority.
            </p>

          </div>

        )}

      </section>

      {/* Footer */}

      <footer className="bg-blue-700 text-white mt-12">

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
              User guides and citizen assistance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Panchayat Contact</h4>
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

export default ReportCorruption;