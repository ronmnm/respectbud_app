import React from "react"
import Header from "./header"
import Footer from "./footer"
import MainContent from "./main-content/main-content"

export default function Desktop() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Обновите состояние так, чтобы следующий рендер показал запасной интерфейс.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("componentDidCatch")
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      // Здесь можно рендерить запасной интерфейс
      return <h1>Что-то пошло не так.</h1>
    }

    return this.props.children
    
  }
}
