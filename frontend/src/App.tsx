import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import Dashboard from '@/pages/Dashboard'
import ClientDetail from '@/features/clients/components/ClientDetail'
import Programs from '@/pages/Programs'
import Clients from '@/pages/Clients'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetail />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
    </AppLayout>
  )
}

export default App