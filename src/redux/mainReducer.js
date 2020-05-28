import * as t from './actionTypes';

const paymentMethodList = [
  { id: 0, title: 'Наличный расчет', alias: 'nal' },
  { id: 1, title: 'Безналичный расчет', alias: 'bn' },
];


const initialState = {
  paymentMethodList,
  selectedCoordinates: null,
  finalPrice: null,
};

function globalData(state = initialState, action) {
  switch (action.type) {
    case t.SET_COORDINATES:
      return { ...state, selectedCoordinates: { ...state.selectedCoordinates, ...action.payload } };
    case t.SET_FINAL_PRICE:
      return { ...state, finalPrice: action.payload}
    default:
      return state;
  }
}
export default globalData;
