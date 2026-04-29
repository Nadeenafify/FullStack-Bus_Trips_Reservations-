"use client";

import { useState } from "react";
import { sendMessage } from "@/services/homeServices";
import toast from "react-hot-toast";

const useSendMessages = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!name || !email || !message) {
      toast.error("All fields are required");
      return;
    }

    try {
      await sendMessage({ name, email, message });

      toast.success("Thank you! Your message has been sent successfully");

     
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Failed to send message");
    }
  };

  return {
    name,
    email,
    message,
    setName,
    setEmail,
    setMessage,
    handleSend
  };
};

export default useSendMessages;