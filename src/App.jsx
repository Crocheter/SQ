import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import InstallInstructions from './pages/InstallInstructions'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/install" element={<InstallInstructions />} />
        <Route path="/soon/:feature" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  )
}
