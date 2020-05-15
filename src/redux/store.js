import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import desktopReducer from './desktopReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
   desktop: desktopReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
