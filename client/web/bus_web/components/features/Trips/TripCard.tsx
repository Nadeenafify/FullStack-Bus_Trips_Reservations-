"use client";

import { Trip } from "@/types/trips";
import {
  FaBus,
  FaMapMarkerAlt,
  FaClock,
  FaChevronDown,
} from "react-icons/fa";
import useTrip from "@/hooks/trips/useTrip";
import { useTranslations, useLocale } from "next-intl";
import toast from "react-hot-toast";


type Props = {
  trip: Trip;
  selectedGoTrip: number | null;
  setSelectedGoTrip: (id: number) => void;
  selectedReturnTrip: number | null;
  setSelectedReturnTrip: (id: number) => void;
};

const TripCard = ({
  trip,
  selectedGoTrip,
  setSelectedGoTrip,
  selectedReturnTrip,
  setSelectedReturnTrip,
}: Props) => {
  const {
    amenities,
    loading, open,
    handelAdd,
    handleRemove,
    handleToggle,
    isSelected
  } = useTrip({
    trip,
    selectedGoTrip,
    setSelectedGoTrip,
    selectedReturnTrip,
    setSelectedReturnTrip
  });


  const t = useTranslations("TripCard");
  const locale = useLocale();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const isLoggedIn = !!token;

  const handleClick = (e: any) => {
  if (!isLoggedIn) {
    e.stopPropagation();
    toast.error("Please login first to select a trip");
    return;
  }

  handelAdd();
};

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer  shadow-lg h-fit rounded-2xl p-5 border transition duration-300
         ${isSelected
          ? "bg-pink-500  text-white"
          : "bg-white hover:bg-gray-200 text-gray-800"
        }
`}
    >

      {isSelected && (
        <div className="w-full flex justify-end mb-2">
          <button
            onClick={handleRemove}
            className=" text-xs cursor-pointer font-medium bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded-full transition"
          >
            Remove
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`sm:text-lg font-semibold flex items-center gap-2
           ${isSelected
            ? "text-white"
            : "text-gray-800"
          }
         `}>

          <FaBus className="text-yellow-500" />
          {t("trip")} #{trip.tripId}
        </h2>

        <span
          className={`font-bold sm:text-lg
             ${selectedGoTrip === trip.tripId || selectedReturnTrip === trip.tripId
              ? "text-yellow-300"
              : "text-blue-600"
            }
          `}
        >
          {trip.price} EGP
        </span>
      </div>

      <div className="flex items-center justify-between text-gray-700 mb-4">
        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-green-500 mb-1" />
          <span className={`${isSelected ? "text-white" : "text-gray-700"} font-medium`}>
            {locale === "ar" ? trip.sourceAr : trip.sourceEn}
          </span>
          <span className={`text-xs ${isSelected ? "text-white" : "text-gray-400"}`}>{t("from")}</span>
        </div>

        <div className="flex-1 mx-3 border-t-2 border-dashed border-gray-300"></div>

        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-red-500 mb-1" />
          <span className={`${isSelected ? "text-white" : "text-gray-700"} font-medium`}>
            {locale === "ar" ? trip.destinationAr : trip.destinationEn}
          </span>
          <span className={`text-xs ${isSelected ? "text-white" : "text-gray-400"}`}>{t("to")}</span>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaClock className="text-blue-500" />
          <div>
            <p className={`text-xs ${isSelected ? "text-white" : "text-gray-700"}`}>{t("departure")}</p>
            <p className={`text-xs ${isSelected ? "text-white" : "text-gray-400"}`}>
              {new Date(trip.departureTime).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-blue-500" />
          <div>
            <p className={`text-xs ${isSelected ? "text-white" : "text-gray-400"}`}>{t("arrival")}</p>
            <p className={`${isSelected ? "text-white" : "text-gray-700"} font-medium`}>
              {new Date(trip.arrivalTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>


      <div
        onClick={(e) => {
          e.stopPropagation()
          handleToggle()
        }}
        className={`flex justify-center mt-4 ${isSelected ? "text-white hover:text-gray-500" : "text-gray-500 hover:text-blue-600"} cursor-pointer`}
      >
        <FaChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </div>


      {open && (
        <div className="mt-3 border-t pt-3">
          {loading ? (
            <p className="text-sm text-gray-400">{t("loading")}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {amenities.length > 0 ? (
                amenities.map((a, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full"
                  >
                    {a.en || a}
                  </span>
                ))
              ) : (
                <p className={`text-sm text-gray-400 ${isSelected ? "text-white" : "text-gray-400"}`}>{t("noAmenities")}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TripCard;