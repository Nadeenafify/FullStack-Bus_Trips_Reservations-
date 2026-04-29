"use client";

import { FaBolt, FaMoneyBillWave, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Features = () => {
  const t = useTranslations("Features");

  const features = [
    {
      icon: <FaMoneyBillWave size={28} />,
      title: t("bestPrices.title"),
      desc: t("bestPrices.desc"),
    },
    {
      icon: <FaBolt size={28} />,
      title: t("instantBooking.title"),
      desc: t("instantBooking.desc"),
    },
    {
      icon: <FaShieldAlt size={28} />,
      title: t("securePayments.title"),
      desc: t("securePayments.desc"),
    },
    {
      icon: <FaCreditCard size={28} />,
      title: t("paymentMethods.title"),
      desc: t("paymentMethods.desc"),
    },
  ];

  return (
    <section className="py-16 px-6">

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {t("title")}
        </h2>
        <p className="text-gray-600 mt-3">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">

        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
          >
            <div className="text-blue-600 mb-4 flex justify-center">
              {feature.icon}
            </div>

            <h3 className="font-semibold text-lg mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;