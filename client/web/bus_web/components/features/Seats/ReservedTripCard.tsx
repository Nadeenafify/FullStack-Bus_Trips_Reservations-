"use client";

import { Trip } from "@/types/trips";
import { useTranslations, useLocale } from "next-intl";

const ReservedTripCard = ({ trip }: { trip: Trip }) => {
  const t = useTranslations("Seats");
  const locale = useLocale();

  const sourceCity = locale === "ar" ? trip?.sourceAr : trip?.sourceEn;
  const destinationCity = locale === "ar" ? trip?.destinationAr : trip?.destinationEn;

  return (
    <div className="max-w-xl bg-linear-to-br from-white to-gray-50 shadow-md rounded-2xl p-6 border border-gray-200">
      
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            #{trip?.tripId} {t("goTrip")}
          </h2>
          <p className="text-xs text-gray-400">
            {t("status.reserved")}
          </p>
        </div>

        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
          {trip?.price} EGP
        </span>
      </div>

      <div className="flex items-center justify-between mb-6">
        
        <div className="text-center">
          <p className="text-xs text-gray-400">{t("departure")}</p>
          <p className="text-sm font-semibold text-gray-800">
            {sourceCity}
          </p>
        </div>

        <div className="flex-1 mx-4 relative">
          <div className="border-t-2 border-dashed border-gray-300"></div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-blue-500 text-xs">
            🚌
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">{t("arrival")}</p>
          <p className="text-sm font-semibold text-gray-800">
            {destinationCity}
          </p>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-2 gap-4 bg-gray-100 rounded-xl p-4">
        <div>
          <p className="text-xs text-gray-500">{t("departure")}</p>
          <p className="font-medium text-gray-800">
            {new Date(trip?.departureTime).toLocaleString(locale)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">{t("arrival")}</p>
          <p className="font-medium text-gray-800">
            {new Date(trip?.arrivalTime).toLocaleString(locale)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservedTripCard;