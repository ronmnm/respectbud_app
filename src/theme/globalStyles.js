import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
   *{
      margin: 0;
      padding: 0;
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      &:focus{
         outline: none;
      }
   }
   html{
      height: 100%;
   }
   body{
      height: 100%;
      background-color: ${({ theme }) => theme.white};
      font-family: 'Roboto', sans-serif;
      font-size: 13px;
      overflow: hidden;
   }
   #root{
      height: 100%;
      display: grid;
      grid-template-rows: min-content 1fr min-content;
   }
   ul, li{
      margin: 0;
      padding: 0;
      list-style: none;
   }
`;
