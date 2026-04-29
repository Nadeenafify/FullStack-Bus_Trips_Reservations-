"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import useCancel from "@/hooks/cancel/useCancel";

const CancelView = () => {
  const t = useTranslations("CancelReservation");
 useCancel(t);
 const router=useRouter()
 const locale=useLocale()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">


      <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center animate-pulse shadow-lg">
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>


      <h1 className="text-3xl font-bold text-red-600 mt-6">
        {t("title")}
      </h1>


      <p className="text-gray-500 mt-2 text-center">
        {t("message")}
      </p>

      <button
        onClick={() => router.push(`/${locale}`)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        {t("backHome")}
      </button>
    </div>
  );
};

export default CancelView;