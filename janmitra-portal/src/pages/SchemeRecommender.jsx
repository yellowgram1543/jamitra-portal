import React, { useState } from "react";
import toast from "react-hot-toast";
import { 
  Search, 
  Briefcase, 
  IndianRupee, 
  Calendar, 
  MapPin, 
  Award, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SchemeCardSkeleton } from "../components/Skeletons";

function SchemeRecommender() {

  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    occupation: "",
    income: "",
    age: "",
    state: "",
    district: ""
  });

  const [step, setStep] = useState(1);
  const totalSteps = 4;

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

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.occupation !== "";
      case 2: return formData.income !== "" && formData.age !== "";
      case 3: return formData.state !== "" && formData.district !== "";
      default: return true;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
      if (data.length > 0) {
        toast.success(`${data.length} ${t.recommendedSchemes || "Schemes Recommended"}`);
      } else {
        toast.error(t.noSchemesFound || "No schemes found for this occupation.");
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      setError(t.errorFetching);
      toast.error(t.errorFetching || "Failed to fetch schemes.");
    } finally {
      setLoading(false);
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
          {t.findSchemesTitle}
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.findSchemesDesc}
        </p>
      </section>

      {/* Progress Bar */}
      {!showResults && (
        <div className="max-w-3xl mx-auto pt-12 px-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">Step {step} of {totalSteps}</span>
            <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-brand-saffron h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <main className="max-w-3xl mx-auto py-8 px-6">
        {!showResults && (
          <div className="card-elevated min-h-[400px] flex flex-col justify-between">
            <div className="fade-in">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">What is your occupation?</h3>
                    <p className="text-gray-500">We'll use this to find schemes specifically for your work.</p>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Briefcase size={16} className="text-brand-navy" />
                      {t.occupation}
                    </label>
                    <select
                      name="occupation"
                      required
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                      value={formData.occupation}
                    >
                      <option value="">{t.selectOccupation}</option>
                      <option value="farmer">{t.farmer}</option>
                      <option value="student">{t.student}</option>
                      <option value="worker">{t.worker}</option>
                      <option value="small-business-owner">{t.smallBusiness}</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Details</h3>
                    <p className="text-gray-500">Your age and income help us determine eligibility.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <IndianRupee size={16} className="text-brand-navy" />
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
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar size={16} className="text-brand-navy" />
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
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Where are you located?</h3>
                    <p className="text-gray-500">Some schemes are specific to certain states or districts.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin size={16} className="text-brand-navy" />
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
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin size={16} className="text-brand-navy" />
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
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Review your Information</h3>
                    <p className="text-gray-500">Check if everything is correct before searching.</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">Occupation</span>
                      <span className="font-bold text-brand-navy capitalize">{formData.occupation}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">Annual Income</span>
                      <span className="font-bold text-brand-navy">₹{formData.income}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">Age</span>
                      <span className="font-bold text-brand-navy">{formData.age} Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">Location</span>
                      <span className="font-bold text-brand-navy">{formData.district}, {formData.state}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-12 border-t border-gray-100 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary flex-1 py-4"
                >
                  Back
                </button>
              )}
              
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`btn-primary flex-[2] py-4 ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`btn-primary flex-[2] py-4 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                  {loading ? "Fetching Schemes..." : t.findSchemesBtn}
                </button>
              )}
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-600 font-medium mt-4">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Results */}
      {(showResults || loading) && (
        <section className="max-w-6xl mx-auto py-12 px-6 border-t border-gray-100">
          <h3 className="text-3xl font-display font-bold text-center mb-12 text-gray-800">
            {t.recommendedSchemes}
          </h3>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SchemeCardSkeleton key={i} />
              ))}
            </div>
          ) : schemes.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 fade-in">
              {schemes.map((scheme, index) => (
                <div
                  key={index}
                  className="card-elevated flex flex-col group hover:-translate-y-2 transition-all"
                >
                  <div className="mb-6 w-14 h-14 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                     <Award size={28} />
                  </div>
                  <h4 className="text-xl font-display font-bold mb-3 text-gray-900 group-hover:text-brand-navy transition-colors">
                    {scheme.title}
                  </h4>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">
                    {scheme.description}
                  </p>
                  <button className="btn-secondary py-2.5 text-sm w-full font-bold">
                    {t.learnMore}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 card-elevated bg-gray-50 border-none shadow-none">
              <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 font-medium">
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
