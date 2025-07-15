import "./App.css"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/navbar/Navbar"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <ToastContainer autoClose={2500} theme={"dark"} />
    </>
  )
}

export default App
