import apiClient from "@/lib/apiClient";


export async function getSeats(tripId: number) {
  try {
    const res = await apiClient.get(`/seats/${tripId}`, {
  headers: { useAuth: true },
});
    return res?.data?.data;
  } catch (error) {
    console.log("error when getting seats", error);
    return [];
  }
}


