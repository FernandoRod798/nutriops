import { useState, useEffect, useCallback } from 'react'
import { useClients } from '@/features/clients'
import { usePrograms } from '@/features/programs'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Dumbbell, Activity } from 'lucide-react'

export default function Dashboard() {
    const { clients, loadClients } = useClients()
    const { programs, loadPrograms } = usePrograms()
    const [loading, setLoading] = useState<boolean>(true)

    const loadData = useCallback(async () => {
        await Promise.all([loadClients(), loadPrograms()])
        setLoading(false)
    }, [loadClients, loadPrograms])

    useEffect(() => {
        loadData()
    }, [loadData])

    if (loading) {
        return <p className="text-muted-foreground text-sm">Cargando...</p>
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Bienvenido, Coach Fernando</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm text-muted-foreground">Total clientes</p>
                            <Users className="size-4 text-muted-foreground" />
                        </div>
                        <p className="text-3xl font-semibold">{clients.length}</p>
                        <p className="text-xs text-muted-foreground mt-1">registrados</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm text-muted-foreground">Programas</p>
                            <Dumbbell className="size-4 text-muted-foreground" />
                        </div>
                        <p className="text-3xl font-semibold">{programs.length}</p>
                        <p className="text-xs text-muted-foreground mt-1">disponibles</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm text-muted-foreground">Asignaciones activas</p>
                            <Activity className="size-4 text-muted-foreground" />
                        </div>
                        <p className="text-3xl font-semibold">—</p>
                        <p className="text-xs text-muted-foreground mt-1">en curso</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}