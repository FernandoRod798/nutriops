import { useEffect, useState } from 'react';
import { Search } from "lucide-react";
import { usePrograms } from '@/features/programs/hooks/usePrograms';
import { useNavigate } from "react-router-dom";
import type { Program } from "@/features/programs/types/program";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Programs() {

    const navigate = useNavigate();
    const { programs, loading, loadPrograms } = usePrograms();
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        loadPrograms();
    }, [loadPrograms]);

    const filtered = programs.filter(
        (c: Program) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase()),
    );

    if (loading) return <p className="text-muted-foreground text-sm">Cargando programas...</p>;

    return (
        <>
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nombre o descripción..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                    No se encontraron programas
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((program: Program) => (
                        <Card
                            key={program.id}
                            onClick={() => navigate(`/programs/${program.id}`)}
                            className="cursor-pointer hover:bg-accent transition-colors"
                        >
                            <CardHeader>
                                <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-2
                ${program.type === 'both' ? 'bg-blue-500/10' : ''}
                ${program.type === 'training' ? 'bg-green-500/10' : ''}
                ${program.type === 'nutrition' ? 'bg-orange-500/10' : ''}
              `}>
                                    {program.type === 'both' && '💪'}
                                    {program.type === 'training' && '🏋️'}
                                    {program.type === 'nutrition' && '🥗'}
                                </div>
                                <CardTitle className="text-base">{program.name}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {program.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <span className={`
                text-xs px-2 py-1 rounded-full
                ${program.type === 'both' ? 'bg-blue-500/10 text-blue-400' : ''}
                ${program.type === 'training' ? 'bg-green-500/10 text-green-400' : ''}
                ${program.type === 'nutrition' ? 'bg-orange-500/10 text-orange-400' : ''}
              `}>
                                    {program.type === 'both' && 'Entrenamiento + Nutrición'}
                                    {program.type === 'training' && 'Solo entrenamiento'}
                                    {program.type === 'nutrition' && 'Solo nutrición'}
                                </span>
                            </CardContent>

                            <CardFooter>
                                <p className="text-xs text-muted-foreground">
                                    Duración: <span className="font-medium text-foreground">{program.duration_months} meses</span>
                                </p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </>
    )
}