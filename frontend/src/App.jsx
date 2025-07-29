import "./App.css"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/navbar/Navbar"
import useAuthInit from "./hooks/useAuthInit"
import AppRoutes from "./routes/AppRoutes"

function App() {
  const selectedTheme = localStorage.getItem("theme")
  useAuthInit()
  return (
    <>
      {/* <Navbar /> */}
      <AppRoutes />
      <ToastContainer
        theme={selectedTheme || "dark"}
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        pauseOnFocusLoss
      />
    </>
  )
}

export default App
