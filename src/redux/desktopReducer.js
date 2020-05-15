import * as t from './actionTypes'



const initialState = {
   currentComponent: t.MAIN_FORM
}

const desktopReducer = (state = initialState, action) => {
   switch (action.type) {
      case t.SET_CURRENT_COMPONENT:
         return {...state, currentComponent: action.payload}
         
   
      default:
         return state
   }
};

export default desktopReducer