"use client";

import { getSeats} from "@/services/seatsServices";
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
  const [tripType,setTripType]=useState<"go"|"return">("go")
   
  useEffect(() => {
    const fetchData = async () => {

      const goTripId = JSON.parse(sessionStorage.getItem("selectedGoTrip") || "null");
      const returnTripId = JSON.parse(sessionStorage.getItem("selectedReturnTrip") || "null");

    
      if (!goTripId) return;
      const goTripData = await getTripById(goTripId);
      setGoTrip(goTripData);


      if (returnTripId) {
        const returnTripData = await getTripById(returnTripId);
        setReturnTrip(returnTripData);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    const goTripId = JSON.parse(sessionStorage.getItem("selectedGoTrip") || "null");
    const returnTripId = JSON.parse(sessionStorage.getItem("selectedReturnTrip") || "null");
      
    async function fetchSeats(){
      const Id=tripType=="go"?goTripId:returnTripId
      const seatsData = await getSeats(Id);
      setSeats(seatsData || []);
    }
    fetchSeats()
  },[tripType])

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