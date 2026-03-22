import React from "react";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-brand-navy to-brand-green-dark text-white mt-16 shadow-inner">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 p-10 md:p-16">
        <div>
          <h4 className="font-display font-bold text-xl mb-4 border-b border-white/20 pb-2">{t.aboutJanMitra}</h4>
          <p className="text-sm text-blue-50/80 leading-relaxed">{t.aboutDesc}</p>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-4 border-b border-white/20 pb-2">{t.helpSupport}</h4>
          <p className="text-sm text-blue-50/80 leading-relaxed">{t.helpDesc}</p>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-4 border-b border-white/20 pb-2">{t.panchayatContact}</h4>
          <p className="text-sm text-blue-50/80 leading-relaxed">{t.panchayatDesc}</p>
        </div>
      </div>

      <div className="text-center py-6 text-xs font-medium text-blue-100/60 bg-black/10">
        {t.footerTagline}
      </div>
    </footer>
  );
}

export default Footer;
