import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import { store } from "./features/rtk/store"
import ErrorBoundary from "./components/error/ErrorBoundary.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
)
