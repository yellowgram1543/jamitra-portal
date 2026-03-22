import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function SchemeRecommender() {

  const { language, setLanguage, t } = useLanguage();

  const [formData, setFormData] = useState({
    occupation: "",
    income: "",
    age: "",
    state: "",
    district: ""
  });

  const [showResults, setShowResults] = useState(false);
  const [schemes, setSchemes] = useState([]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `https://jamitra-portal.onrender.com/api/schemes?occupation=${formData.occupation}`
    );

    const data = await response.json();

    setSchemes(data);

    setShowResults(true);

  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold text-blue-700 cursor-pointer">JanMitra</h1>
            </Link>
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

      {/* Page Title */}

      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-12 px-6">

        <h2 className="text-3xl font-bold mb-2">
          {t.findSchemesTitle}
        </h2>

        <p className="text-lg">
          {t.findSchemesDesc}
        </p>

      </section>

      {/* Form Section */}

      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-10">

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-1">
              {t.occupation}
            </label>

            <select
              name="occupation"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">{t.selectOccupation}</option>
              <option value="farmer">{t.farmer}</option>
              <option value="student">{t.student}</option>
              <option value="worker">{t.worker}</option>
              <option value="small-business-owner">{t.smallBusiness}</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              {t.annualIncome}
            </label>

            <input
              type="number"
              name="income"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              {t.age}
            </label>

            <input
              type="number"
              name="age"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              {t.state}
            </label>

            <input
              type="text"
              name="state"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              {t.district}
            </label>

            <input
              type="text"
              name="district"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
          >
            {t.findSchemesBtn}
          </button>

        </form>

      </section>

      {/* Results */}

      {showResults && (

        <section className="max-w-6xl mx-auto py-12 px-6">

          <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">
            {t.recommendedSchemes}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {schemes.map((scheme,index)=>(
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >

                <h4 className="text-lg font-semibold mb-2">
                  {scheme.title}
                </h4>

                <p className="text-gray-600 mb-4">
                  {scheme.description}
                </p>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  {t.learnMore}
                </button>

              </div>
            ))}

          </div>

        </section>

      )}

      {/* Footer */}

      <footer className="bg-blue-700 text-white mt-12">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-8">

          <div>
            <h4 className="font-semibold mb-2">{t.aboutJanMitra}</h4>
            <p className="text-sm">
              {t.aboutDesc}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t.helpSupport}</h4>
            <p className="text-sm">
              {t.helpDesc}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t.panchayatContact}</h4>
            <p className="text-sm">
              {t.panchayatDesc}
            </p>
          </div>

        </div>

        <div className="text-center pb-4 text-sm">
          {t.footerTagline}
        </div>

      </footer>

    </div>
  );
}

export default SchemeRecommender;