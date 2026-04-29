"use client"
import { cancelReservation } from "@/services/reservationServices";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";


const useMyReservationsCard = (tripId: number, seatsArray: number[]) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    setLoading(true);

    try {
      await cancelReservation(Number(userId), tripId, seatsArray);

      toast.success("Reservation canceled successfully");

    
      window.location.reload();
    } catch (error) {
      console.log("Cancel failed", error);
      toast.error("Failed to cancel reservation");
    } finally {
      setLoading(false);
    }
  }, [tripId, seatsArray]);

  return {
    handleCancel,
    loading,
  };
};

export default useMyReservationsCard;