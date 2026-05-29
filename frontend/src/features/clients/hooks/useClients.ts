import { useState, useCallback } from 'react'
import { clientService } from '../services/clientService'
import type { Client } from '../types/client'

// Hook reutilizable para cargar y manejar la lista de clientes
// Cualquier componente que necesite clientes lo usa
// sin repetir la lógica de fetch + estado
export function useClients() {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const loadClients = useCallback(async () => {
        const data = await clientService.getAll()
        setClients(data)
        setLoading(false)
    }, [])

    return { clients, loading, loadClients }
}