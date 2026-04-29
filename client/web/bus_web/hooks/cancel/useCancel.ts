"use client"
import { cancelReservation } from "@/services/reservationServices";
import { useEffect } from "react";
import toast from "react-hot-toast";


const useCancel = (t?: (key: string) => string) => {
  useEffect(() => {
    const runCancel = async () => {
      try {
        const selectedGoTrip = sessionStorage.getItem("selectedGoTrip");
        const selectedReturnTrip = sessionStorage.getItem("selectedReturnTrip");
        const goSeatsRaw = sessionStorage.getItem("goSeats");
        const returnSeatsRaw = sessionStorage.getItem("returnSeats");
        const userIdRaw = localStorage.getItem("userId");

        const safeParse = (value: string | null, fallback: any = null) => {
          try {
            return value ? JSON.parse(value) : fallback;
          } catch {
            return fallback;
          }
        };

        const goId = safeParse(selectedGoTrip);
        const returnId = safeParse(selectedReturnTrip);
        const goSeats = safeParse(goSeatsRaw, []);
        const returnSeats = safeParse(returnSeatsRaw, []);
        const userId = safeParse(userIdRaw);

        if (!userId) return;

        if (goId) {
          await cancelReservation(userId, goId, goSeats);
        }

        if (returnId) {
          await cancelReservation(userId, returnId, returnSeats);
        }

        sessionStorage.clear();

        toast.success(t ? t("toastSuccess") : "Canceled successfully");
      } catch (error) {
        console.error(error);
        toast.error(t ? t("toastError") : "Something went wrong");
      }
    };

    runCancel();
  }, []);
};

export default useCancel ;