import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/globalStyles';
import { theme } from './theme/theme';
import App from './App';
import { store } from './redux/store';


ReactDOM.render(
   // <React.StrictMode>
   <Provider store={store}>
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <App />
      </ThemeProvider>
   </Provider>,
   // </React.StrictMode>,
   document.getElementById('root')
);
