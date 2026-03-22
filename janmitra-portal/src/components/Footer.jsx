import React from "react";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-blue text-white mt-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-8">
        <div>
          <h4 className="font-semibold mb-2">{t.aboutJanMitra}</h4>
          <p className="text-sm">{t.aboutDesc}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">{t.helpSupport}</h4>
          <p className="text-sm">{t.helpDesc}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">{t.panchayatContact}</h4>
          <p className="text-sm">{t.panchayatDesc}</p>
        </div>
      </div>

      <div className="text-center pb-4 text-sm">
        {t.footerTagline}
      </div>
    </footer>
  );
}

export default Footer;
