import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold text-brand-blue cursor-pointer">JanMitra</h1>
          </Link>
          <p className="text-sm text-gray-600">{t.portalTitle}</p>
        </div>

        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
