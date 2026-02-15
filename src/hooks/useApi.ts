import { useState, useEffect } from 'react'

interface ApiState<T> {
    data: T | null
    loading: boolean
    error: Error | null
}

export function useApi<T>(url: string, interval = 0): ApiState<T> & { refetch: () => Promise<void> } {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: true,
        error: null,
    })

    const fetchData = async () => {
        try {
            setState(prev => ({ ...prev, loading: true }))
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP error ${res.status}`)
            const json = await res.json()
            setState({ data: json, loading: false, error: null })
        } catch (err) {
            setState({ data: null, loading: false, error: err as Error })
        }
    }

    useEffect(() => {
        fetchData()
        if (interval > 0) {
            const timer = setInterval(fetchData, interval)
            return () => clearInterval(timer)
        }
    }, [url, interval])

    return { ...state, refetch: fetchData }
}
