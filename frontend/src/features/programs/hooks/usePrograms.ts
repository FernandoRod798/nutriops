import { useState, useCallback } from 'react'
import { programService } from '../services/programService'
import type { Program } from '../types/program'

// Hook reutilizable para cargar y manejar la lista de programas
export function usePrograms() {
    const [programs, setPrograms] = useState<Program[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const loadPrograms = useCallback(async () => {
        const data = await programService.getAll()
        setPrograms(data)
        setLoading(false)
    }, [])

    return { programs, loading, loadPrograms }
}