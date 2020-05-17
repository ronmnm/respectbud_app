import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { activeComponentsReducer, firstPageReducer, orderDataReducer } from './desktopReducer';
import thunk from 'redux-thunk';
import { currentMobileComponentReducer } from './mobileReducer';

const rootReducer = combineReducers({
   desktop: activeComponentsReducer,
   firstPage: firstPageReducer,
   order: orderDataReducer,
   mobile: currentMobileComponentReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
window.store = store.getState();
