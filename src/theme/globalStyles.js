import { createGlobalStyle } from 'styled-components';


export const GlobalStyles = createGlobalStyle`
   *{
      margin: 0;
      padding: 0;
   }
   html{
      height: 100%;
   }
   body{
      height: 100%;
      background-color: ${({theme}) => theme.white};
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      /* overflow: hidden; */
   }
   #root{
      height: 100%;
      display: grid;
      grid-template-rows: min-content 1fr min-content;
   }
`;