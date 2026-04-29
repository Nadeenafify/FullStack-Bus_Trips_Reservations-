"use client";

import { useTranslations } from "next-intl";

const ContactView = () => {
  const t = useTranslations("ContactPage");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">

      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

       
        <h1 className="text-3xl font-bold text-gray-800">
          {t("title")}
        </h1>

     
        <p className="text-gray-500 mt-1 mb-6">
          {t("subtitle")}
        </p>

      
        <div className="space-y-4">

          
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-500">{t("email")}</p>
            <p className="font-medium text-gray-800">
              support@gobusnow.com
            </p>
          </div>

          
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-500">{t("phone")}</p>
            <p className="font-medium text-gray-800">
              +20 100 000 0000
            </p>
          </div>

        
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-500">{t("location")}</p>
            <p className="font-medium text-gray-800">
              Egypt
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactView;