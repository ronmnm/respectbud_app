import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import desktopReducer, { materialSelectionReducer } from './desktopReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
   desktop: desktopReducer,
   material: materialSelectionReducer,
});


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
window.store = store.getState()