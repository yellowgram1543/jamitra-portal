import React, { useState } from "react";
import toast from "react-hot-toast";
import { 
  ClipboardSignature, 
  User, 
  Hash, 
  Phone, 
  MapPin, 
  FileText, 
  Upload, 
  CheckCircle 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CertificateApplication() {

  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    mobile: "",
    address: "",
    certificateType: "",
    document: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "document") {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Only stringify text fields, excluding the File object
      const { document, ...textData } = formData;

      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(textData)
      });

      const data = await response.json();

      console.log(data);

      setSubmitted(true);
      toast.success(t.appSaved || "Application Submitted Successfully!");

    } catch (error) {

      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");

    }

  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans">

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-green-dark text-white py-16 px-6 text-center">
        <div className="w-24 h-24 bg-brand-saffron/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm border border-brand-saffron/30">
          <ClipboardSignature size={48} className="text-brand-saffron" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4">
          {t.applyCertificates}
        </h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t.submitRequest}
        </p>
      </section>

      {/* Content Section */}
      <main className="max-w-3xl mx-auto py-12 px-6">
        <div className="card-elevated">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="text-brand-navy" />
                  {t.fullName}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Hash size={16} className="text-brand-navy" />
                  {t.aadhaarNumber}
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="12-digit Aadhaar Number"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="text-brand-navy" />
                  {t.mobileNumber}
                </label>
                <input
                  type="text"
                  name="mobile"
                  required
                  onChange={handleChange}
                  className="input-field"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={16} className="text-brand-navy" />
                  {t.address}
                </label>
                <textarea
                  name="address"
                  required
                  onChange={handleChange}
                  rows="3"
                  className="input-field"
                  placeholder="Complete residential address"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText size={16} className="text-brand-navy" />
                  {t.certificateType}
                </label>
                <select
                  name="certificateType"
                  required
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">{t.selectCertificate}</option>
                  <option>{t.incomeCert}</option>
                  <option>{t.casteCert}</option>
                  <option>{t.birthCert}</option>
                  <option>{t.deathCert}</option>
                  <option>{t.landRecord}</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Upload size={16} className="text-brand-navy" />
                  {t.uploadDoc}
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-navy/10 file:text-brand-navy hover:file:bg-brand-navy/20 transition-all duration-200"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  {t.submitApp}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-green mb-2">
                {t.appSaved}
              </h3>
              <p className="text-gray-700">
                {t.appSavedDesc}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default CertificateApplication;
