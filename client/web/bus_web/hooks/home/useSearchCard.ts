"use client"
import { getCities } from '@/services/homeServices'
import { City } from '@/types/home'
import { useEffect, useState } from 'react'

const useSearchCard = () => {

    const [cities, setCities] = useState<City[]>([])
    const [fromCity, setFromCity] = useState<string>("")
    const [toCity, setToCity] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [isReturn, setIsReturn] = useState(false);
    const availableDates = [
        "2026-04-24",
        "2026-04-25",
        "2026-04-26",
    ];

    useEffect(() => {
        getCities().then((data) => {
            setCities(data)
            console.log(data)
        })
    }, [])


    return {
        cities,
        fromCity,
        toCity,
        setFromCity,
        setToCity,
        date,
        setDate,
        isReturn,
        setIsReturn,
        availableDates
    }
}

export default useSearchCard