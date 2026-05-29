import { useState, useEffect, useCallback } from 'react';
import { clientService } from '@/services/clientService';
import type { Client } from '@/types/client';


export default function Dashboard() {

    const [clientsInit, setClients] = useState<Client[]>([])
    const [clientLoad, setClientLoad] = useState<boolean>(true)

    const loadClients = useCallback(async () => {
        const data = await clientService.getAll()
        setClients(data)
        setClientLoad(false)
    }, [])

    useEffect(() => {
        loadClients()
    }, [loadClients])

    if (clientLoad) {
        return <p>Cargando clientes...</p>
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-6">Clientes</h1>
            <div className="space-y-3">
                {clientsInit.map(client => (
                    <div key={client.id} className="border rounded-lg p-4">
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
