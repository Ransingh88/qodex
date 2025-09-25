import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorMsg: "" }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message }
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Crashed :", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-600">Something went wrong.</h2>
          <p className="text-sm">{this.state.errorMsg}</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
