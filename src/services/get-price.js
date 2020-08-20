// import { functions } from "./firebase"
// import { firestore } from "./firebase"
import firebase from './firebase'
import openrouteservice from "openrouteservice-js"

// import { filterSuppliersArray } from "./get-price-utils/filter-suppliers-array"
// import { calculateDeliveryCost } from "./get-price-utils/calculate-delivery-costs"
// import modifyResults from "./get-price-utils/modify-results"

// const openrouteserviceKey = "5b3ce3597851110001cf6248a9876145e10e43139207d591e4ab1c9d"

// var Matrix = new openrouteservice.Matrix({
//   api_key: openrouteserviceKey,
// })

export async function getPrice(data) {
  const getPrice = firebase.app().functions('europe-west1').httpsCallable('getPrice')
  return getPrice({ ...data })
}
