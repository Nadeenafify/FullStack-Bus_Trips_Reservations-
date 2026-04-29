"use client";

import { Seat, Seats } from "@/types/seats";
import { PiOfficeChairDuotone } from "react-icons/pi";
import { useTranslations } from "next-intl";

type Props = {
  seats: Seats;

  tripType: "go" | "return";

  selectedGoSeats: number[];
  setSelectedGoSeats: React.Dispatch<React.SetStateAction<number[]>>;

  selectedReturnSeats: number[];
  setSelectedReturnSeats: React.Dispatch<React.SetStateAction<number[]>>;
};

const SeatsShow = ({
  seats,
  selectedGoSeats,
  setSelectedGoSeats,
  selectedReturnSeats,
  setSelectedReturnSeats,
  tripType,
}: Props) => {
  const t = useTranslations("Seats");

  const isGoTrip = tripType === "go";

  const selectedSeats = isGoTrip ? selectedGoSeats : selectedReturnSeats;
  const setSelectedSeats = isGoTrip ? setSelectedGoSeats : setSelectedReturnSeats;

  const reservedCount = seats.filter((s) => s.status === "booked").length;
  const availableCount = seats.filter((s) => s.status === "available").length;

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;

    setSelectedSeats((prev: number[]) => {
      if (prev.includes(seat.seatNumber)) {
        return prev.filter((id) => id !== seat.seatNumber);
      } else {
        return [...prev, seat.seatNumber];
      }
    });
  };

  return (
    <div className="bg-gray-50 p-4 mt-10 md:mt-0 border-pink-500 border-2 rounded-xl h-fit shadow">
      
      <h2 className="text-lg font-bold mb-4">
        {t("subtitle")} (
        {isGoTrip ? t("goTrip") : t("returnTrip")}
        )
      </h2>

      {seats.length > 0 ? (
        <div className="grid grid-cols-6 justify-center items-center xl:px-30 py-5">
          {seats.map((seat: Seat) => (
            <div
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              className="flex flex-col"
            >
              <PiOfficeChairDuotone
                className={`text-2xl h-8 w-8 cursor-pointer ${
                  seat.status === "booked"
                    ? "text-red-500 cursor-not-allowed"
                    : selectedSeats.includes(seat.seatNumber)
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              <h4 className="px-3">{seat.seatNumber}</h4>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">{t("noSeats")}</p>
      )}

      <div className="flex justify-around items-center mt-6 border-t pt-4">

        <div className="flex flex-col items-center">
          <PiOfficeChairDuotone className="text-red-500 text-2xl" />
          <span className="text-sm text-red-500">
            {t("status.reserved")}
          </span>
          <span className="text-xs text-gray-500">{reservedCount}</span>
        </div>

        <div className="flex flex-col items-center">
          <PiOfficeChairDuotone className="text-gray-400 text-2xl" />
          <span className="text-sm text-gray-500">
            {t("status.available")}
          </span>
          <span className="text-xs text-gray-500">{availableCount}</span>
        </div>

        <div className="flex flex-col items-center">
          <PiOfficeChairDuotone className="text-green-500 text-2xl" />
          <span className="text-sm text-green-500">
            {t("status.selected")}
          </span>
          <span className="text-xs text-gray-500">
            {selectedSeats.length}
          </span>
        </div>

      </div>
    </div>
  );
};

export default SeatsShow;