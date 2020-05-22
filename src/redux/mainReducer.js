import * as t from './actionTypes';

const paymentMethodList = [
   { title: 'Наличный расчет', id: 0 },
   { title: 'Безналичный расчет', id: 1 },
];

const initialState = {
   paymentMethodList,
};

function globalData(state = initialState, action) {
   return state;
}
export default globalData