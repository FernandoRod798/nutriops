import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import Dashboard from '@/pages/Dashboard'
import ClientDetail from '@/pages/ClientDetail'
import Programs from '@/pages/Programs'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<ClientDetail />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
    </AppLayout>
  )
}

export default App