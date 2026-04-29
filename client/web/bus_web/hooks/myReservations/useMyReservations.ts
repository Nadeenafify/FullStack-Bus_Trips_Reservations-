"use client"
import { useEffect, useState } from "react";
import { Reservation } from "@/types/reservations";
import { getReservations } from "@/services/reservationServices";

const useMyReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getReservations();

        if (data) {
          setReservations(data);
        }
      } catch (error) {
        console.log("Failed to fetch reservations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    reservations,
    setReservations,
    loading,
  };
};

export default useMyReservations;