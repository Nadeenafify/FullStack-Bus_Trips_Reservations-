"use client";

import { getSeats } from "@/services/seatsServices";
import { getTripById } from "@/services/tripsServices";
import { Seats } from "@/types/seats";
import { Trip } from "@/types/trips";
import { useEffect, useState } from "react";

const useSeats = () => {
  const [goTrip, setGoTrip] = useState<Trip>();
  const [returnTrip, setReturnTrip] = useState<Trip>();
  const [seats, setSeats] = useState<Seats>([]);
  const [selectedGoSeats, setSelectedGoSeats] = useState<number[]>([]);
  const [selectedReturnSeats, setSelectedReturnSeats] = useState<number[]>([]);
  const [tripType, setTripType] = useState<"go" | "return">("go")

  useEffect(() => {
    const fetchData = async () => {
      const saved = sessionStorage.getItem("selectedTrips");

      if (!saved) return;

      const { selectedGoTrip, selectedReturnTrip } = JSON.parse(saved);

      if (!selectedGoTrip) return;

      const goTripData = await getTripById(selectedGoTrip);
      setGoTrip(goTripData);

      if (selectedReturnTrip) {
        const returnTripData = await getTripById(selectedReturnTrip);
        setReturnTrip(returnTripData);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSeats = async () => {
      const saved = sessionStorage.getItem("selectedTrips");

      if (!saved) return;

      const { selectedGoTrip, selectedReturnTrip } = JSON.parse(saved);

      const Id =
        tripType === "go"
          ? selectedGoTrip
          : selectedReturnTrip;

      if (!Id) return;

      const seatsData = await getSeats(Id);
      setSeats(seatsData || []);
    };

    fetchSeats();
  }, [tripType]);

  return {
    goTrip,
    returnTrip,
    seats,
    selectedGoSeats,
    setSelectedGoSeats,
    selectedReturnSeats,
    setSelectedReturnSeats,
    tripType,
    setTripType
  };
};

export default useSeats;