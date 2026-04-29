"use client";

import ReservedTripCard from "./ReservedTripCard";
import { Trip } from "@/types/trips";
import { useTranslations } from "next-intl";

const TripsShow = ({
  goTrip,
  returnTrip,
}: {
  goTrip: Trip | undefined;
  returnTrip: Trip | undefined;
}) => {
  const t = useTranslations("Seats");

  return (
    <div>
      {goTrip && (
        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-2">
            {t("goTrip")}
          </h2>
          <ReservedTripCard trip={goTrip} />
        </div>
      )}

      {returnTrip && (
        <div className="mt-7">
          <h2 className="text-lg font-bold text-green-600 mb-2">
            {t("returnTrip")}
          </h2>
          <ReservedTripCard trip={returnTrip} />
        </div>
      )}
    </div>
  );
};

export default TripsShow;