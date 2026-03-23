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
  Loader2,
  Calendar,
  Info,
  Briefcase,
  IndianRupee
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CertificateApplication() {

  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    certificateType: "",
    // Basic Details (Step 2)
    name: "",
    fatherHusbandName: "",
    gender: "",
    dateOfBirth: "",
    aadhaar: "",
    mobile: "",
    
    // Certificate Specific Details (Step 3)
    // Income
    occupation: "",
    annualIncome: "",
    incomeSource: "",
    // Caste
    caste: "",
    subCaste: "",
    category: "",
    // Birth
    childName: "",
    birthTime: "",
    birthPlace: "",
    motherName: "",
    // Death
    deceasedName: "",
    dateOfDeath: "",
    timeOfDeath: "",
    causeOfDeath: "",
    placeOfDeath: "",
    applicantRelation: "",
    // Land
    surveyNumber: "",
    landType: "",
    areaSize: "",
    ownerName: "",
    ownerFatherName: "",

    // Address (Step 4)
    village: "",
    taluk: "",
    district: "",
    state: "",
    pinCode: "",

    // Documents (Step 5)
    document: null
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
      case 2: return formData.name !== "" && formData.fatherHusbandName !== "" && formData.gender !== "" && formData.dateOfBirth !== "" && formData.aadhaar.length === 12 && formData.mobile.length === 10;
      case 3: {
        if (formData.certificateType === t.incomeCert) return formData.occupation !== "" && formData.annualIncome !== "" && formData.incomeSource !== "";
        if (formData.certificateType === t.casteCert) return formData.caste !== "" && formData.subCaste !== "" && formData.category !== "";
        if (formData.certificateType === t.birthCert) return formData.childName !== "" && formData.birthTime !== "" && formData.birthPlace !== "" && formData.motherName !== "";
        if (formData.certificateType === t.deathCert) return formData.deceasedName !== "" && formData.dateOfDeath !== "" && formData.causeOfDeath !== "" && formData.applicantRelation !== "";
        if (formData.certificateType === t.landRecord) return formData.surveyNumber !== "" && formData.landType !== "" && formData.areaSize !== "" && formData.ownerName !== "";
        return true;
      }
      case 4: return formData.village !== "" && formData.taluk !== "" && formData.district !== "" && formData.state !== "" && formData.pinCode !== "";
      case 5: return formData.document !== null;
      default: return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== "" && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

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
    const type = formData.certificateType;
    
    if (type === t.incomeCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3IncomeTitle}</h3>
            <p className="text-gray-500">{t.certStep3IncomeDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Briefcase size={16} className="text-brand-navy" /> {t.occupationLabel}
              </label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="input-field" placeholder="e.g. Farmer" required />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <IndianRupee size={16} className="text-brand-navy" /> {t.annualIncomeLabel}
              </label>
              <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} className="input-field" placeholder="Total per year" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.incomeSource}</label>
            <select name="incomeSource" value={formData.incomeSource} onChange={handleChange} className="input-field" required>
              <option value="">{t.selectIssue || "Select"}</option>
              <option value="Agriculture">{t.agriculture}</option>
              <option value="Job/Salary">{t.salary}</option>
              <option value="Business">{t.business}</option>
              <option value="Other">{t.other}</option>
            </select>
          </div>
        </div>
      );
    }

    if (type === t.casteCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3CasteTitle}</h3>
            <p className="text-gray-500">{t.certStep3CasteDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.caste}</label>
              <input type="text" name="caste" value={formData.caste} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.subCaste}</label>
              <input type="text" name="subCaste" value={formData.subCaste} onChange={handleChange} className="input-field" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.category}</label>
            <select name="category" value={formData.category} onChange={handleChange} className="input-field" required>
              <option value="">{t.selectIssue || "Select"}</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>
      );
    }

    if (type === t.birthCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3BirthTitle}</h3>
            <p className="text-gray-500">{t.certStep3BirthDesc}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.childName}</label>
            <input type="text" name="childName" value={formData.childName} onChange={handleChange} className="input-field" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar size={16} /> {t.birthTime}
              </label>
              <input type="time" name="birthTime" value={formData.birthTime} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.birthPlace}</label>
              <select name="birthPlace" value={formData.birthPlace} onChange={handleChange} className="input-field" required>
                <option value="">{t.selectIssue || "Select"}</option>
                <option value="Hospital">{t.hospital}</option>
                <option value="Home">{t.home}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.motherName}</label>
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="input-field" required />
          </div>
        </div>
      );
    }

    if (type === t.deathCert) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3DeathTitle}</h3>
            <p className="text-gray-500">{t.certStep3DeathDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.deceasedName}</label>
              <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.dateOfDeath}</label>
              <input type="date" name="dateOfDeath" value={formData.dateOfDeath} onChange={handleChange} className="input-field" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.timeOfDeath}</label>
              <input type="time" name="timeOfDeath" value={formData.timeOfDeath} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.causeOfDeath}</label>
              <input type="text" name="causeOfDeath" value={formData.causeOfDeath} onChange={handleChange} className="input-field" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.placeOfDeath}</label>
              <input type="text" name="placeOfDeath" value={formData.placeOfDeath} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.relation}</label>
              <input type="text" name="applicantRelation" value={formData.applicantRelation} onChange={handleChange} className="input-field" required />
            </div>
          </div>
        </div>
      );
    }

    if (type === t.landRecord) {
      return (
        <div className="space-y-6 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep3LandTitle}</h3>
            <p className="text-gray-500">{t.certStep3LandDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.surveyNumber}</label>
              <input type="text" name="surveyNumber" value={formData.surveyNumber} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.landType}</label>
              <select name="landType" value={formData.landType} onChange={handleChange} className="input-field" required>
                <option value="">{t.selectIssue || "Select"}</option>
                <option value="Agriculture">{t.agriculture}</option>
                <option value="Residential">{t.residential}</option>
                <option value="Commercial">{t.commercial}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.areaSize}</label>
            <input type="text" name="areaSize" value={formData.areaSize} onChange={handleChange} className="input-field" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.ownerName}</label>
              <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.ownerFather}</label>
              <input type="text" name="ownerFatherName" value={formData.ownerFatherName} onChange={handleChange} className="input-field" required />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans">
      <Header />

      <section className="bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-green-dark text-white py-16 px-6 text-center">
        <div className="w-24 h-24 bg-brand-saffron/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm border border-brand-saffron/30">
          <ClipboardSignature size={48} className="text-brand-saffron" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4">{t.applyCertificates}</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">{t.submitRequest}</p>
      </section>

      {!submitted && (
        <div className="max-w-4xl mx-auto pt-12 px-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">{t.certStep1Title.split(' ')[0]} {step} of {totalSteps}</span>
            <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">{Math.round((step / totalSteps) * 100)}% {t.appSaved.split(' ')[1]}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-brand-saffron h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto py-8 px-6">
        <div className="card-elevated min-h-[500px] flex flex-col justify-between">
          {!submitted ? (
            <>
              <div className="fade-in">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep1Title}</h3>
                      <p className="text-gray-500">{t.certStep1Desc}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[t.incomeCert, t.casteCert, t.birthCert, t.deathCert, t.landRecord].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData({ ...formData, certificateType: type })}
                          className={`p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all duration-200 ${
                            formData.certificateType === type ? "border-brand-saffron bg-brand-saffron/5 shadow-md" : "border-gray-100 hover:border-gray-200"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <User size={16} className="text-brand-navy" /> {t.fullName}
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.fatherHusbandName}</label>
                        <input type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} className="input-field" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.gender}</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="input-field" required>
                          <option value="">{t.selectIssue || "Select"}</option>
                          <option value="Male">{t.male}</option>
                          <option value="Female">{t.female}</option>
                          <option value="Other">{t.otherGender}</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.dateOfBirth}</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="input-field" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Hash size={16} className="text-brand-navy" /> {t.aadhaarNumber}
                        </label>
                        <input type="text" name="aadhaar" maxLength="12" value={formData.aadhaar} onChange={handleChange} className="input-field" required />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Phone size={16} className="text-brand-navy" /> {t.mobileNumber}
                        </label>
                        <input type="text" name="mobile" maxLength="10" value={formData.mobile} onChange={handleChange} className="input-field" required />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.village}</label>
                        <input type="text" name="village" value={formData.village} onChange={handleChange} className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.taluk}</label>
                        <input type="text" name="taluk" value={formData.taluk} onChange={handleChange} className="input-field" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.district}</label>
                        <input type="text" name="district" value={formData.district} onChange={handleChange} className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.state}</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.pinCode}</label>
                        <input type="text" name="pinCode" maxLength="6" value={formData.pinCode} onChange={handleChange} className="input-field" required />
                      </div>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.certStep5Title}</h3>
                      <p className="text-gray-500">{t.certStep5Desc}</p>
                    </div>
                    
                    <div className="bg-brand-navy/5 p-6 rounded-2xl mb-6">
                      <h4 className="font-bold text-brand-navy flex items-center gap-2 mb-3">
                        <Info size={18} /> {t.requiredDocs}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                        <li>{t.aadhaarProof}</li>
                        {formData.certificateType === t.incomeCert && <li>{t.incomeProof}</li>}
                        {formData.certificateType === t.casteCert && <li>{t.casteProof}</li>}
                        {formData.certificateType === t.birthCert && <li>{t.birthProof}</li>}
                        {formData.certificateType === t.deathCert && <li>{t.deathProof}</li>}
                        {formData.certificateType === t.landRecord && <li>{t.landProof}</li>}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-10 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                      <Upload size={48} className="mx-auto text-gray-300 mb-4" />
                      <input type="file" id="doc-upload" name="document" onChange={handleChange} className="hidden" />
                      <label htmlFor="doc-upload" className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 rounded-xl font-bold text-brand-navy hover:bg-gray-50 transition-colors shadow-sm">
                        {formData.document ? formData.document.name : t.chooseFile}
                      </label>
                      <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest font-semibold">PDF, JPG or PNG (Max 5MB)</p>
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
                  <button onClick={nextStep} disabled={!isStepValid()} className={`btn-primary flex-[2] py-4 flex items-center justify-center gap-2 ${!isStepValid() ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}>
                    {t.continue} <ArrowRight size={18} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={!isStepValid() || loading} className={`btn-primary flex-[2] py-4 flex items-center justify-center gap-2 ${(!isStepValid() || loading) ? 'opacity-70 cursor-not-allowed shadow-none' : ''}`}>
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
              <h3 className="text-3xl font-display font-bold text-brand-green mb-4">{t.appSaved}</h3>
              <p className="text-gray-700 text-lg mb-8">{t.appSavedDesc}</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button onClick={() => window.location.href = "/track"} className="btn-primary">{t.trackStatus}</button>
                <button onClick={() => window.location.href = "/"} className="btn-secondary">{t.backToHome}</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CertificateApplication;
