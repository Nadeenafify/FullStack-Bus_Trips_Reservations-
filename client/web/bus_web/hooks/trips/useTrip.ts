"use client"
import { getAmenities } from "@/services/tripsServices";
import { Trip } from "@/types/trips";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useTrip = ({ 
    trip,
    selectedGoTrip,
    setSelectedGoTrip,
    selectedReturnTrip,
    setSelectedReturnTrip,
}: {
    trip: Trip,
    selectedGoTrip: number|null
    setSelectedGoTrip: any
    selectedReturnTrip: number|null
    setSelectedReturnTrip: any


}) => {
    const [amenities, setAmenities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const params=useSearchParams()


    const fetchAmenities = async (id: number | string) => {
        try {
            setLoading(true);
            setError(false);
            const data = await getAmenities({ id });
            setAmenities(data || []);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    const isSelected = selectedGoTrip === trip.tripId || selectedReturnTrip === trip.tripId;
    const handleToggle = async () => {

        const next = !open;
        setOpen(next);

        if (next && amenities.length === 0) {
            await fetchAmenities(trip.tripId);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (selectedGoTrip === trip.tripId) {
            setSelectedGoTrip(0);
        } else if (selectedReturnTrip === trip.tripId) {
            setSelectedReturnTrip(0);
        }
    };

    function handelAdd() {
        if (!selectedGoTrip) 
            setSelectedGoTrip(trip.tripId)
        else if (!selectedReturnTrip && selectedGoTrip&&params.get("return")&&trip.tripId!==selectedGoTrip) 
            setSelectedReturnTrip(trip.tripId)
    }

    return {
        amenities,
        loading,
        error,
        setAmenities,
        fetchAmenities,
        open, setOpen,
        handelAdd,
        handleRemove,
        handleToggle,
        isSelected

    };
};

export default useTrip;