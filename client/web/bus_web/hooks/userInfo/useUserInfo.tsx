"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { addReservation } from "@/services/reservationServices";
import { createCheckoutSession } from "@/services/stripeServices";

const useUserInfo = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
   

  
      const handlePayment = async () => {
        try {
            const data = await createCheckoutSession(200);

            window.location.href = data.url;
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) return toast.error("Name is required");
        if (!phone.trim()) return toast.error("Phone is required");
        if (!email.trim()) return toast.error("Email is required");
        if (!email.includes("@")) return toast.error("Invalid email");

        const userInfo = { name, phone, email };
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        const goSeats = JSON.parse(sessionStorage.getItem("goSeats") || "[]");
        const returnSeats = JSON.parse(sessionStorage.getItem("returnSeats") || "[]");
        const selectedGoTrip = sessionStorage.getItem("selectedGoTrip");
        const selectedReturnTrip = sessionStorage.getItem("selectedReturnTrip");
       const userId=JSON.parse(localStorage.getItem("userId")||"")
        try {

            const goRes = await addReservation({
                seats: goSeats,
                userId:userId,
                tripId: Number(selectedGoTrip),
                name,
                phone,
                email,
                
            });



            if (selectedReturnTrip) {
                const returnRes = await addReservation({
                    seats: returnSeats,
                    userId: userId,
                    tripId: Number(selectedReturnTrip),
                    name,
                    phone,
                    email,
                    
                });

               
            }


            handlePayment()

        } catch (error) {
            console.error(error);
            toast.error("Failed to create reservation");
        }
    };

    return {
        name,
        phone,
        email,
        setName,
        setPhone,
        setEmail,
        handleSubmit,
    };
};

export default useUserInfo;