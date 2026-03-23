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
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CertificateApplication() {

  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    mobile: "",
    address: "",
    certificateType: "",
    document: null,
    // Income specific
    annualIncome: "",
    purpose: "",
    // Caste specific
    casteName: "",
    religion: "",
    // Birth specific
    childName: "",
    dateOfBirth: "",
    gender: "",
    // Death specific
    deceasedName: "",
    dateOfDeath: "",
    causeOfDeath: "",
    // Land Record specific
    surveyNumber: "",
    village: "",
    taluk: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "document") {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.certificateType !== "";
      case 2: return formData.name !== "" && formData.aadhaar.length === 12 && formData.mobile.length === 10 && formData.address !== "";
      case 3: {
        if (formData.certificateType === t.incomeCert) return formData.annualIncome !== "" && formData.purpose !== "";
        if (formData.certificateType === t.casteCert) return formData.casteName !== "" && formData.religion !== "";
        if (formData.certificateType === t.birthCert) return formData.childName !== "" && formData.dateOfBirth !== "" && formData.gender !== "";
        if (formData.certificateType === t.deathCert) return formData.deceasedName !== "" && formData.dateOfDeath !== "" && formData.causeOfDeath !== "";
        if (formData.certificateType === t.landRecord) return formData.surveyNumber !== "" && formData.village !== "" && formData.taluk !== "";
        return true;
      }
      case 4: return formData.document !== null;
      default: return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append core fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('aadhaar', formData.aadhaar);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('certificateType', formData.certificateType);
      formDataToSend.append('document', formData.document);

      // Append only relevant details
      if (formData.certificateType === t.incomeCert) {
        formDataToSend.append('annualIncome', formData.annualIncome);
        formDataToSend.append('purpose', formData.purpose);
      } else if (formData.certificateType === t.casteCert) {
        formDataToSend.append('casteName', formData.casteName);
        formDataToSend.append('religion', formData.religion);
      } else if (formData.certificateType === t.birthCert) {
        formDataToSend.append('childName', formData.childName);
        formDataToSend.append('dateOfBirth', formData.dateOfBirth);
        formDataToSend.append('gender', formData.gender);
      } else if (formData.certificateType === t.deathCert) {
        formDataToSend.append('deceasedName', formData.deceasedName);
        formDataToSend.append('dateOfDeath', formData.dateOfDeath);
        formDataToSend.append('causeOfDeath', formData.causeOfDeath);
      } else if (formData.certificateType === t.landRecord) {
        formDataToSend.append('surveyNumber', formData.surveyNumber);
        formDataToSend.append('village', formData.village);
        formDataToSend.append('taluk', formData.taluk);
      }

      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setSubmitted(true);
      toast.success(t.appSaved || "Application Submitted Successfully!");

    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep3 = () => {
    if (formData.certificateType === t.incomeCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3IncomeTitle}</h3>
            <p className="text-gray-500">{t.certStep3IncomeDesc}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.annualIncomeLabel}</label>
            <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} className="input-field" placeholder="e.g. 150000" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.purposeLabel}</label>
            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} className="input-field" placeholder="e.g. For Education" required />
          </div>
        </div>
      );
    }
    if (formData.certificateType === t.casteCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3CasteTitle}</h3>
            <p className="text-gray-500">{t.certStep3CasteDesc}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.casteNameLabel}</label>
            <input type="text" name="casteName" value={formData.casteName} onChange={handleChange} className="input-field" placeholder="e.g. General" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.religionLabel}</label>
            <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="input-field" placeholder="e.g. Hindu" required />
          </div>
        </div>
      );
    }
    if (formData.certificateType === t.birthCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3BirthTitle}</h3>
            <p className="text-gray-500">{t.certStep3BirthDesc}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.childNameLabel}</label>
            <input type="text" name="childName" value={formData.childName} onChange={handleChange} className="input-field" placeholder="Name of the child" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.dobLabel}</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="input-field" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.genderLabel}</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="input-field" required>
              <option value="">{t.selectGender || "Select Gender"}</option>
              <option value="Male">{t.male}</option>
              <option value="Female">{t.female}</option>
              <option value="Other">{t.other}</option>
            </select>
          </div>
        </div>
      );
    }
    if (formData.certificateType === t.deathCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3DeathTitle}</h3>
            <p className="text-gray-500">{t.certStep3DeathDesc}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.deceasedNameLabel}</label>
            <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange} className="input-field" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.dodLabel}</label>
            <input type="date" name="dateOfDeath" value={formData.dateOfDeath} onChange={handleChange} className="input-field" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.causeOfDeathLabel}</label>
            <input type="text" name="causeOfDeath" value={formData.causeOfDeath} onChange={handleChange} className="input-field" required />
          </div>
        </div>
      );
    }
    if (formData.certificateType === t.landRecord) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3LandTitle}</h3>
            <p className="text-gray-500">{t.certStep3LandDesc}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.surveyNumberLabel}</label>
            <input type="text" name="surveyNumber" value={formData.surveyNumber} onChange={handleChange} className="input-field" placeholder="e.g. 120/A" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.villageLabel}</label>
              <input type="text" name="village" value={formData.village} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.talukLabel}</label>
              <input type="text" name="taluk" value={formData.taluk} onChange={handleChange} className="input-field" required />
            </div>
          </div>
        </div>
      );
    }
    return <p className="text-center py-10">Select a certificate type in the first step.</p>;
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

      {/* Progress Bar */}
      {!submitted && (
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

      {/* Content Section */}
      <main className="max-w-3xl mx-auto py-8 px-6">
        <div className="card-elevated min-h-[450px] flex flex-col justify-between">
          {!submitted ? (
            <>
              <div className="fade-in">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep1Title}</h3>
                      <p className="text-gray-500">{t.certStep1Desc}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {[t.incomeCert, t.casteCert, t.birthCert, t.deathCert, t.landRecord].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData({ ...formData, certificateType: type })}
                          className={`p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all duration-200 ${
                            formData.certificateType === type 
                              ? "border-brand-saffron bg-brand-saffron/5 shadow-md" 
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.certificateType === type ? 'bg-brand-saffron text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <FileText size={20} />
                          </div>
                          <span className="font-bold text-gray-700">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep2Title}</h3>
                      <p className="text-gray-500">{t.certStep2Desc}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <User size={16} className="text-brand-navy" />
                          {t.fullName}
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Full name as per Aadhaar" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Hash size={16} className="text-brand-navy" />
                            {t.aadhaarNumber}
                          </label>
                          <input type="text" name="aadhaar" maxLength="12" value={formData.aadhaar} onChange={handleChange} className="input-field" placeholder="12-digit Number" required />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Phone size={16} className="text-brand-navy" />
                            {t.mobileNumber}
                          </label>
                          <input type="text" name="mobile" maxLength="10" value={formData.mobile} onChange={handleChange} className="input-field" placeholder="10-digit Mobile" required />
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <MapPin size={16} className="text-brand-navy" />
                          {t.address}
                        </label>
                        <textarea name="address" rows="3" value={formData.address} onChange={handleChange} className="input-field" required />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && renderStep3()}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep4Title}</h3>
                      <p className="text-gray-500">{t.certStep4Desc}</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                      <Upload size={48} className="mx-auto text-gray-300 mb-4" />
                      <input
                        type="file"
                        id="doc-upload"
                        name="document"
                        onChange={handleChange}
                        className="hidden"
                      />
                      <label htmlFor="doc-upload" className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-brand-navy hover:bg-gray-50 transition-colors">
                        {formData.document ? formData.document.name : t.chooseFile}
                      </label>
                      <p className="text-xs text-gray-400 mt-4">Supported formats: JPG, PNG, PDF</p>
                    </div>
                    
                    <div className="bg-brand-navy/5 p-4 rounded-xl flex gap-3">
                      <CheckCircle size={20} className="text-brand-navy shrink-0" />
                      <p className="text-xs text-brand-navy leading-relaxed">By submitting, you declare that the information provided is correct to the best of your knowledge.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-10 border-t border-gray-100 mt-8">
                {step > 1 && (
                  <button onClick={prevStep} className="btn-secondary flex-1 py-4 flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> {t.back}
                  </button>
                )}
                {step < totalSteps ? (
                  <button 
                    onClick={nextStep} 
                    disabled={!isStepValid()} 
                    className={`btn-primary flex-[2] py-4 flex items-center justify-center gap-2 ${!isStepValid() ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
                  >
                    {t.continue} <ArrowRight size={18} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit} 
                    disabled={!isStepValid() || loading} 
                    className={`btn-primary flex-[2] py-4 flex items-center justify-center gap-2 ${(!isStepValid() || loading) ? 'opacity-70 cursor-not-allowed shadow-none' : ''}`}
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                    {loading ? t.submitting : t.submitApp}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center p-8 fade-in">
              <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-brand-green" />
              </div>
              <h3 className="text-3xl font-display font-bold text-brand-green mb-4">
                {t.appSaved}
              </h3>
              <p className="text-gray-700 text-lg mb-8">
                {t.appSavedDesc}
              </p>
              <button onClick={() => window.location.href = "/track"} className="btn-primary">
                {t.trackStatus}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CertificateApplication;
