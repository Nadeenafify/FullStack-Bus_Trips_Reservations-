"use client";

import { FaSearch, FaChair, FaCreditCard } from "react-icons/fa";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      icon: <FaSearch size={28} />,
      title: t("step1.title"),
      desc: t("step1.desc"),
    },
    {
      icon: <FaChair size={28} />,
      title: t("step2.title"),
      desc: t("step2.desc"),
    },
    {
      icon: <FaCreditCard size={28} />,
      title: t("step3.title"),
      desc: t("step3.desc"),
    },
  ];

  return (
    <section className="py-16 px-6">

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {steps.map((step, i) => (
          <div key={i} className="text-center">

            <div className="bg-blue-100 text-blue-600 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
              {step.icon}
            </div>

            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{step.desc}</p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default HowItWorks;