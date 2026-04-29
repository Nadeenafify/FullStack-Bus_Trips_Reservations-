
import apiClient from "@/lib/apiClient";
import { UseTripsParams } from "@/types/trips";

export async function getTrips({
  fromCity,
  toCity,
  date,
  minPrice,
  maxPrice,
  time,
  amenities,
}: UseTripsParams) {
  try {
    const res = await apiClient.get("/trips", {
      params: {
        fromCity,
        toCity,
        date,
        minPrice,
        maxPrice,
        time,
        amenities,
      },
      headers: {
        useAuth: false, 
      },
    });

    return res?.data;
  } catch (err) {
    console.log("error when getting trips", err);
    return [];
  }
}

export async function getAmenities({ id }: { id: number | string }) {
  try {
    const { data } = await apiClient.post("/amenities", { id },{
  headers: { useAuth: false},
});
    return data;
  } catch (err) {
    console.log("error when getting amenities", err);
    return [];
  }
}
export async function getTripById(id: number) {
  try {
    const res = await apiClient.get(`/trips/${id}`, {
  headers: { useAuth: false },
});
    return res?.data;
  } catch (error) {
    console.log("error when getting trip by id", error);
    return null;
  }
}