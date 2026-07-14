import type { Client } from '@/features/clients/types/client';

const API_URL = 'http://127.0.0.1:5000';

export const clientService = {

    async getAll(): Promise<Client[]> {
        const respuesta = await fetch(`${API_URL}/clients`);
        return respuesta.json();
    },

    async getById(id: number): Promise<Client> {
        const res = await fetch(`${API_URL}/clients/${id}`);
        return res.json();
    },

    async create(data: Omit<Client, 'id' | 'created_at'>): Promise<Client> {
        const res = await fetch(`${API_URL}/clients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return res.json()
    },

    async delete(id: number): Promise<void> {
        await fetch(`${API_URL}/clients/${id}`, { method: 'DELETE' })
    },
}