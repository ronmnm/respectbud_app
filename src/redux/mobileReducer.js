import * as t from './actionTypes';

const initialMobileComponentState = {
   component: t.ORDER_PAGE,
};

export function currentMobileComponentReducer(state = initialMobileComponentState, action) {
   switch (action.type) {
      case t.SET_CURRENT_MOBILE_COMPONENT:
         return { ...state, component: action.payload };

      default:
         return state;
   }
}
