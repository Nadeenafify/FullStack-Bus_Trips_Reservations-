"use client";

import {  useTranslations } from "next-intl";
import useSuccess from "@/hooks/success/useSuccess";

const SuccessView = () => {
  
  const t = useTranslations("SuccessPage");
   useSuccess()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-50 to-white">

    
      <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center animate-bounce shadow-lg">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

     
      <h1 className="text-3xl font-bold text-green-600 mt-6">
        {t("title")}
      </h1>

     
      <p className="text-gray-500 mt-2 text-center">
        {t("message")}
      </p>

      
      <p className="text-sm text-gray-400 mt-4">
        {t("redirect")}
      </p>

     
      <div className="flex gap-1 mt-3">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
      </div>
    </div>
  );
};

export default SuccessView;