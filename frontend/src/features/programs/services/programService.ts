import type { Program } from '@/types/program';

const API_URL = 'http://127.0.0.1:5000';

export const programService = {

    async getAll(): Promise<Program[]> {
        const respuesta = await fetch(`${API_URL}/programs`);
        return respuesta.json();
    },

    async create(data: Omit<Program, 'id' | 'created_at'>): Promise<Program> {
        const res = await fetch(`${API_URL}/programs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return res.json()
    },

    async getById(id: number): Promise<Program> {
        const res = await fetch(`${API_URL}/programs/${id}`);
        return res.json();
    },

    async delete(id: number): Promise<void> {
        await fetch(`${API_URL}/programs/${id}`, { method: 'DELETE' })
    },
}