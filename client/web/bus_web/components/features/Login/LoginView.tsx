"use client";
import Link from "next/link";
import useLogin from "@/hooks/login/useLogin";
import { Home } from "lucide-react";

export default function LoginView() {

  const {
    setEmail,
    setPassword,
    handleLogin,
    t,
    locale,
    email,
    password
  } = useLogin()



  return (
    <div className="min-h-[80vh] mt-30 flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col gap-6">
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
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder={t("email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder={t("password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            handleLogin()
          }}
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