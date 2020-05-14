import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/globalStyles';
import { theme } from './theme/theme';
import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <App />
      </ThemeProvider>
   </React.StrictMode>,
   document.getElementById('root')
);