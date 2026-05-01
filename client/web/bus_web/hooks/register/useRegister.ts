import { register } from '@/services/authServices';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import  { useState } from 'react'
import toast from 'react-hot-toast';
import { useTranslations } from 'use-intl';

const useRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router=useRouter()
    const locale=useLocale()
     const t = useTranslations("Register");


    const handleRegister = async () => {
        try {

            const data = await register({ email, password });

            if (data?.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("userId", data.userId);
                router.push(`/${locale}`);
            }
            toast.success(t("registerSuccess"))
        } catch (err: any) {
            console.log(err.message);
            toast.error(t("registerError"))
        }
    };
    return {
        email,
        setEmail,
        password,
        setPassword,
        handleRegister,
        t,
        locale
    }
}

export default useRegister