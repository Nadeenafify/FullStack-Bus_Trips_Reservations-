"use client";

import useSeats from "@/hooks/seats/useSeats";
import TripsShow from "./TripsShow";
import SeatsShow from "./SeatsShow";
import { useRouter } from "next/navigation";
import SelectedSeatsCard from "./SelectedSeatsCard";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";

const SeatView = () => {
    const {
        goTrip,
        returnTrip,
        seats,
        selectedGoSeats,
        setSelectedGoSeats,
        selectedReturnSeats,
        setSelectedReturnSeats,
        tripType,
        setTripType,
    } = useSeats();

    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("Seats");

    return (
        <div className="mt-30 px-5 xl:px-10">
            <h1 className="text-3xl font-bold mb-8">
                {t("title")}
            </h1>

            <div className="min-h-[80vh] xl:p-6 gap-5 md:grid md:grid-cols-2">
                <div>
                    <TripsShow goTrip={goTrip} returnTrip={returnTrip} />
                    <SelectedSeatsCard
                        selectedGoSeats={selectedGoSeats}
                        setSelectedGoSeats={setSelectedGoSeats}
                        selectedReturnSeats={selectedReturnSeats}
                        setSelectedReturnSeats={setSelectedReturnSeats}
                    />
                </div>

                <SeatsShow
                    seats={seats}
                    tripType={tripType}
                    selectedGoSeats={selectedGoSeats}
                    setSelectedGoSeats={setSelectedGoSeats}
                    selectedReturnSeats={selectedReturnSeats}
                    setSelectedReturnSeats={setSelectedReturnSeats}
                />
            </div>

            <div className="flex justify-end gap-3 sm:gap-10 mt-6 sm:mx-10 cursor-pointer">

                {tripType === "return" && (
                    <button
                        onClick={() => setTripType("go")}
                        className="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-6 py-3 rounded-xl shadow-md transition"
                    >
                        ← {t("prev")}
                    </button>
                )}

                {selectedGoSeats.length > 0 && (
                    <button
                        onClick={() => {
                            if (tripType === "go" && returnTrip) {
                                setTripType("return");
                            } else {
                                if (returnTrip) {
                                    if (selectedReturnSeats?.length > 0) {
                                        router.push(`/${locale}/userInfo`);
                                        sessionStorage.setItem("goSeats", JSON.stringify(selectedGoSeats))
                                        sessionStorage.setItem("returnSeats", JSON.stringify(selectedReturnSeats))
                                    } else {
                                        toast.error(t("errors.returnSeatsRequired"));
                                    }
                                } else {
                                    router.push(`/${locale}/userInfo`);
                                    sessionStorage.setItem("goSeats", JSON.stringify(selectedGoSeats))
                                    sessionStorage.setItem("returnSeats", JSON.stringify(selectedReturnSeats))
                                }
                            }
                        }}
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
                    >
                        {t("next")} →
                    </button>
                )}
            </div>
        </div>
    );
};

export default SeatView;