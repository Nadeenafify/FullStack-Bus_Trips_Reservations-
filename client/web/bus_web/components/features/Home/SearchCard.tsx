"use client";

import useSearchCard from "@/hooks/home/useSearchCard";
import { Search } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SearchCard = () => {
  const t = useTranslations("Search");
  const locale = useLocale();
  const router = useRouter()

  const {
    cities,
    fromCity,
    toCity,
    setFromCity,
    setToCity,
    date,
    setDate,
    isReturn,
    setIsReturn,
    availableDates
  } = useSearchCard();

  function handleOnSearch() {
    if (fromCity && toCity && date) {
      const params = new URLSearchParams({
        fromCity,
        toCity,
        date,
      });

      if (isReturn) {
        params.append("return", "true");
      }

      router.push(`/${locale}/trips?${params.toString()}`);
    } else {
      toast.error("Please select all fields");
    }
  }



  return (
    <div className="bg-white/90 mt-[-2.5%] backdrop-blur-md shadow-lg flex  gap-3 items-center rounded-xl p-6 w-full max-w-4xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end w-full">


        <div>
          <label className="text-sm text-gray-600">{t("from")}</label>
          <select
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full  mt-1 px-4 py-2 border rounded-lg"
          >
            <option value="">{t("departure")}</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {locale === "ar" ? city.nameAr : city.nameEn}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label className="text-sm text-gray-600">{t("to")}</label>
          <select
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full mt-1 px-4  py-2 border rounded-lg"
          >
            <option value="">{t("destination")}</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {locale === "ar" ? city.nameAr : city.nameEn}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label className="text-sm text-gray-600">{t("date")}</label>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          >
            <option value="" disabled>
              Select date
            </option>

            {availableDates.map((d) => (
              <option key={d} value={d}>
                {new Date(d).toLocaleDateString("en-GB")}
              </option>
            ))}
          </select>
        </div>



      </div>

      <div className="flex flex-col gap-2">


        <label className="text-sm text-gray-700 font-medium">
          {t("returnTrip")}
        </label>


        <button
          type="button"
          onClick={() => setIsReturn(!isReturn)}
          className={`
      w-fit px-5 py-2 rounded-full text-sm font-medium
      border transition-all duration-300 text-nowrap
      flex items-center gap-2
      ${isReturn
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
            }
    `}
        >
          <span
            className={`w-2 h-2 rounded-full ${isReturn ? "bg-white" : "bg-gray-400"
              }`}
          />

          {isReturn ? t("returnOn") : t("returnOff")}
        </button>

      </div>

      <button
        onClick={handleOnSearch}
        className="flex items-center mt-6 justify-center gap-2 bg-blue-600 text-white p-3 rounded-full">
        <Search size={18} />
      </button>

    </div>
  );
};

export default SearchCard;