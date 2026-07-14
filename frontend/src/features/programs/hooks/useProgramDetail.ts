import { useState, useCallback } from "react";
import { programService } from "../services/programService";
import type { Program } from "../types/program";

export function useProgramDetail(id: number) {
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const loadProgram = useCallback(async () => {
        const data = await programService.getById(id);
        setProgram(data);
        setLoading(false);
    }, [id])
    
    return { program, loading, loadProgram }
}