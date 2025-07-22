import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import { ThemeProvider } from "@/context/ThemeContext"
import { store } from "@/features/rtk/store"
import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
          </Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
