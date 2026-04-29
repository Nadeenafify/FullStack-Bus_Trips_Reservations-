"use client";

import { useTranslations } from "next-intl";

const AboutView = () => {
  const t = useTranslations("About");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">

      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

       
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("title")}
        </h1>

      
        <p className="text-blue-600 font-medium mb-4">
          {t("subtitle")}
        </p>

       
        <p className="text-gray-600 mb-6 leading-relaxed">
          {t("description")}
        </p>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="p-4 bg-blue-50 rounded-xl">
            🚀 {t("features.fast")}
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            🔒 {t("features.secure")}
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            📍 {t("features.tracking")}
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            💬 {t("features.support")}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutView;