"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useLocale } from "next-intl";

const Hero = ({
  sourceEn,
  destinationEn,
  sourceAr,
  destinationAr,
}: {
  sourceEn: string;
  destinationEn: string;
  sourceAr: string;
  destinationAr: string;
}) => {
  const locale = useLocale();

  const source = locale === "ar" ? sourceAr : sourceEn;
  const destination = locale === "ar" ? destinationAr : destinationEn;

  return (
    <section className="relative w-full h-[70vh]">
      <Image
        src="/assets/bus-hero.jfif"
        alt="Bus travel"
        className="w-full h-full object-cover"
        width={900}
        height={900}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
          <span className="text-white font-bold">{source}</span>

          <FaArrowRight
            className={`text-gray-300 ${
              locale === "ar" ? "rotate-180" : ""
            }`}
          />

          <span className="text-white font-bold">{destination}</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;