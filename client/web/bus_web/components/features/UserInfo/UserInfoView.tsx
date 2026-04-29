"use client";

import useUserInfo from "@/hooks/userInfo/useUserInfo";
import { useTranslations } from "next-intl";

const UserInfoView = () => {
  const t = useTranslations("UserInfo");

  const {
    name,
    phone,
    email,
    setName,
    setPhone,
    setEmail,
    handleSubmit,
  } = useUserInfo();

  return (
    <div className="mt-28 px-4 lg:px-10 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

       
        <div className="bg-linear-to-r from-blue-600 to-blue-500 p-6 text-white">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-blue-100 mt-1">
            {t("subtitle")}
          </p>
        </div>

       
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          
          <div>
            <label className="text-sm font-medium text-gray-600">
              {t("fullName")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition shadow-sm"
              placeholder={t("namePlaceholder")}
            />
          </div>

         
          <div>
            <label className="text-sm font-medium text-gray-600">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition shadow-sm"
              placeholder={t("phonePlaceholder")}
            />
          </div>

          
          <div>
            <label className="text-sm font-medium text-gray-600">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition shadow-sm"
              placeholder={t("emailPlaceholder")}
            />
          </div>

        
          <button
            type="submit"
            className="w-full cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 
            text-white font-semibold py-3 rounded-xl 
            shadow-md transition active:scale-[0.99]"
          >
            {t("button")}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UserInfoView;