"use client";

import { useTranslations } from "next-intl";

type Props = {
  selectedGoSeats: number[];
  selectedReturnSeats: number[];
  setSelectedGoSeats: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedReturnSeats: React.Dispatch<React.SetStateAction<number[]>>;
};

const SelectedSeatsCard = ({
  selectedGoSeats,
  selectedReturnSeats,
  setSelectedGoSeats,
  setSelectedReturnSeats,
}: Props) => {
  const t = useTranslations("Seats");

  const removeSeat = (id: number, type: "go" | "return") => {
    if (type === "go") {
      setSelectedGoSeats((prev) => prev.filter((seat) => seat !== id));
    } else {
      setSelectedReturnSeats((prev) =>
        prev.filter((seat) => seat !== id)
      );
    }
  };

  return (
    <div className="bg-white mt-10 max-w-xl rounded-xl shadow-lg border border-gray-200 p-4 w-full">

      <h2 className="text-lg font-bold mb-4">
        {t("selectedSeats")}
      </h2>

     
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-blue-600 mb-2">
          {t("goTrip")} ({selectedGoSeats.length})
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedGoSeats.length > 0 ? (
            selectedGoSeats.map((id) => (
              <span
                key={id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer"
                onClick={() => removeSeat(id, "go")}
              >
                {t("seat")} {id} ✕
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              {t("noSeats")}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-green-600 mb-2">
          {t("returnTrip")} ({selectedReturnSeats.length})
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedReturnSeats.length > 0 ? (
            selectedReturnSeats.map((id) => (
              <span
                key={id}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm cursor-pointer"
                onClick={() => removeSeat(id, "return")}
              >
                {t("seat")} {id} ✕
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              {t("noSeats")}
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default SelectedSeatsCard;