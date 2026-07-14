import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import Dashboard from '@/pages/Dashboard'
import ClientDetail from '@/features/clients/components/ClientDetail'
import Programs from '@/pages/Programs'
import Clients from '@/pages/Clients'
import ProgramDetail from '@/features/programs/components/ProgramDetail'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetail />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element= {<ProgramDetail/>}/>
      </Routes>
    </AppLayout>
  )
}

export default App