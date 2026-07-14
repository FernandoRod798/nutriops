import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProgramDetail } from "../hooks/useProgramDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ProgramDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { program, loading, loadProgram } = useProgramDetail(Number(id));

    useEffect(() => {
        loadProgram();
    }, [loadProgram])

    if (loading)
        return (
            <div className="space-y-3 mt-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
        );

    if (!program) return <p className="text-muted-foreground">Programa no encontrado</p>;

    return (
        <>
            <Button variant="ghost" onClick={() => navigate("/programs")}>
                ← Volver
            </Button>
            <div className="mt-4 flex items-center gap-4">
                <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                    ${program.type === 'both' ? 'bg-blue-500/10' : ''}
                    ${program.type === 'training' ? 'bg-green-500/10' : ''}
                    ${program.type === 'nutrition' ? 'bg-orange-500/10' : ''}
                `}>
                    {program.type === 'both' && '💪'}
                    {program.type === 'training' && '🏋️'}
                    {program.type === 'nutrition' && '🥗'}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">{program.name}</h2>
                    <p className="text-muted-foreground text-sm mt-1">{program.description}</p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">Duración</p>
                    <p className="text-xl font-medium mt-1">{program.duration_months} meses</p>
                </div>
                <div className="border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="text-xl font-medium mt-1">
                        {program.type === 'both' && 'Entrenamiento + Nutrición'}
                        {program.type === 'training' && 'Solo entrenamiento'}
                        {program.type === 'nutrition' && 'Solo nutrición'}
                    </p>
                </div>
            </div>
        </>)
}