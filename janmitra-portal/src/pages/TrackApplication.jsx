import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TrackApplication() {

  const { t } = useLanguage();

  const [searchValue, setSearchValue] = useState("");
  const [applications, setApplications] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const getStatusColor = (status) => {
    if (status === "Approved") return "text-brand-green bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase";
    if (status === "Processing" || status === "Pending") return "text-brand-orange bg-orange-50 px-3 py-1 rounded-full text-xs font-bold uppercase";
    if (status === "Rejected") return "text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold uppercase";
    return "text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-xs font-bold uppercase";
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("https://jamitra-portal.onrender.com/api/applications");

      const data = await response.json();

      const filtered = data.filter(app =>
        app.aadhaar.includes(searchValue)
      );

      setApplications(filtered);

      setShowResults(true);

    } catch (error) {

      console.error("Error fetching applications:", error);

    }

  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans">

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12 px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-4">
          {t.trackAppTitle}
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.trackAppDesc}
        </p>
      </section>

      {/* Search Section */}
      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="card-elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.enterAadhaarLabel}
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder={t.enterAadhaarPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  required
                  className="input-field flex-grow"
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  {t.checkStatusBtn}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Results Section */}
      {showResults && (
        <section className="max-w-6xl mx-auto py-12 px-6">
          <h3 className="text-3xl font-display font-bold text-center mb-8 text-gray-800">
            {t.appStatusTitle}
          </h3>

          <div className="rounded-2xl overflow-hidden shadow-soft bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-5 font-semibold text-gray-700">{t.certificateColumn}</th>
                  <th className="p-5 font-semibold text-gray-700">{t.statusColumn}</th>
                  <th className="p-5 font-semibold text-gray-700 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.length > 0 ? (
                  applications.map((app, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-5">
                        <div className="font-medium text-gray-900">{app.certificateType}</div>
                        <div className="text-xs text-gray-500 mt-1">Ref: #JM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                      </td>
                      <td className="p-5">
                        <span className={getStatusColor(app.status)}>
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-brand-blue hover:text-brand-blue-dark font-semibold text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-12 text-center text-gray-500">
                      No applications found for this Aadhaar number.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Footer />

    </div>
  );

}

export default TrackApplication;
