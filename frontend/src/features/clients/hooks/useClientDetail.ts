import { useState, useCallback } from 'react'
import { clientService } from '../services/clientService'
import type { Client } from '../types/client'

// Hook reutilizable para cargar y manejar la lista de clientes
// Cualquier componente que necesite clientes lo usa
// sin repetir la lógica de fetch + estado
export function useClientDetail(id: number) {
    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const loadClient = useCallback(async () => {
        const data = await clientService.getById(id)
        setClient(data)
        setLoading(false)
    }, [id])

    return { client, loading, loadClient }
}