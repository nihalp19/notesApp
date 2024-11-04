import { Routes, Route } from "react-router-dom"
import RegisterForm from "./pages/RegisterForm"
import LoginForm from "./pages/LoginForm"
import Layout from "./pages/Layout"

function App() {

  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/Home" element={<Layout/>} />
      <Route path="*" element={<span>404 Not Found</span>} />
    </Routes>
  )
}

export default App
