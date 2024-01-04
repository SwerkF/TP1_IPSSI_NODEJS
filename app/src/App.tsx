import './App.css'
import Nav from './components/Nav.tsx'
// routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Technologie from './pages/Technologie.tsx'
import Login from './pages/Login.tsx'
import SignUp from './pages/Signup.tsx'
import Commentaire from './pages/Commentaire.tsx'
import Commentaires from './pages/Commentaires.tsx'

function App() {

  return (
    <>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologie" element={<Technologie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/technologie/:id" element={<Commentaire />} />
          <Route path="/commentaires" element={<Commentaires />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
