import type { ClientProgram } from "@/types/clientProgram";

const API_URL = 'http://127.0.0.1:5000';

export const clientProgramService = {

    async getById(clientId: number): Promise<ClientProgram> {
        const res = await fetch(`${API_URL}/clients/${clientId}/programs`)
        return res.json();
    },

    // Borra la asignación por su propio id
    async delete(id: number): Promise<void> {
        await fetch(`${API_URL}/client-programs/${id}`, { method: 'DELETE' })
    },

    // Asigna un programa a un cliente — clientId va en la URL, program_id en el body
    async assign(clientId: number, data: { program_id: number }): Promise<ClientProgram> {
        const res = await fetch(`${API_URL}/clients/${clientId}/programs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return res.json()
    },
}