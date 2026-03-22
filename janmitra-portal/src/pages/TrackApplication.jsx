import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TrackApplication() {

  const { t } = useLanguage();

  const [searchValue,setSearchValue] = useState("");
  const [applications,setApplications] = useState([]);
  const [showResults,setShowResults] = useState(false);

  const getStatusColor = (status) => {
    if (status === "Approved") return "text-brand-green font-semibold";
    if (status === "Processing") return "text-yellow-600 font-semibold";
    if (status === "Pending") return "text-yellow-600 font-semibold";
    if (status === "Rejected") return "text-red-600 font-semibold";
    return "";
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

    } catch(error) {

      console.error("Error fetching applications:",error);

    }

  };

  return (
  <div className="min-h-screen bg-gray-50">

  <Header />

  {/* TITLE */}

  <section className="bg-gradient-to-r from-brand-blue to-brand-green text-white text-center py-12 px-6">

  <h2 className="text-3xl font-bold mb-2">
  {t.trackAppTitle}
  </h2>

  <p className="text-lg">
  {t.trackAppDesc}
  </p>

  </section>

  {/* SEARCH */}

  <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-10">

  <form onSubmit={handleSubmit} className="space-y-5">

  <div>

  <label className="block font-semibold mb-2">
  {t.enterAadhaarLabel}
  </label>

  <input
  type="text"
  placeholder={t.enterAadhaarPlaceholder}
  value={searchValue}
  onChange={(e)=>setSearchValue(e.target.value)}
  required
  className="w-full border p-3 rounded"
  />

  </div>

  <button
  type="submit"
  className="bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded font-semibold"
  >
  {t.checkStatusBtn}
  </button>

  </form>

  </section>

  {/* RESULTS */}

  {showResults && (

  <section className="max-w-6xl mx-auto py-12 px-6">

  <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
  {t.appStatusTitle}
  </h3>

  <div className="bg-white rounded-lg shadow overflow-hidden">

  <table className="w-full text-left">

  <thead className="bg-gray-100">

  <tr>
  <th className="p-4">{t.certificateColumn}</th>
  <th className="p-4">{t.statusColumn}</th>
  </tr>

  </thead>

  <tbody>

  {applications.map((app,index)=>(
  <tr key={index} className="border-t">

  <td className="p-4">{app.certificateType}</td>

  <td className={`p-4 ${getStatusColor(app.status)}`}>
  {app.status}
  </td>

  </tr>
  ))}

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