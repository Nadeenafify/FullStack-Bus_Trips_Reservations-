"use client";

import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useTranslations } from "next-intl";

type Props = {
  onApply: (filters: any) => void;
};

const FiltersCard = ({ onApply }: Props) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Filters");

  const [localFilters, setLocalFilters] = useState({
    minPrice: "",
    maxPrice: "",
    time: "",
    amenities: [] as string[],
  });

  const handleApply = () => {
    sessionStorage.setItem(
      "tripFilters",
      JSON.stringify(localFilters)
    );

    onApply(localFilters);
    setOpen(false);
  };
  useEffect(() => {
    const saved = sessionStorage.getItem("tripFilters");

    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalFilters(parsed);
    }
  }, []);

  return (
    <>

      <div className="sm:hidden py-3 ">
        <button
          onClick={() => setOpen(true)}
          className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <FaFilter />
          {t("button")}
        </button>
      </div>


      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => setOpen(false)}
        />
      )}


      <div
        className={`
          fixed sm:static top-0 left-0 h-full sm:h-fit z-20
          w-[80%] sm:w-[30%] lg:w-[25%]
          bg-white p-4 shadow-md border border-gray-300 rounded-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        <div className="sm:hidden flex justify-end mb-2">
          <button onClick={() => setOpen(false)} className="text-gray-500">
            ✕
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-4">{t("title")}</h2>

        <div className="mb-4">
          <p className="font-medium mb-2">{t("price")}</p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={t("min")}
              value={localFilters.minPrice}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value,
                }))
              }
              className="w-full border p-1 rounded"
            />

            <input
              type="number"
              placeholder={t("max")}
              value={localFilters.maxPrice}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value,
                }))
              }
              className="w-full border p-1 rounded"
            />
          </div>
        </div>


        <div className="mb-4">
          <p className="font-medium mb-2">{t("departureTime")}</p>
          <div className="flex flex-col gap-1 text-sm">
            {["morning", "afternoon", "evening"].map((time) => (
              <label key={time}>
                <input
                  type="checkbox"
                  checked={localFilters.time === time}
                  onChange={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      time: prev.time === time ? "" : time,
                    }))
                  }
                />{" "}
                {t(time)}
              </label>
            ))}
          </div>
        </div>


        <div>
          <p className="font-medium mb-2">{t("amenities")}</p>
          <div className="flex flex-col gap-1 text-sm">
            {["WiFi", "AC", "Charging"].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={localFilters.amenities.includes(item)}
                  onChange={(e) => {
                    setLocalFilters((prev) => ({
                      ...prev,
                      amenities: e.target.checked
                        ? [...prev.amenities, item]
                        : prev.amenities.filter((a) => a !== item),
                    }));
                  }}
                />{" "}
                {t(item)}
              </label>
            ))}
          </div>
        </div>


        <div className="mt-6">
          <button
            onClick={handleApply}
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t("apply")}
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersCard;