import React, { useState } from "react";
import { 
  Search, 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Hash,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TrackApplication() {

  const { t } = useLanguage();

  const [searchValue, setSearchValue] = useState("");
  const [applications, setApplications] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return (
        <span className="badge-green flex items-center gap-1.5 w-fit">
          <CheckCircle size={14} /> {status}
        </span>
      );
    }
    if (status === "Processing" || status === "Pending") {
      return (
        <span className="badge-saffron flex items-center gap-1.5 w-fit">
          <Clock size={14} /> {status}
        </span>
      );
    }
    if (status === "Rejected") {
      return (
        <span className="badge-navy flex items-center gap-1.5 w-fit">
          <XCircle size={14} /> {status}
        </span>
      );
    }
    return (
      <span className="badge-saffron flex items-center gap-1.5 w-fit">
        <Clock size={14} /> {status || "Pending"}
      </span>
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(`${API_BASE_URL}/applications`);

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
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-green-dark text-white py-16 px-6 text-center">
        <div className="w-24 h-24 bg-brand-saffron/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm border border-brand-saffron/30">
          <Search size={48} className="text-brand-saffron" />
        </div>
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
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Hash size={16} className="text-brand-navy" />
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
                  className="btn-primary whitespace-nowrap flex items-center justify-center gap-2 px-8"
                >
                  <Search size={18} />
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
          <h3 className="text-3xl font-display font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-3">
            <ClipboardList size={32} className="text-brand-navy" />
            {t.appStatusTitle}
          </h3>

          <div className="rounded-2xl overflow-hidden shadow-soft bg-white border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="p-5 font-bold text-sm uppercase tracking-wider">{t.certificateColumn}</th>
                  <th className="p-5 font-bold text-sm uppercase tracking-wider">{t.statusColumn}</th>
                  <th className="p-5 font-bold text-sm uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.length > 0 ? (
                  applications.map((app, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-5">
                        <div className="font-bold text-gray-900 group-hover:text-brand-navy transition-colors">{app.certificateType}</div>
                        <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-tight">Ref: #JM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                      </td>
                      <td className="p-5">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-brand-navy hover:text-brand-navy-dark font-bold text-sm underline-offset-4 hover:underline">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-20 text-center">
                      <AlertCircle size={48} className="mx-auto text-gray-200 mb-4" />
                      <p className="text-gray-500 font-medium italic">
                        No applications found for this Aadhaar number.
                      </p>
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
