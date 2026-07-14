import { ClientProgram } from '@/features/clients/types/clientProgram';
import { useCallback, useState } from 'react';
import { clientProgramService } from '@/features/clients/services/clientProgramService';

export function useClientPrograms (id: number) {
    const [clientPrograms, setClientPrograms] = useState<ClientProgram[]>([]);
    const [loadingPrograms, setLoading] = useState<boolean>(true);

    const loadClientPrograms = useCallback(async ()=> {
        const data = await clientProgramService.getByClient(id);
        setClientPrograms(data);
        setLoading(false);
    }, [id])
    return { clientPrograms, loadingPrograms, loadClientPrograms}
}