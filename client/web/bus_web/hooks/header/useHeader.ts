"use client"
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

const useHeader = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const links: [string, string][] = [ ["home", "/"], ["about", "/about"], ["contact", "/contact"], ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const id = localStorage.getItem("userId");

    setIsLoggedIn(!!token);
    setUserId(id);
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.clear();

      setIsLoggedIn(false);
      setUserId(null);
      setOpen(false);

      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return {
    open,
    setOpen,
    isLoggedIn,
    userId,
    handleLogout,
    links
  };
};

export default useHeader;