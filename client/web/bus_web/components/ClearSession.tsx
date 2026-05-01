"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ClearSession() {
  const pathname = usePathname();

  useEffect(() => {
    const allowed =
      pathname.includes("/trips") ||
      pathname.includes("/seats") ||
      pathname.includes("/userInfo");

    if (!allowed) {
      sessionStorage.clear();
    }
  }, [pathname]);

  return null;
}