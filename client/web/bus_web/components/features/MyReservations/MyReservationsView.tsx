"use client";

import MyReservationsCard from "./MyReservationsCard";
import useMyReservations from "@/hooks/myReservations/useMyReservations";
import { useTranslations } from "next-intl";

const MyReservationsView = () => {
  const { reservations, loading } = useMyReservations();
  const t = useTranslations("MyReservations");

  if (loading) {
    return (
      <div className="p-5 text-gray-500 min-h-[80vh] mt-30">
        {t("loading")}
      </div>
    );
  }

  if (!reservations.length) {
    return (
      <div className="p-5 text-gray-500 min-h-[80vh] mt-30">
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] mt-30 px-5 md:px-10">
      
      <h1 className="text-2xl font-bold mb-5">
        {t("title")}
      </h1>

      <div className="lg:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations?.map((res, index) => (
          <MyReservationsCard
            key={index}
            tripId={res.tripId}
            price={res.price}
            seats={res.seats}
            sourceCityEn={res.sourceCityEn}
            destinationCityEn={res.destinationCityEn}
            sourceCityAr={res.sourceCityAr}
            destinationCityAr={res.destinationCityAr}
          />
        ))}
      </div>
    </div>
  );
};

export default MyReservationsView;