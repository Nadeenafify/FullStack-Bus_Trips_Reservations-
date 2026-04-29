'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useLocaleToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLocale = () => {
    const segments = pathname.split('/');
    const currentLocale = segments[1];

    const newLocale = currentLocale === 'en' ? 'ar' : 'en';

    segments[1] = newLocale;
    const newPath = segments.join('/');

    
    const queryString = searchParams.toString();

    const fullPath = queryString
      ? `${newPath}?${queryString}`
      : newPath;

    router.push(fullPath);
  };

  return { toggleLocale };
}