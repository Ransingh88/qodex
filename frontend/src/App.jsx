import "./App.css"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/navbar/Navbar"
import AppRoutes from "./routes/AppRoutes"
import useAuthInit from "./hooks/useAuthInit"

function App() {
  useAuthInit()
  return (
    <>
      <Navbar />
      <AppRoutes />
      <ToastContainer autoClose={2500} theme={"dark"} />
    </>
  )
}

export default App
