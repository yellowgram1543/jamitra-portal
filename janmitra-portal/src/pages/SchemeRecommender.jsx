import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function SchemeRecommender() {

  const { t } = useLanguage();

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

      <Header />

      {/* Page Title */}

      <section className="bg-gradient-to-r from-brand-blue to-brand-green text-white text-center py-12 px-6">

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
            className="bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded font-semibold"
          >            {t.findSchemesBtn}
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

                <button className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2 rounded">
                  {t.learnMore}
                </button>

              </div>
            ))}

          </div>

        </section>

      )}

      <Footer />

    </div>
  );
}

export default SchemeRecommender;