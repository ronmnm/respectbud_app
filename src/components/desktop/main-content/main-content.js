import React, { useEffect } from "react"
import MainSection from "./01_calculate/main-section"
import ResultPage from "./02_result/result-page"
import OrderPage from "./03_order/order-page"
import { createBrowserHistory } from "history"
import { Router, Route } from "react-router-dom"

export const history = createBrowserHistory()

export default function MainContent() {
  useEffect(() => {
    history.push('/')
  }, [])
  return (
    <Router history={history}>
      <Route path="/" exact render={() => <MainSection />} />
      <Route path="/result" exact render={() => <ResultPage />} />
      <Route path="/order" exact render={() => <OrderPage />} />
    </Router>
  )
}
