"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import useRegister from "@/hooks/register/useRegister";

export default function RegisterView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    t,
    locale
  } = useRegister()

  return (
    <div className="min-h-[80vh] mt-30 flex items-center justify-center px-4">

      <div className="w-full max-w-md  flex flex-col gap-6">

        <div className="flex justify-start">
          <Link
            href={`/${locale}`}
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <Home size={24} />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {t("title")}
          </h1>
          <p className="text-gray-500 mt-1">
            {t("subtitle")}
          </p>
        </div>

        <input
          value={email}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder={t("email")}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          value={password}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder={t("password")}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition w-full"
        >
          {t("button")}
        </button>

        <p className="text-center text-sm text-gray-600">
          {t("haveAccount")}{" "}
          <Link
            href={`/${locale}/login`}
            className="text-pink-500 font-medium hover:underline"
          >
            {t("login")}
          </Link>
        </p>

      </div>
    </div>
  );
}