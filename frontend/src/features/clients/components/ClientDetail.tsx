import { Button } from '@/components/ui/button';
import { getInitials, goalLabel } from '@/shared/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useClientDetail } from "../hooks/useClientDetail";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function ClientDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>()
    const { client, loading, loadClient } = useClientDetail(Number(id));

    useEffect(() => {
        loadClient();
    }, [loadClient]);

    // Bloque 1 — cargando
    if (loading) return (
        <div className="space-y-3 mt-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
        </div>
    )

    // Bloque 2 — no encontrado
    // A partir de aquí TypeScript sabe que client NO es null
    if (!client) return (
        <p className="text-muted-foreground">Cliente no encontrado</p>
    )

    // Bloque 3 — contenido real
    return (
        <div>
            <Button variant="ghost" onClick={() => navigate('/clients')}>
                ← Volver
            </Button>
            <div className='mt-4'>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary font-medium text-lg flex-shrink-0">
                            {getInitials(client.name)}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-semibold mt-2 inline">{client.name}</h2>
                            <p className="text-muted-foreground inline">{client.email}</p>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Badge variant="outline">{goalLabel(client.goal)}</Badge>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-4 border-t">
                <Card>
                    <CardContent>
                        <p className="text-muted-foreground mb-2">Edad</p>
                        <h3 className="text-2xl font-medium inline">{client.age}</h3>
                        <p className="text-muted-foreground mb-2 inline"> Años</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p className="text-muted-foreground mb-2">Peso</p>
                        <h3 className="text-2xl font-medium inline">{client.weight}</h3>
                        <p className="text-muted-foreground mb-2 inline"> kg</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <p className="text-muted-foreground mb-2">Estatura</p>
                        <h3 className="text-2xl font-medium inline">{client.height}</h3>
                        <p className="text-muted-foreground mb-2 inline"> cm</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <p className="text-muted-foreground mb-2">Comidas</p>
                        <h3 className="text-2xl font-medium inline">{client.meals_per_day}</h3>
                        <p className="text-muted-foreground mb-2 inline"> comidas</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}