import apiClient from "@/lib/apiClient";

export const createCheckoutSession = async (amount: number) => {
  const { data } = await apiClient.post("/api/stripe/create-checkout-session", {
    amount,
  },
 {
  headers: { useAuth: true },
}
);

  return data;
};