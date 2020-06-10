import * as t from "./actionTypes"

const paymentMethodList = [
  { id: 0, title: "Наличный расчет", alias: "nal" },
  { id: 1, title: "Безналичный расчет", alias: "bn" },
]

const initialState = {
  paymentMethodList,
  selectedCoordinates: null,
  finalPrice: null,
  price30t: null,
  time: null,
}

function globalData(state = initialState, action) {
  switch (action.type) {
    case t.SET_COORDINATES:
      return { ...state, selectedCoordinates: { ...state.selectedCoordinates, ...action.payload } }
    case t.SET_FINAL_PRICE:
      return { ...state, finalPrice: action.payload }
    case t.SET_CALCULATION_TIMESTAMP:
      return { ...state, time: action.payload }
    case t.SET_30T_PRICE:
      return { ...state, price30t: action.payload }
    default:
      return state
  }
}
export default globalData
