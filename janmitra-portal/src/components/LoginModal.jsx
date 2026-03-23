import React, { useState } from 'react';
import { X, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useUser();
  const { t } = useLanguage();
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(mobile);
    setLoading(false);
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden fade-in">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">{t.loginTitle}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-brand-saffron/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-brand-saffron" />
            </div>
            <p className="text-gray-600">{t.loginDesc}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t.mobileNumber}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+91</span>
              <input
                type="text"
                maxLength="10"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="input-field pl-14 text-lg tracking-widest"
                placeholder="00000 00000"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || mobile.length !== 10}
            className={`btn-primary w-full py-4 flex items-center justify-center gap-2 ${
              (loading || mobile.length !== 10) ? 'opacity-70 cursor-not-allowed shadow-none' : ''
            }`}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : t.loginBtn}
            {!loading && <ArrowRight size={20} />}
          </button>

          <p className="text-center text-xs text-gray-400">
            {t.declaration.split('.')[0]}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
