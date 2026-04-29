import apiClient from "@/lib/apiClient";

export async function login(data: {
  email: string;
  password: string;
}) {
  try {
    const res = await apiClient.post("/auth/login", data,
      {
  headers: { useAuth: false},
}
    );
    return res?.data; 
  } catch (err) {
    console.log("error when logging in", err);
    throw err;
  }
}

export const register = async (data: {
  
  email: string;
  password: string;
}) => {
  const res = await apiClient.post("/auth/register", data,
    {
  headers: { useAuth: false},
}
  );
  return res.data;
};