"use client";

import { login } from "@/services/authServices";
import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LoginView() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login({ email, password });

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data.userId);
      }

      console.log(t("success"), data);

      router.push(`/${locale}`);
    } catch (err: any) {

      console.log(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] mt-30 flex items-center justify-center px-4">

      <div className="w-full max-w-md flex flex-col gap-6">


        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {t("title")}
          </h1>
          <p className="text-gray-500 mt-1">
            {t("subtitle")}
          </p>
        </div>


        <input
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder={t("email")}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder={t("password")}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />


        <button
          onClick={handleLogin}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition w-full"
        >
          {t("button")}
        </button>


        <p className="text-center text-sm text-gray-600">
          {t("noAccount")}{" "}
          <Link
            href={`/${locale}/register`}
            className="text-pink-500 font-medium hover:underline"
          >
            {t("register")}
          </Link>
        </p>

      </div>
    </div>
  );
}