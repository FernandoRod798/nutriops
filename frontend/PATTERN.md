# NutriOps — Feature Pattern Guide

## Flujo de datos

```
URL → página → componente → hook → servicio → API → datos
```

## Para replicar cualquier nueva feature

```
features/X/
├── types/        → forma del dato
├── services/     → llamadas al API
├── hooks/        → estado + lógica
├── components/   → UI
└── index.ts      → exporta todo
```

### 1. Tipo — `features/X/types/x.ts`
Define los campos que devuelve el backend (`to_dict()`).
```ts
export interface X {
  id: number
  name: string
  created_at: string
}
```

### 2. Servicio — `features/X/services/xService.ts`
Solo habla con Flask. Nada de estado ni UI.
```ts
export const xService = {
  async getAll(): Promise<X[]> {
    return fetch(`${API_URL}/x`).then(r => r.json())
  },
  async create(data: Omit<X, 'id' | 'created_at'>): Promise<X> {
    return fetch(`${API_URL}/x`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json())
  },
  async delete(id: number): Promise<void> {
    await fetch(`${API_URL}/x/${id}`, { method: 'DELETE' })
  },
}
```

### 3. Hook — `features/X/hooks/useX.ts`
Maneja estado. Usa el servicio. No sabe nada de UI.
```ts
export function useX() {
  const [items, setItems] = useState<X[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadItems = useCallback(async () => {
    const data = await xService.getAll()
    setItems(data)
    setLoading(false)
  }, [])

  return { items, loading, loadItems }
}
```

### 4. Componente — `features/X/components/XList.tsx`
Solo renderiza. Usa el hook. No hace fetch directamente.
```tsx
export default function XList() {
  const { items, loading, loadItems } = useX()

  useEffect(() => { loadItems() }, [loadItems])

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### 5. Index — `features/X/index.ts`
Exporta solo lo que el mundo exterior necesita.
```ts
export { default as XList } from './components/XList'
export { useX } from './hooks/useX'
export { xService } from './services/xService'
export type { X } from './types/x'
```

### 6. Página — `pages/X.tsx`
Solo arma la pantalla. Importa de la feature.
```tsx
import { XList } from '@/features/x'

export default function XPage() {
  return (
    <div>
      <h1>X</h1>
      <XList />
    </div>
  )
}
```

### 7. Ruta — `App.tsx`
```tsx
import XPage from '@/pages/X'
<Route path="/x" element={<XPage />} />
```

---

## Reglas

- **Tipos** → nunca tienen lógica, solo interfaces
- **Servicios** → nunca tienen estado, solo `fetch`
- **Hooks** → nunca tienen JSX, solo estado + lógica
- **Componentes** → nunca llaman al API directamente, solo usan hooks
- **Páginas** → nunca tienen lógica propia, solo arman la pantalla
- **Index** → solo exporta lo público, los archivos internos se importan entre sí

---

## Agregar una nueva página al sidebar

### 1. Crear la página — `pages/X.tsx`
```tsx
export default function XPage() {
  return <div>X</div>
}
```

### 2. Agregar la ruta — `App.tsx`
```tsx
import XPage from '@/pages/X'
<Route path="/x" element={<XPage />} />
```

### 3. Agregar el ítem al sidebar — `layouts/AppSidebar.tsx`
```tsx
import { IconName } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Clientes',  icon: Users,           path: '/clients' },
  { label: 'Programas', icon: Dumbbell,         path: '/programs' },
  { label: 'X',         icon: IconName,         path: '/x' },  // ← agrega aquí
]
```

### Orden completo
```
1. pages/X.tsx          → crea la página vacía
2. App.tsx              → agrega la ruta
3. AppSidebar.tsx       → agrega el ítem al menú
4. features/X/          → construye la feature (ver patrón arriba)
5. pages/X.tsx          → conecta la feature a la página
```

### Íconos disponibles en Lucide
Busca en → https://lucide.dev/icons
```tsx
import { Users, Dumbbell, LayoutDashboard, Settings,
         Calendar, ChartBar, FileText, Bell } from 'lucide-react'
```
