"use client"
import Link from "next/link";
import { useTranslations } from "next-intl";

const FooterSection = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold">GoBusNow</h2>
          <p className="text-gray-400 mt-2 text-sm">
            {t("description")}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">{t("quickLinks")}</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-white">{t("home")}</Link></li>
            <li><Link href="/about" className="hover:text-white">{t("contact")}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{t("contact")}</Link></li>
            <li><Link href="/my-reservations" className="hover:text-white">{t("reservations")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">{t("contactTitle")}</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>{t("email")}</li>
            <li>{t("phone")}</li>
            <li>{t("location")}</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        {t("copyright")}
      </div>

    </footer>
  );
};

export default FooterSection;