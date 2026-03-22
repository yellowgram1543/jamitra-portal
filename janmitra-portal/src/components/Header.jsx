import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 md:p-6">
        <div>
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-navy tracking-tight font-display">
              JanMitra
            </h1>
          </Link>
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            {t.portalTitle}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-brand-blue focus:border-brand-blue block p-2.5 outline-none transition-all"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="kn">Kannada</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
