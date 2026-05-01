"use client"
import { login } from '@/services/authServices';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useTranslations } from 'use-intl';

const useLogin = () => {

    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations("Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await login({ email, password });

            if (data?.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("userId", data.userId);
                router.push(`/${locale}`);
                toast.success(t("loginSuccess"))
              }
              
        } catch (err: any) {
            toast.error(t("loginError"))
        }
    };
    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        t,
        locale
    }
}

export default useLogin