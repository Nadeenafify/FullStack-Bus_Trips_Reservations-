"use client";


import { useLocaleToggle } from "@/hooks/useLocaleToggle";
import { Globe, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useHeader from "@/hooks/header/useHeader";

const HeaderSection = () => {
  const { toggleLocale } = useLocaleToggle();
  const t = useTranslations("Header");

  const {
    open,
    setOpen,
    isLoggedIn,
    userId,
    handleLogout,
    links
  } = useHeader();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">


        <div className="text-2xl font-extrabold text-pink-500">
          {t("brand")}
        </div>


        <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
          {links.map(([key, href]) => (
            <Link
              key={href}
              href={href}
              className="relative group transition hover:text-pink-500"
            >
              {t(key)}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}


          {userId && (
            <Link
              href="/myResrvations"
              className="relative group transition hover:text-pink-500"
            >
              {t("reservations")}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">


          <button
            onClick={toggleLocale}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
          >
            <Globe size={18} />
          </button>


          {!isLoggedIn ? (
            <Link
              href="/login"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-100 transition flex items-center justify-center text-gray-700 hover:text-pink-500"
            >
              <User size={18} />
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-white hover:bg-pink-100 transition flex items-center justify-center text-gray-700 hover:text-pink-500"
            >
              <LogOut size={18} />
            </button>
          )}


          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-2xl"
          >
            ☰
          </button>
        </div>
      </div>


      <div
        className={`
          md:hidden bg-white border-t border-gray-200 shadow-md
          overflow-hidden transition-all duration-300
          ${open ? "max-h-96 py-3" : "max-h-0"}
        `}
      >
        <div className="flex flex-col px-6 gap-4 text-gray-700 font-medium">

          {links.map(([key, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="hover:text-pink-500"
            >
              {t(key)}
            </Link>
          ))}

          {userId && (
            <Link
              href="/myResrvations"
              onClick={() => setOpen(false)}
              className="hover:text-pink-500"
            >
              {t("reservations")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;