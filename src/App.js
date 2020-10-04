import React, { useEffect } from "react"
import Desktop from "./components/desktop"
import Mobile from "./components/mobile/mobile"
import ReactGA from "react-ga"
import * as t from "./redux/actionTypes"

import { connect } from "react-redux"


function App({ dispatch }) {
  const isMobile = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1

  function checkIfLoggedIn() {
    const storage = JSON.parse(localStorage.getItem("customerData"))
    if (storage) {
      dispatch({ type: t.SET_CUSTOMER_NAME, payload: storage.name })
      dispatch({ type: t.SET_CUSTOMER_PHONE, payload: storage.phone })
      dispatch({ type: t.SET_CUSTOMER_ORGANIZATION, payload: storage.organization })
    }
    console.log('checkIfLoggedIn');
  }
  checkIfLoggedIn()
  console.log("hi")
  
  useEffect(() => {
    ReactGA.initialize('UA-166957247-1')
    ReactGA.pageview(window.location.pathname + window.location.search);
    
  }, [])

  if (isMobile) return <Mobile />
  return <Desktop />
}

export default connect()(App)
