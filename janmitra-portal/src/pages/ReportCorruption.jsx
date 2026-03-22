import React, { useState } from "react";
import toast from "react-hot-toast";
import { 
  ShieldAlert, 
  AlertTriangle, 
  MapPin, 
  FileText, 
  Camera, 
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config";

function ReportCorruption() {

  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    issueType: "",
    location: "",
    description: "",
    photo: null
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setLoading(true);
    setError(null);

    try {
      // NOTE: Current backend expects JSON. JSON.stringify cannot handle File objects.
      // We will send the text data, and for a real app, we'd use FormData + Multer on backend.
      const dataToSubmit = {
        issueType: formData.issueType,
        location: formData.location,
        description: formData.description,
        // photo is skipped for now as JSON can't carry File objects
      };

      const response = await fetch(`${API_BASE_URL}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      setSubmitted(true);
      toast.success(t.reportSubmittedTitle || "Report Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      setError(t.errorFetching || "An error occurred while submitting. Please try again.");
      toast.error("Failed to submit report. Please try again.");
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
          <ShieldAlert size={48} className="text-brand-saffron" />
        </div>
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
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <AlertTriangle size={16} className="text-brand-saffron" />
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
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={16} className="text-brand-navy" />
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
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText size={16} className="text-brand-navy" />
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
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Camera size={16} className="text-brand-navy" />
                  {t.uploadPhotoOptional}
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-navy/10 file:text-brand-navy hover:file:bg-brand-navy/20 transition-all duration-200"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 font-medium text-sm">
                  <AlertCircle size={16} />
                  <p>{error}</p>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary w-full md:w-auto px-12 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <ShieldAlert size={20} />}
                  {t.submitReportBtn}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-12 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
              <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-brand-green" />
              </div>
              <h3 className="text-3xl font-display font-bold text-brand-green mb-4">
                {t.reportSubmittedTitle}
              </h3>
              <p className="text-gray-700 text-lg">
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
