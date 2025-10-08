import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <>
    <Router>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Navigate to="/" />} /> {}
          </Routes>
        </main>
      </div>
    </Router>
    </>
  )
}

export default App
