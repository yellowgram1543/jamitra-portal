import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";
import { User, LogOut, LogIn, ChevronDown } from "lucide-react";
import LoginModal from "./LoginModal";

function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

        <div className="flex items-center gap-2 md:gap-6">
          {/* Language Selector */}
          <select
            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-brand-saffron focus:border-brand-saffron block p-2 md:p-2.5 outline-none transition-all cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="kn">Kannada</option>
          </select>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-brand-navy/5 p-2 pr-3 rounded-xl hover:bg-brand-navy/10 transition-colors"
              >
                <div className="w-8 h-8 bg-brand-navy text-white rounded-lg flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-brand-navy leading-none">Citizen</p>
                  <p className="text-[10px] text-gray-500">{user.mobile}</p>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden fade-in py-2">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400">Logged in as</p>
                    <p className="text-sm font-bold text-gray-800">{user.mobile}</p>
                  </div>
                  <button 
                    onClick={() => { logout(); setIsProfileOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} /> {t.logoutBtn}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2 text-brand-navy font-bold text-sm bg-brand-navy/5 px-4 py-2.5 rounded-xl hover:bg-brand-navy/10 transition-colors"
            >
              <LogIn size={18} /> <span className="hidden md:inline">{t.loginBtn}</span>
            </button>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}

export default Header;
