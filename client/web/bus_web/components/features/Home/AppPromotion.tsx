"use client"
import Image from "next/image";
import { useTranslations } from "next-intl";

const AppPromotion = () => {
  const t = useTranslations("AppPromotion");

  return (
    <section className="py-16 px-6 rounded-2xl my-12 max-w-6xl mx-auto">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>

          <p className="mb-6">
            {t("description")}
          </p>

          <div className="flex gap-4 flex-wrap mt-10">

            <button className="px-5 py-3 shadow-lg cursor-pointer rounded-lg flex items-center gap-3 transition">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/732/732208.png"
                alt="Google Play"
                className="w-7 h-7"
                width={100}
                height={100}
              />
              <span className="text-sm">{t("googlePlay")}</span>
            </button>

            <button className="px-5 py-3 cursor-pointer rounded-lg shadow-lg flex items-center gap-3 transition">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/731/731985.png"
                alt="App Store"
                className="w-8 h-8"
                width={100}
                height={100}
              />
              <span className="text-sm">{t("appStore")}</span>
            </button>

          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3"
            alt="Mobile App UI"
            className="w-64 md:w-80 rounded-2xl shadow-2xl"
            width={100}
            height={100}
          />
        </div>

      </div>
    </section>
  );
};

export default AppPromotion;