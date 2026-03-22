import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowResults(false);

    try {
      const response = await fetch(
        `${API_BASE_URL}/schemes?occupation=${formData.occupation}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setSchemes(data);
      setShowResults(true);
    } catch (err) {
      console.error("Error submitting request:", err);
      setError(t.errorFetching);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-12 px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-4">
          {t.findSchemesTitle}
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.findSchemesDesc}
        </p>
      </section>

      {/* Form Section */}
      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="card-elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.occupation}
                </label>
                <select
                  name="occupation"
                  required
                  onChange={handleChange}
                  className="input-field"
                  value={formData.occupation}
                >
                  <option value="">{t.selectOccupation}</option>
                  <option value="farmer">{t.farmer}</option>
                  <option value="student">{t.student}</option>
                  <option value="worker">{t.worker}</option>
                  <option value="small-business-owner">{t.smallBusiness}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.annualIncome}
                </label>
                <input
                  type="number"
                  name="income"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. 50000"
                  value={formData.income}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.age}
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. 25"
                  value={formData.age}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.state}
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your state"
                  value={formData.state}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.district}
                </label>
                <input
                  type="text"
                  name="district"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your district"
                  value={formData.district}
                />
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full md:w-auto px-12 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? t.loading : t.findSchemesBtn}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-center font-medium mt-4">{error}</p>
            )}
          </form>
        </div>
      </main>

      {/* Results */}
      {showResults && (
        <section className="max-w-6xl mx-auto py-12 px-6 border-t border-gray-100">
          <h3 className="text-3xl font-display font-bold text-center mb-12 text-gray-800">
            {t.recommendedSchemes}
          </h3>

          {schemes.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {schemes.map((scheme, index) => (
                <div
                  key={index}
                  className="card-elevated flex flex-col"
                >
                  <div className="mb-4">
                     <span className="badge bg-brand-blue/10 text-brand-blue">Scheme</span>
                  </div>
                  <h4 className="text-xl font-display font-bold mb-3 text-gray-900">
                    {scheme.title}
                  </h4>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    {scheme.description}
                  </p>
                  <button className="btn-primary py-2 text-sm w-full">
                    {t.learnMore}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 card-elevated bg-gray-50 border-none">
              <p className="text-xl text-gray-600 font-medium">
                {t.noSchemesFound}
              </p>
            </div>
          )}
        </section>
      )}

      <Footer />
    </div>
  );
}

export default SchemeRecommender;
