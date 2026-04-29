"use client"
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

const useSuccess = () => {

    const router = useRouter();
    const locale = useLocale();
    useEffect(() => {
        sessionStorage.clear();

        const timer = setTimeout(() => {
            router.push(`/${locale}`);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    return {}
}

export default useSuccess