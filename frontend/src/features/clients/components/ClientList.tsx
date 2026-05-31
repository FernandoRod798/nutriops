import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useClients } from "../hooks/useClients";
import type { Client } from "../types/client";
import { useState } from "react";
import { getInitials, goalLabel } from '@/shared/lib/utils';

export default function ClientList() {
  const navigate = useNavigate();
  const { clients, loading, loadClients } = useClients();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const filtered = clients.filter(
    (c: Client) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <p className="text-muted-foreground text-sm">Cargando clientes...</p>
    );
  }

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o email..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            No se encontraron clientes
          </p>
        ) : (
          filtered.map((client: Client, index: number) => (
            <div
              key={client.id}
              onClick={() => navigate(`/clients/${client.id}`)}
              className={`
                flex items-center gap-4 px-4 py-3 cursor-pointer
                hover:bg-accent transition-colors
                ${index !== filtered.length - 1 ? "border-b" : ""}
              `}
            >
              <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-medium text-sm flex-shrink-0">
                {getInitials(client.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{client.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {client.age} años · {client.weight} kg · {client.height} cm
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {goalLabel(client.goal)}
              </Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
