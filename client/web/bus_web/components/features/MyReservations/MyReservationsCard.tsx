"use client";

import useMyReservationsCard from "@/hooks/myReservations/useMyReservationsCard";
import { MYReservationCard } from "@/types/reservations";
import { useTranslations } from "next-intl";

const MyReservationsCard = ({
  tripId,
  price,
  seats,
  sourceCityEn,
  destinationCityEn,
  sourceCityAr,
  destinationCityAr,
}: MYReservationCard) => {
  const t = useTranslations("MyReservationsCard");

  const seatsArray = JSON.parse(seats);
  const totalPrice = price * seatsArray.length;

  const { handleCancel, loading } = useMyReservationsCard(
    tripId,
    seatsArray
  );

  return (
    <div className="w-full h-fit max-w-md bg-white rounded-2xl shadow-md border border-gray-100 p-5">

      
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {t("trip")} #{tripId}
        </h2>

        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
          {seatsArray.length} {t("seats")}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center justify-between text-gray-700 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">{t("from")}</p>
          <p className="font-medium">{sourceCityEn}</p>

          {sourceCityAr && (
            <p className="text-xs text-gray-400">{sourceCityAr}</p>
          )}
        </div>

        <div className="text-gray-400 text-sm">→</div>

        <div className="text-center">
          <p className="text-sm text-gray-500">{t("to")}</p>
          <p className="font-medium">{destinationCityEn}</p>

          {destinationCityAr && (
            <p className="text-xs text-gray-400">{destinationCityAr}</p>
          )}
        </div>
      </div>

      {/* Seats */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">{t("seatsLabel")}</p>

        <div className="flex flex-wrap gap-2">
          {seatsArray?.map((seat: number, index: number) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700"
            >
              {t("seat")} {seat}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t pt-3">
        <div>
          <p className="text-xs text-gray-500">{t("totalPrice")}</p>
          <p className="text-lg font-bold text-green-600">
            {totalPrice} EGP
          </p>
        </div>

        <button
          onClick={handleCancel}
          disabled={loading}
          className="px-4 cursor-pointer py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
        >
          {loading ? t("canceling") : t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default MyReservationsCard;