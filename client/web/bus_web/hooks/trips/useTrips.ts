"use client"
import { getTrips } from "@/services/tripsServices";
import { Trip } from "@/types/trips";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const useTrips = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const fromCity = Number(searchParams.get("fromCity")) || 0;
    const toCity = Number(searchParams.get("toCity")) || 0;
    const date = searchParams.get("date") || "";
    const [filters, setFilters] = useState({});
    const [selectedGoTrip, setSelectedGoTrip] = useState<number | null>(null);
    const [selectedReturnTrip, setSelectedReturnTrip] = useState<number | null>(null);
    const router = useRouter();
    const locale = useLocale();
    const isReturn = searchParams.get("return") === "true";
    const canProceed = isReturn
        ? selectedGoTrip && selectedReturnTrip
        : selectedGoTrip;
    const fetchTrips = async () => {
        try {
            setError(false)
            setLoading(true);

            const data = await getTrips({ fromCity, toCity, date, ...filters });
            setTrips(data || []);
        } catch (err: any) {
            setError(true);

        } finally {
            setLoading(false);
        }
    };


    const handleNext = () => {

        sessionStorage.setItem(
            "selectedGoTrip",
            JSON.stringify(selectedGoTrip)
        );
        sessionStorage.setItem(
            "selectedReturnTrip",
            JSON.stringify(selectedReturnTrip)
        );
        if (canProceed)
            router.push(`/${locale}/seats`);
        else if (!canProceed && selectedGoTrip) {
            const params = new URLSearchParams({
                fromCity: String(toCity),
                toCity: String(fromCity),
                date: date,
            });
            router.push(`/${locale}/trips?${params.toString()}`);
        }


    };

    useEffect(() => {
        if (fromCity && toCity && date) {
            fetchTrips();
        }
    }, [fromCity, toCity, date, JSON.stringify(filters)]);

    return {
        trips,
        loading,
        error,
        fromCity,
        toCity,
        filters,
        setFilters,
        selectedGoTrip,
        setSelectedGoTrip,
        selectedReturnTrip,
        setSelectedReturnTrip,
        canProceed,
        handleNext

    };
};

export default useTrips;