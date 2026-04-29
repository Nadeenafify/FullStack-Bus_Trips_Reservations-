"use client";

import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import useSendMessages from "@/hooks/home/useSendMessages";

const SendMessageCard = () => {
  const t = useTranslations("Contact");

  const {
    name,
    email,
    message,
    setName,
    setEmail,
    setMessage,
    handleSend
  } = useSendMessages();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <section className="py-16 px-6 flex justify-center bg-gray-50">

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        <div className="relative hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="Support"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8">

          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold">{t("title")}</h2>
            <p className="text-gray-500 mt-2">{t("subtitle")}</p>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>

           
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mx-2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name")}
                className="w-full outline-none"
              />
            </div>

           
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mx-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email")}
                className="w-full outline-none"
              />
            </div>

           
            <div className="flex items-start border rounded-lg px-3 py-2">
              <FaCommentDots className="text-gray-400 mx-2 mt-2" />
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("message")}
                className="w-full outline-none resize-none"
              />
            </div>

            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {t("send")}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default SendMessageCard;