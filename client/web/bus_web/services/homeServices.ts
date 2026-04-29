import apiClient from "@/lib/apiClient"

export async function getCities(){

    try{
     const res =await apiClient.get("/cities",{
  headers: { useAuth: false},
})
      return res?.data
    }
    catch{
        console.log("eror when get cities")
        return [];
    }
}

export async function sendMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const res = await apiClient.post("/messages", data,
      {
  headers: { useAuth: false},
}
    );
    return res?.data;
  } catch (err) {
    console.log("error when sending message", err);
    throw err; 
  }
}


