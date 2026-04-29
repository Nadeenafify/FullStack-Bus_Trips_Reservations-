"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";


const HeroSection = () => {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full h-screen">

      <Image
        src="/assets/bus-hero.jfif"
        alt="Bus travel"
        className="w-full h-full object-cover"
        width={900}
        height={900}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">

        <h1 className="text-4xl md:text-6xl font-bold">
          {t("title")}
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200">
          {t("subtitle")}
        </p>

      </div>

    </section>
  );
};

export default HeroSection;