import { useEffect, useState } from 'react'

export default function useLocalStorage(
    key,
    initialValue
) {
    const [value, setValue] = useState(() => {
        const jsonString = localStorage.getItem(key)

        if (jsonString) return JSON.parse(jsonString)

        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}