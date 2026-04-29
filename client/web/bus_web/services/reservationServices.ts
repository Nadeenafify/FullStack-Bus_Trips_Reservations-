import apiClient from "@/lib/apiClient";

export const addReservation = async (data: {
  seats: string;
  userId: number,
  tripId: number;
  name: string;
  phone: string;
  email: string;
  
}) => {
  try {
   
    const res = await apiClient.post(
      "/reservations/addReservations",
      data,
      {
        headers: { useAuth: true },
      }
    );

    return res?.data;
  } catch (error) {
    console.log("error when adding reservation", error);
    return null;
  }
};

export const cancelReservation = async (userId:number,tripId:number,seats:number[]) => {
  try {
    const res = await apiClient.post(
      `/reservations/cancelReservations`,{
        userId,
        tripId,
        seats
      },
      {
        headers: { useAuth: true },
      }
    );

    return res.data;
  } catch (error) {
    console.log("error cancelling reservation", error);
    return null;
  }
};

export const getReservations = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) return null;

    const res = await apiClient.get(
      `/reservations/${userId}`,
      {
        headers: { useAuth: true },
      }
    );

    return res?.data;
  } catch (error) {
    console.log("error when getting reservations", error);
    return null;
  }
};