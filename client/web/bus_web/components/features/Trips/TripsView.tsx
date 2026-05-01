"use client";

import TripCard from "./TripCard";
import useTrips from "@/hooks/trips/useTrips";
import FiltersCard from "./FiltersCard";
import Hero from "./Hero";
import { useTranslations } from "next-intl";

const TripsView = () => {
  const t = useTranslations("Trips");

  const {
    trips,
    loading,
    error,
    setFilters,
    selectedGoTrip,
    setSelectedGoTrip,
    selectedReturnTrip,
    setSelectedReturnTrip,
    handleNext
  } = useTrips();

  if (loading) {
    return (
      <p className="text-center py-10">
        {t("loading")}
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center py-10">
        {t("error")}
      </p>
    );
  }

  return (
    <div className="min-h-[80vh]">

      
      <Hero
        sourceEn={trips[0]?.sourceEn}
        destinationEn={trips[0]?.destinationEn}
        sourceAr={trips[0]?.sourceAr}
        destinationAr={trips[0]?.destinationAr}
      />

      <div className="sm:flex gap-6 lg:gap-10 mt-5 sm:mt-10 px-5 2xl:px-12">

       
        <FiltersCard onApply={setFilters} />

       
        <div className="grid grid-cols-1 grow gap-4">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <TripCard
                key={trip.tripId}
                trip={trip}
                selectedGoTrip={selectedGoTrip}
                setSelectedGoTrip={setSelectedGoTrip}
                selectedReturnTrip={selectedReturnTrip}
                setSelectedReturnTrip={setSelectedReturnTrip}
              />
            ))
          ) :
           !loading&& <p>{t("noTrips")}</p>
          }
        </div>
      </div>

      
      {selectedGoTrip && (
        <div className="flex justify-end mt-6 mx-10 cursor-pointer">
          <button
            onClick={handleNext}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            {t("next")}
          </button>
        </div>
      )}

    </div>
  );
};

export default TripsView;