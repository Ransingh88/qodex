import "./App.css"
import { ToastContainer } from "react-toastify"

import Navbar from "./components/navbar/Navbar"
import useAuthInit from "./hooks/useAuthInit"
import AppRoutes from "./routes/AppRoutes"

function App() {
  useAuthInit()
  return (
    <>
      {/* <Navbar /> */}
      <AppRoutes />
      <ToastContainer autoClose={2500} theme={"dark"} />
    </>
  )
}

export default App
