import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'
import Dashboard from '@/pages/Dashboard'
import ClientDetail from '@/pages/ClientDetail'
import Programs from '@/pages/Programs'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients/:id" element={<ClientDetail />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
    </AppLayout>
  )
}

export default App